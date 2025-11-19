import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { Bots } from './pages/Bots'
import { Strategies } from './pages/Strategies'
import { Analytics } from './pages/Analytics'
import { Settings } from './pages/Settings'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

export const Router = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/*" element={
                <ProtectedRoute>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/bots" element={<Bots />} />
                            <Route path="/strategies" element={<Strategies />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </Layout>
                </ProtectedRoute>
            } />
        </Routes>
    )
}
