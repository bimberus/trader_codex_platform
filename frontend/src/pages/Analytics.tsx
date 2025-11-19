import { useState, useEffect } from 'react'
import { Box, Typography, Grid, CircularProgress, Alert, Paper, Chip } from '@mui/material'
import { botsAPI, tradesAPI } from '../api/client'
import { ProfitChart } from '../components/ProfitChart'
import { PortfolioDistribution } from '../components/PortfolioDistribution'
import { PerformanceChart } from '../components/PerformanceChart'

export const Analytics = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [bots, setBots] = useState<any[]>([])
  const [trades, setTrades] = useState<any[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [botsRes, tradesRes] = await Promise.all([
        botsAPI.getAll(),
        tradesAPI.getAll(),
      ])
      setBots(botsRes.data)
      setTrades(tradesRes.data)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Przygotuj dane dla wykresów
  const portfolioData = bots.map((bot) => ({
    name: bot.pair,
    value: bot.balance || 0,
    color: undefined,
  }))

  const performanceData = bots.map((bot) => ({
    pair: bot.pair,
    profit: bot.profit || 0,
    trades: bot.total_trades || 0,
  }))

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Detailed analysis and performance metrics
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfitChart />
        </Grid>

        <Grid item xs={12} md={6}>
          <PortfolioDistribution data={portfolioData} />
        </Grid>

        <Grid item xs={12} md={6}>
          <PerformanceChart data={performanceData} />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Trading Statistics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Bots
                  </Typography>
                  <Typography variant="h5">{bots.length}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Bots
                  </Typography>
                  <Typography variant="h5">
                    {bots.filter((b) => b.status.toLowerCase() === 'active' || b.status.toLowerCase() === 'running').length}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Trades
                  </Typography>
                  <Typography variant="h5">{trades.length}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Volume
                  </Typography>
                  <Typography variant="h5">
                    ${trades.reduce((sum, t) => sum + (t.total || 0), 0).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bot Performance Details
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {bots.map((bot) => (
                <Grid item xs={12} sm={6} md={4} key={bot.id}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {bot.name}
                      </Typography>
                      <Chip
                        label={bot.status}
                        color={bot.status.toLowerCase() === 'active' || bot.status.toLowerCase() === 'running' ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {bot.pair}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Profit
                        </Typography>
                        <Typography
                          variant="body1"
                          color={bot.profit >= 0 ? 'success.main' : 'error.main'}
                          fontWeight="medium"
                        >
                          {bot.profit >= 0 ? '+' : ''}
                          {bot.profit?.toFixed(2) || 0}%
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Trades
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {bot.total_trades || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Balance
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          ${bot.balance?.toFixed(2) || 0}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
