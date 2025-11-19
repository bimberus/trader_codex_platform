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

export const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (password.length > 50) {
      setError('Password must be less than 50 characters long')
      return
    }

    setLoading(true)

    try {
      await register(email, username, password)
      navigate('/')
    } catch (err: any) {
      setError(
        err.response?.data?.detail || 'Registration failed. Please try again.'
      )
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
            Create Account
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
              label="Username"
              type="text"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1976d2' }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
