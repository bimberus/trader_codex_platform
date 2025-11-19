import { Paper, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useState } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface ProfitChartProps {
  data?: any[]
  loading?: boolean
}

export const ProfitChart = ({ data = [] }: ProfitChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'area'>('line')

  // Mock data jeśli brak danych z API
  const chartData = data.length > 0 ? data : [
    { time: '00:00', profit: 0, balance: 10000 },
    { time: '04:00', profit: 1.5, balance: 10150 },
    { time: '08:00', profit: 2.3, balance: 10230 },
    { time: '12:00', profit: 1.8, balance: 10180 },
    { time: '16:00', profit: 3.2, balance: 10320 },
    { time: '20:00', profit: 4.5, balance: 10450 },
    { time: '24:00', profit: 5.1, balance: 10510 },
  ]

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Profit Performance</Typography>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={(_, value) => value && setChartType(value)}
          size="small"
        >
          <ToggleButton value="line">Line</ToggleButton>
          <ToggleButton value="area">Area</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <ResponsiveContainer width="100%" height={350}>
        {chartType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke="#4caf50"
              strokeWidth={2}
              name="Profit %"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="balance"
              stroke="#2196f3"
              strokeWidth={2}
              name="Balance $"
            />
          </LineChart>
        ) : (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196f3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2196f3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke="#4caf50"
              fillOpacity={1}
              fill="url(#colorProfit)"
              name="Profit %"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="balance"
              stroke="#2196f3"
              fillOpacity={1}
              fill="url(#colorBalance)"
              name="Balance $"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </Paper>
  )
}
