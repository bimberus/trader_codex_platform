# Trader Codex Platform

System do handlu algorytmicznego na rynkach kryptowalut z wykorzystaniem silnika Freqtrade, TimescaleDB i architektury mikroserwisowej.

## 🌟 O Projekcie

Trader Codex to zaawansowana platforma tradingowa, która łączy w sobie moc silnika Freqtrade z nowoczesnym interfejsem użytkownika i rozbudowaną analityką. System umożliwia zarządzanie wieloma botami tradingowymi, monitorowanie wyników w czasie rzeczywistym oraz analizę historyczną transakcji.

## ✨ Główne Funkcje

- **🔐 Bezpieczna Autentykacja**: Pełny system logowania i rejestracji z wykorzystaniem JWT.
- **🤖 Zarządzanie Botami**: Tworzenie, edycja, startowanie i zatrzymywanie botów tradingowych z poziomu UI.
- **📊 Dashboard Live**: Statystyki w czasie rzeczywistym dzięki technologii WebSocket.
- **📈 Zaawansowana Analityka**: Interaktywne wykresy zysków, rozkładu portfela i wydajności strategii.
- **🔄 Integracja Freqtrade**: Bezpośrednia kontrola nad instancjami silnika tradingowego.

[Zobacz pełną listę funkcji w dokumentacji](docs/features.md)

## 🛠️ Technologia

### Backend
- **FastAPI**: Nowoczesny, szybki framework webowy dla Python.
- **SQLAlchemy + Alembic**: ORM i zarządzanie migracjami bazy danych.
- **PostgreSQL + TimescaleDB**: Wydajna baza danych zoptymalizowana dla szeregów czasowych.
- **Docker**: Konteneryzacja wszystkich usług.

### Frontend
- **React + Vite**: Szybki i lekki frontend.
- **TypeScript**: Bezpieczeństwo typów.
- **Material UI**: Nowoczesny system designu.
- **Recharts**: Biblioteka do wizualizacji danych.

## 🚀 Szybki Start

Aby uruchomić projekt lokalnie, potrzebujesz zainstalowanego Dockera i Docker Compose.

1. **Sklonuj repozytorium**:
   ```bash
   git clone <repository-url>
   cd trader_codex_platform
   ```

2. **Uruchom aplikację**:
   ```bash
   docker-compose up -d
   ```

3. **Otwórz w przeglądarce**:
   - Frontend: http://localhost:3000
   - Backend API Docs: http://localhost:8000/docs
   - Grafana: http://localhost:3001

Szczegółowe instrukcje znajdziesz w [QUICK_START.md](QUICK_START.md).

## 📂 Struktura Projektu

```
trader_codex_platform/
├── backend/           # Kod źródłowy API (FastAPI)
├── frontend/          # Kod źródłowy aplikacji webowej (React)
├── docs/              # Dokumentacja projektu
├── grafana/           # Konfiguracja dashboardów Grafana
├── prometheus/        # Konfiguracja monitoringu
├── scripts/           # Skrypty pomocnicze
├── docker-compose.yml # Definicja usług Docker
└── QUICK_START.md     # Przewodnik szybkiego startu
```

## 📚 Dokumentacja

Pełna dokumentacja znajduje się w katalogu `docs/`.
- [Indeks Dokumentacji](docs/index.md)
- [API Endpoints](docs/api/endpoints.md)