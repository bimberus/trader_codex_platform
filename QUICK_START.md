# 🚀 Trader Codex Platform - Quick Start Guide

## Przeglądarka: Otwórz aplikację

Aplikacja jest już uruchomiona! Otwórz w przeglądarce:

### 🎯 Frontend Dashboard
**URL:** http://localhost:3000

Pełnofunkcjonalny dashboard z:
- 📊 Statystykami portfela (Balance, Active Bots, Profit, Trades)
- 🤖 Zarządzaniem botami tradingowymi
- 📈 Strategiami i analytics
- ⚙️ Ustawieniami

**Nawigacja:**
- Dashboard - strona główna ze statystykami
- Trading Bots - zarządzanie botami
- Strategies - konfiguracja strategii
- Analytics - szczegółowe analizy
- Settings - ustawienia platformy

### 🔧 Backend API
**URL:** http://localhost:8000/docs

Dokumentacja Swagger UI z dostępnymi endpointami API.

**Test endpoint:**
```bash
curl http://localhost:8000/health
# Odpowiedź: {"status":"ok"}
```

### 📊 Grafana Monitoring
**URL:** http://localhost:3001

Panel monitoringu i wizualizacji danych.
- Domyślne logowanie: `admin` / `admin`

## Zarządzanie kontenerami

### Sprawdzenie statusu
```bash
docker-compose ps
```

### Zatrzymanie aplikacji
```bash
docker-compose down
```

### Uruchomienie ponownie
```bash
docker-compose up -d
```

### Restart pojedynczego serwisu
```bash
docker-compose restart frontend
docker-compose restart backend
```

### Logi
```bash
# Wszystkie serwisy
docker-compose logs -f

# Pojedynczy serwis
docker-compose logs frontend
docker-compose logs backend
```

## Komponenty

| Serwis | Port | URL |
|--------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend API | 8000 | http://localhost:8000 |
| Backend Docs | 8000 | http://localhost:8000/docs |
| Grafana | 3001 | http://localhost:3001 |
| Freqtrade API | 8080 | http://localhost:8080 |
| TimescaleDB | 5432 | localhost:5432 (wewnętrzny) |
| Prometheus | 9090 | wewnętrzny |

## Następne kroki

1. **Eksploruj Dashboard** - Otwórz http://localhost:3000 i przejdź przez wszystkie sekcje
2. **Sprawdź API** - Otwórz http://localhost:8000/docs i przetestuj endpointy
3. **Skonfiguruj Grafana** - Zaloguj się na http://localhost:3001
4. **Rozwijaj funkcjonalności** - Dodaj własne komponenty i endpointy

## Struktura projektu

```
trader_codex_platform/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # Layout, komponenty UI
│   │   ├── pages/        # Dashboard, Bots, Strategies, etc.
│   │   ├── api/          # Axios konfiguracja
│   │   └── ...
│   └── Dockerfile
├── backend/           # FastAPI + Python
│   ├── app/
│   │   ├── api/          # Endpointy
│   │   ├── core/         # Konfiguracja
│   │   └── main.py
│   └── Dockerfile
├── grafana/           # Dashboardy i konfiguracja
├── prometheus/        # Monitoring
└── docker-compose.yml
```

## Troubleshooting

### Frontend nie ładuje się
```bash
docker-compose logs frontend
docker-compose restart frontend
```

### Backend nie odpowiada
```bash
docker-compose logs backend
docker-compose restart backend
```

### Baza danych nie działa
```bash
docker-compose logs db
docker-compose restart db
```

### Pełny restart
```bash
docker-compose down
docker-compose up -d
```

## Wsparcie

Wszystkie komponenty są skonfigurowane i działają. W razie problemów sprawdź logi używając `docker-compose logs [service_name]`.
