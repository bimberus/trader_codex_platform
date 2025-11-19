import { useEffect, useRef, useState, useCallback } from 'react'

interface UseWebSocketOptions {
  onMessage?: (data: any) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Event) => void
  autoReconnect?: boolean
  reconnectInterval?: number
  reconnectAttempts?: number
}

interface WebSocketHook {
  isConnected: boolean
  send: (data: any) => void
  disconnect: () => void
  reconnect: () => void
}

export const useWebSocket = (url: string, options: UseWebSocketOptions = {}): WebSocketHook => {
  const {
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    autoReconnect = true,
    reconnectInterval = 3000,
    reconnectAttempts = 5,
  } = options

  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectCountRef = useRef(0)
  const reconnectTimeoutRef = useRef<number>()
  const shouldConnectRef = useRef(true)

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const wsUrl = `${url}${token ? `?token=${token}` : ''}`
      
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        console.log(`WebSocket connected: ${url}`)
        setIsConnected(true)
        reconnectCountRef.current = 0
        onConnect?.()
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          onMessage?.(data)
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        onError?.(error)
      }

      ws.onclose = () => {
        console.log(`WebSocket disconnected: ${url}`)
        setIsConnected(false)
        wsRef.current = null
        onDisconnect?.()

        // Auto-reconnect logic
        if (autoReconnect && shouldConnectRef.current && reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current++
          console.log(
            `Attempting to reconnect (${reconnectCountRef.current}/${reconnectAttempts})...`
          )
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, reconnectInterval)
        }
      }
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
    }
  }, [url, onMessage, onConnect, onDisconnect, onError, autoReconnect, reconnectInterval, reconnectAttempts])

  const disconnect = useCallback(() => {
    shouldConnectRef.current = false
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setIsConnected(false)
  }, [])

  const reconnect = useCallback(() => {
    disconnect()
    shouldConnectRef.current = true
    reconnectCountRef.current = 0
    connect()
  }, [connect, disconnect])

  const send = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    } else {
      console.warn('WebSocket is not connected. Message not sent.')
    }
  }, [])

  useEffect(() => {
    shouldConnectRef.current = true
    connect()

    return () => {
      shouldConnectRef.current = false
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [connect])

  return {
    isConnected,
    send,
    disconnect,
    reconnect,
  }
}
