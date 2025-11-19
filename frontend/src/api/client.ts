import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  register: (data: { email: string; username: string; password: string }) =>
    api.post('/api/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/api/auth/login-json', data),
}

// Bots API
export const botsAPI = {
  getAll: () => api.get('/api/bots/'),
  
  getOne: (id: number) => api.get(`/api/bots/${id}`),
  
  create: (data: { name: string; pair: string; strategy_id?: number; config?: any }) =>
    api.post('/api/bots/', data),
  
  update: (id: number, data: any) => api.put(`/api/bots/${id}`, data),
  
  delete: (id: number) => api.delete(`/api/bots/${id}`),
  
  start: (id: number) => api.post(`/api/bots/${id}/start`),
  
  stop: (id: number) => api.post(`/api/bots/${id}/stop`),
}

// Trades API
export const tradesAPI = {
  getAll: (botId?: number) => 
    api.get('/api/trades/', { params: { bot_id: botId } }),
  
  getOne: (id: number) => api.get(`/api/trades/${id}`),
}

// Freqtrade API
export const freqtradeAPI = {
  getStatus: () => api.get('/api/freqtrade/status'),
  start: () => api.post('/api/freqtrade/start'),
  stop: () => api.post('/api/freqtrade/stop'),
  getProfit: () => api.get('/api/freqtrade/profit'),
  getBalance: () => api.get('/api/freqtrade/balance'),
  getTrades: (limit = 100) => api.get(`/api/freqtrade/trades?limit=${limit}`),
  getPerformance: () => api.get('/api/freqtrade/performance'),
}
