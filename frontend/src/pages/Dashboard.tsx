import { useState, useEffect } from 'react'
import { Grid, Paper, Typography, Box, Card, CardContent, CircularProgress, Alert, Chip } from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  ShowChart as ShowChartIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material'
import { botsAPI, tradesAPI } from '../api/client'
import { useWebSocket } from '../hooks/useWebSocket'

interface StatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  color: string
  loading?: boolean
}

const StatCard = ({ title, value, icon, color, loading }: StatCardProps) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {title}
          </Typography>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

export const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalBalance: 0,
    activeBots: 0,
    profit24h: 0,
    totalTrades: 0,
  })
  const [recentTrades, setRecentTrades] = useState<any[]>([])
  const [bots, setBots] = useState<any[]>([])

  const WS_BASE_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'

  const { isConnected } = useWebSocket(`${WS_BASE_URL}/api/ws/dashboard`, {
    onMessage: (data) => {
      console.log('Dashboard update:', data)
      if (data.type === 'stats_update') {
        setStats((prev) => ({ ...prev, ...data.data }))
      } else if (data.type === 'bot_update') {
        fetchBots()
      } else if (data.type === 'trade_update') {
        fetchTrades()
      }
    },
    onConnect: () => console.log('Dashboard WebSocket connected'),
    onDisconnect: () => console.log('Dashboard WebSocket disconnected'),
  })

  const fetchBots = async () => {
    try {
      const response = await botsAPI.getAll()
      setBots(response.data)
      
      const activeBots = response.data.filter((bot: any) => 
        bot.status.toLowerCase() === 'active' || bot.status.toLowerCase() === 'running'
      ).length
      
      const totalBalance = response.data.reduce((sum: number, bot: any) => 
        sum + (bot.balance || 0), 0
      )
      
      const totalProfit = response.data.reduce((sum: number, bot: any) => 
        sum + (bot.profit || 0), 0
      )

      setStats((prev) => ({
        ...prev,
        activeBots,
        totalBalance,
        profit24h: totalProfit,
      }))
    } catch (err: any) {
      console.error('Failed to fetch bots:', err)
    }
  }

  const fetchTrades = async () => {
    try {
      const response = await tradesAPI.getAll()
      setRecentTrades(response.data.slice(0, 5))
      
      setStats((prev) => ({
        ...prev,
        totalTrades: response.data.length,
      }))
    } catch (err: any) {
      console.error('Failed to fetch trades:', err)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      await Promise.all([fetchBots(), fetchTrades()])
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Chip
          label={isConnected ? 'Live' : 'Offline'}
          color={isConnected ? 'success' : 'default'}
          size="small"
        />
      </Box>
      <Typography variant="body1" color="textSecondary" paragraph>
        Welcome to Trader Codex - Your Automated Crypto Trading Platform
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Balance"
            value={`$${stats.totalBalance.toFixed(2)}`}
            icon={<AccountBalanceIcon sx={{ color: 'white' }} />}
            color="primary.main"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Bots"
            value={stats.activeBots.toString()}
            icon={<SpeedIcon sx={{ color: 'white' }} />}
            color="success.main"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Profit"
            value={`${stats.profit24h >= 0 ? '+' : ''}${stats.profit24h.toFixed(2)}%`}
            icon={<TrendingUpIcon sx={{ color: 'white' }} />}
            color="info.main"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Trades"
            value={stats.totalTrades.toString()}
            icon={<ShowChartIcon sx={{ color: 'white' }} />}
            color="warning.main"
            loading={loading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, minHeight: 400 }}>
            <Typography variant="h6" gutterBottom>
              Active Trading Bots
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : bots.length === 0 ? (
              <Typography color="textSecondary" sx={{ py: 4, textAlign: 'center' }}>
                No bots created yet
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {bots.map((bot) => (
                  <Paper key={bot.id} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1">{bot.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {bot.pair}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          label={bot.status}
                          color={bot.status.toLowerCase() === 'active' || bot.status.toLowerCase() === 'running' ? 'success' : 'default'}
                          size="small"
                        />
                        {bot.profit !== undefined && (
                          <Typography
                            variant="body2"
                            color={bot.profit >= 0 ? 'success.main' : 'error.main'}
                            sx={{ mt: 0.5 }}
                          >
                            {bot.profit >= 0 ? '+' : ''}
                            {bot.profit.toFixed(2)}%
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, minHeight: 400 }}>
            <Typography variant="h6" gutterBottom>
              Recent Trades
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : recentTrades.length === 0 ? (
              <Typography color="textSecondary" sx={{ py: 4, textAlign: 'center' }}>
                No trades yet
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                {recentTrades.map((trade) => (
                  <Box key={trade.id} sx={{ borderBottom: '1px solid #eee', pb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight="medium">
                        {trade.pair}
                      </Typography>
                      <Chip
                        label={trade.side}
                        color={trade.side === 'buy' ? 'success' : 'error'}
                        size="small"
                        sx={{ height: 20, fontSize: '0.7rem' }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      ${trade.total?.toFixed(2) || 'N/A'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
