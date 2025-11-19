import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper sx={{ p: 4, width: '100%' }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Trader Codex
          </Typography>
          <Typography variant="h6" gutterBottom textAlign="center" color="textSecondary">
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#1976d2' }}>
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
