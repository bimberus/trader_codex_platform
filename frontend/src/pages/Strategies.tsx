import { Box, Typography, Paper } from '@mui/material'

export const Strategies = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Trading Strategies
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Configure and manage your trading strategies
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography color="textSecondary">
          Strategy management interface coming soon...
        </Typography>
      </Paper>
    </Box>
  )
}
