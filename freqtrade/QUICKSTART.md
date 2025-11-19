# 🚀 QUICK START - Freqtrade na Binance

## ⚡ Szybki Start (5 minut)

### 1. Edytuj config.json z kluczami API

```bash
cd freqtrade
nano config.json
```

Znajdź i zmień:
```json
"exchange": {
  "name": "binance",
  "key": "WKLEJ_TU_API_KEY",      ← ZMIEŃ TO!
  "secret": "WKLEJ_TU_API_SECRET", ← ZMIEŃ TO!
  ...
}
```

### 2. Uruchom wszystko

```bash
cd ..  # wróć do głównego katalogu
docker-compose up -d
```

### 3. Sprawdź logi

```bash
docker-compose logs -f freqtrade
```

### 4. Otwórz Dashboard

http://localhost:3000

---

## 🎮 Tryby pracy

### DRY RUN (Symulacja - DOMYŚLNIE) ✅
- Nie używa prawdziwych pieniędzy
- Testuje strategię na danych live
- Symuluje transakcje z wirtualnym portfelem $1000

### LIVE TRADING ⚠️
W `config.json` zmień:
```json
"dry_run": false
```

**UWAGA**: To używa prawdziwych pieniędzy! Zacznij od małych kwot!

---

## 📊 Gdzie uzyskać klucze API?

### Testnet (ZALECANE do testów):
1. https://testnet.binance.vision/
2. Zaloguj przez GitHub
3. Wygeneruj klucze testowe
4. Dodaj do config.json sekcję testnet (patrz README.md)

### Production (prawdziwe pieniądze):
1. https://www.binance.com → API Management
2. Stwórz nowy klucz z uprawnieniami "Spot Trading"
3. ❌ NIE włączaj "Withdrawals"
4. Ogranicz do swojego IP (zalecane)

---

## 🔍 Monitorowanie

### Dashboard Trader Codex:
http://localhost:3000

### API Status:
http://localhost:8000/api/freqtrade/status

### Swagger Freqtrade:
http://localhost:8080/api/v1/ui/

### Logi:
```bash
docker-compose logs -f freqtrade
```

---

## ⚙️ Dostosowanie strategii

Edytuj pary tradingowe w `config.json`:
```json
"pair_whitelist": [
  "BTC/USDT",
  "ETH/USDT",
  "SOL/USDT"
]
```

Zmień parametry w `user_data/strategies/SampleStrategy.py`:
```python
minimal_roi = {"60": 0.01, "30": 0.02, "0": 0.04}
stoploss = -0.10
timeframe = '5m'
```

---

## 🛑 Stop/Start/Restart

```bash
# Stop all
docker-compose down

# Start all
docker-compose up -d

# Restart tylko Freqtrade
docker-compose restart freqtrade

# Rebuild po zmianach w config
docker-compose up -d --force-recreate freqtrade
```

---

## ⚠️ BEZPIECZEŃSTWO - PRZECZYTAJ!

### ✅ ZAWSZE:
- Testuj na Testnet najpierw
- Używaj tylko "Spot Trading" permissions
- NIE włączaj "Withdrawals" w API
- Ogranicz IP w ustawieniach API
- Zacznij od małych kwot

### ❌ NIGDY:
- Nie commituj kluczy API do Gita
- Nie udostępniaj swoich kluczy
- Nie włączaj Withdrawals
- Nie handluj kwotami, których nie możesz stracić

---

## 📚 Więcej informacji

Szczegółowa dokumentacja: `freqtrade/README.md`

**Gotowe! Bot już pracuje! 🎉**

(W trybie DRY RUN - sprawdź logi: `docker-compose logs -f freqtrade`)
