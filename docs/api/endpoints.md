# Dokumentacja API

## 🔐 Autentykacja

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `POST` | `/api/auth/register` | Rejestracja nowego użytkownika |
| `POST` | `/api/auth/login` | Logowanie (OAuth2 compatible) |
| `POST` | `/api/auth/login-json` | Logowanie (JSON body) |

## 🤖 Boty Tradingowe

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `GET` | `/api/bots/` | Pobranie listy wszystkich botów użytkownika |
| `POST` | `/api/bots/` | Utworzenie nowego bota |
| `GET` | `/api/bots/{id}` | Pobranie szczegółów bota |
| `PUT` | `/api/bots/{id}` | Aktualizacja konfiguracji bota |
| `DELETE` | `/api/bots/{id}` | Usunięcie bota |
| `POST` | `/api/bots/{id}/start` | Uruchomienie bota |
| `POST` | `/api/bots/{id}/stop` | Zatrzymanie bota |

## 💹 Transakcje (Trades)

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `GET` | `/api/trades/` | Pobranie historii transakcji |
| `GET` | `/api/trades/{id}` | Pobranie szczegółów konkretnej transakcji |

## 🔄 Freqtrade Integration

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `GET` | `/api/freqtrade/status` | Sprawdzenie statusu instancji Freqtrade |
| `POST` | `/api/freqtrade/start` | Uruchomienie procesu Freqtrade |
| `POST` | `/api/freqtrade/stop` | Zatrzymanie procesu Freqtrade |
| `GET` | `/api/freqtrade/profit` | Pobranie statystyk zysków |
| `GET` | `/api/freqtrade/balance` | Pobranie aktualnego salda |
| `GET` | `/api/freqtrade/trades` | Pobranie historii transakcji z Freqtrade |
| `GET` | `/api/freqtrade/performance` | Pobranie statystyk wydajności |

## 📡 WebSocket

| Endpoint | Opis |
|----------|------|
| `/api/ws/dashboard` | Główny kanał aktualizacji dashboardu (statystyki, status) |
| `/api/ws/bots` | Kanał aktualizacji statusów botów |
| `/api/ws/trades` | Kanał powiadomień o nowych transakcjach |

## 🛠️ Utility

| Metoda | Endpoint | Opis |
|--------|----------|------|
| `GET` | `/api/health` | Health check aplikacji |
| `GET` | `/docs` | Interaktywna dokumentacja Swagger UI |
| `GET` | `/redoc` | Dokumentacja ReDoc |
