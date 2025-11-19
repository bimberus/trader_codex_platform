import { Paper, Typography } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface PerformanceChartProps {
  data?: any[]
}

export const PerformanceChart = ({ data = [] }: PerformanceChartProps) => {
  // Mock data jeśli brak danych z API
  const chartData = data.length > 0 ? data : [
    { pair: 'BTC/USDT', profit: 12.5, trades: 45 },
    { pair: 'ETH/USDT', profit: 8.3, trades: 32 },
    { pair: 'BNB/USDT', profit: 5.1, trades: 28 },
    { pair: 'SOL/USDT', profit: 15.2, trades: 18 },
    { pair: 'ADA/USDT', profit: -2.1, trades: 12 },
  ]

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Bot Performance by Pair
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="pair" />
          <YAxis yAxisId="left" orientation="left" stroke="#4caf50" />
          <YAxis yAxisId="right" orientation="right" stroke="#2196f3" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="profit" fill="#4caf50" name="Profit %" />
          <Bar yAxisId="right" dataKey="trades" fill="#2196f3" name="Total Trades" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  )
}
