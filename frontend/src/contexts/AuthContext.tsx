import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authAPI } from '../api/client'

interface User {
  id: number
  email: string
  username: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password })
    const { access_token } = response.data
    
    setToken(access_token)
    localStorage.setItem('token', access_token)
    
    // Store user data (you might want to fetch user details from API)
    const userData = { id: 1, email, username: email.split('@')[0] }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const register = async (email: string, username: string, password: string) => {
    await authAPI.register({ email, username, password })
    // Auto-login after registration
    await login(email, password)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
