import { Paper, Typography, Box } from '@mui/material'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface PortfolioDistributionProps {
  data?: any[]
}

const COLORS = ['#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#f44336', '#00bcd4']

export const PortfolioDistribution = ({ data = [] }: PortfolioDistributionProps) => {
  // Mock data jeśli brak danych z API
  const chartData = data.length > 0 ? data : [
    { name: 'BTC/USDT', value: 45, color: '#2196f3' },
    { name: 'ETH/USDT', value: 30, color: '#4caf50' },
    { name: 'BNB/USDT', value: 15, color: '#ff9800' },
    { name: 'SOL/USDT', value: 10, color: '#9c27b0' },
  ]

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Portfolio Distribution
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <Box sx={{ mt: 2 }}>
        {chartData.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: item.color || COLORS[index % COLORS.length],
                  mr: 1,
                }}
              />
              <Typography variant="body2">{item.name}</Typography>
            </Box>
            <Typography variant="body2" fontWeight="medium">
              {item.value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
