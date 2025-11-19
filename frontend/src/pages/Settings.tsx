import { Box, Typography, Paper } from '@mui/material'

export const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Configure your platform settings
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography color="textSecondary">
          Settings panel coming soon...
        </Typography>
      </Paper>
    </Box>
  )
}
