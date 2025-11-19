import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material'
import { Add as AddIcon, MoreVert as MoreVertIcon, PlayArrow, Stop, Edit, Delete } from '@mui/icons-material'
import { botsAPI } from '../api/client'
import { BotDialog } from '../components/BotDialog'

interface Bot {
  id: number
  name: string
  pair: string
  status: string
  profit?: number
  balance?: number
  total_trades?: number
}

export const Bots = () => {
  const [bots, setBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuBotId, setMenuBotId] = useState<number | null>(null)

  const fetchBots = async () => {
    try {
      setLoading(true)
      const response = await botsAPI.getAll()
      setBots(response.data)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load bots')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBots()
  }, [])

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, botId: number) => {
    setAnchorEl(event.currentTarget)
    setMenuBotId(botId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuBotId(null)
  }

  const handleCreateBot = () => {
    setSelectedBot(null)
    setDialogOpen(true)
  }

  const handleEditBot = (bot: Bot) => {
    setSelectedBot(bot)
    setDialogOpen(true)
    handleMenuClose()
  }

  const handleStartBot = async (botId: number) => {
    try {
      await botsAPI.start(botId)
      await fetchBots()
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to start bot')
    }
    handleMenuClose()
  }

  const handleStopBot = async (botId: number) => {
    try {
      await botsAPI.stop(botId)
      await fetchBots()
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to stop bot')
    }
    handleMenuClose()
  }

  const handleDeleteBot = async (botId: number) => {
    if (!window.confirm('Are you sure you want to delete this bot?')) {
      handleMenuClose()
      return
    }

    try {
      await botsAPI.delete(botId)
      await fetchBots()
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Failed to delete bot')
    }
    handleMenuClose()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'running':
        return 'success'
      case 'stopped':
        return 'default'
      case 'error':
        return 'error'
      default:
        return 'default'
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Trading Bots</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateBot}>
          New Bot
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {bots.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No trading bots yet
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Create your first bot to start trading
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateBot}>
            Create Bot
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {bots.map((bot) => (
            <Grid item xs={12} md={6} lg={4} key={bot.id}>
              <Paper sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" gutterBottom>
                    {bot.name}
                  </Typography>
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, bot.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  {bot.pair}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip label={bot.status} color={getStatusColor(bot.status)} size="small" />
                  {bot.profit !== undefined && (
                    <Typography variant="body2" color={bot.profit >= 0 ? 'success.main' : 'error.main'}>
                      {bot.profit >= 0 ? '+' : ''}
                      {bot.profit.toFixed(2)}%
                    </Typography>
                  )}
                </Box>
                {bot.total_trades !== undefined && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Total Trades: {bot.total_trades}
                  </Typography>
                )}
                {bot.balance !== undefined && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    Balance: ${bot.balance.toFixed(2)}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {menuBotId && bots.find((b) => b.id === menuBotId)?.status.toLowerCase() === 'stopped' ? (
          <MenuItem onClick={() => handleStartBot(menuBotId)}>
            <PlayArrow sx={{ mr: 1 }} fontSize="small" /> Start
          </MenuItem>
        ) : (
          <MenuItem onClick={() => menuBotId && handleStopBot(menuBotId)}>
            <Stop sx={{ mr: 1 }} fontSize="small" /> Stop
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            const bot = bots.find((b) => b.id === menuBotId)
            if (bot) handleEditBot(bot)
          }}
        >
          <Edit sx={{ mr: 1 }} fontSize="small" /> Edit
        </MenuItem>
        <MenuItem onClick={() => menuBotId && handleDeleteBot(menuBotId)}>
          <Delete sx={{ mr: 1 }} fontSize="small" /> Delete
        </MenuItem>
      </Menu>

      <BotDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onSuccess={fetchBots} bot={selectedBot} />
    </Box>
  )
}
