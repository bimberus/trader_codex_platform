# 🤖 Freqtrade Configuration for Binance

## 📋 Spis Treści
1. [Konfiguracja Kluczy API](#konfiguracja-kluczy-api)
2. [Tryb Dry Run vs Live Trading](#tryb-dry-run-vs-live-trading)
3. [Uruchomienie](#uruchomienie)
4. [Dostęp do API](#dostęp-do-api)
5. [Monitorowanie](#monitorowanie)
6. [Bezpieczeństwo](#bezpieczeństwo)

---

## 🔑 Konfiguracja Kluczy API

### Krok 1: Uzyskaj klucze API z Binance

#### A) **Testnet (ZALECANE do testów)**
1. Przejdź do: https://testnet.binance.vision/
2. Zaloguj się przez GitHub
3. Wygeneruj klucze API testowe
4. Użyj ich do testowania bez ryzyka

#### B) **Production (tylko dla prawdziwego tradingu)**
1. Zaloguj się na https://www.binance.com
2. Przejdź do **Account** → **API Management**
3. Utwórz nowy klucz API:
   - Nazwa: `FreqtradeBot`
   - Uprawnienia: **Tylko "Enable Spot & Margin Trading"**
   - ❌ **NIE włączaj "Enable Withdrawals"!**
4. Ustaw ograniczenia IP (zalecane)
5. Zapisz API Key i Secret Key

### Krok 2: Zaktualizuj konfigurację

#### Edytuj `config.json`:
```bash
cd freqtrade
nano config.json  # lub użyj innego edytora
```

Znajdź sekcję `exchange` i zmień:
```json
"exchange": {
  "name": "binance",
  "key": "YOUR_BINANCE_API_KEY",      ← Wklej tu swój klucz
  "secret": "YOUR_BINANCE_API_SECRET", ← Wklej tu swój secret
  ...
}
```

#### Dla Testnet (opcjonalnie):
```json
"exchange": {
  "name": "binance",
  "key": "YOUR_TESTNET_KEY",
  "secret": "YOUR_TESTNET_SECRET",
  "ccxt_config": {
    "urls": {
      "api": {
        "public": "https://testnet.binance.vision/api",
        "private": "https://testnet.binance.vision/api"
      }
    }
  }
}
```

---

## 🎮 Tryb Dry Run vs Live Trading

### Dry Run (Symulacja - DOMYŚLNIE)
W `config.json`:
```json
"dry_run": true,
"dry_run_wallet": 1000,  // Startowy kapitał w USDT
```

✅ **Bezpieczne** - nie używa prawdziwych pieniędzy  
✅ Testuje strategię na danych live  
✅ Brak ryzyka finansowego

### Live Trading (PRAWDZIWE PIENIĄDZE)
W `config.json`:
```json
"dry_run": false,
```

⚠️ **UWAGA**: To używa prawdziwych środków!
- Zacznij od małych kwot
- Testuj najpierw na Testnet
- Monitoruj regularnie

---

## 🚀 Uruchomienie

### 1. Zbuduj i uruchom wszystkie kontenery:
```bash
# Z głównego katalogu projektu
docker-compose up -d
```

### 2. Sprawdź logi Freqtrade:
```bash
docker-compose logs -f freqtrade
```

### 3. Zatrzymanie:
```bash
docker-compose down
```

### 4. Restart tylko Freqtrade:
```bash
docker-compose restart freqtrade
```

---

## 🔌 Dostęp do API

### REST API Freqtrade:
- **URL**: http://localhost:8080
- **Username**: `admin`
- **Password**: `freqtrader123`

### Swagger UI (dokumentacja API):
http://localhost:8080/api/v1/ui/

### Przykładowe requesty:

#### Status bota:
```bash
curl -X GET "http://localhost:8080/api/v1/status" \
  -H "Authorization: Basic YWRtaW46ZnJlcXRyYWRlcjEyMw=="
```

#### Profit info:
```bash
curl -X GET "http://localhost:8080/api/v1/profit" \
  -H "Authorization: Basic YWRtaW46ZnJlcXRyYWRlcjEyMw=="
```

### Przez Trader Codex API:
- `GET http://localhost:8000/api/freqtrade/status`
- `GET http://localhost:8000/api/freqtrade/profit`
- `GET http://localhost:8000/api/freqtrade/balance`
- `GET http://localhost:8000/api/freqtrade/trades`

---

## 📊 Monitorowanie

### 1. Dashboard Trader Codex:
http://localhost:3000/dashboard

### 2. Logi w czasie rzeczywistym:
```bash
docker-compose logs -f freqtrade
```

### 3. Pliki logów:
```
freqtrade/user_data/logs/freqtrade.log
```

### 4. Baza danych tradów:
```
freqtrade/user_data/tradesv3.sqlite
```

---

## 🔒 Bezpieczeństwo

### ✅ ZAWSZE:
1. **Używaj Testnet najpierw** - testuj strategię bez ryzyka
2. **Ogranicz uprawnienia API** - tylko Spot Trading
3. **NIE włączaj Withdrawals** - zapobiega kradzieży środków
4. **Ustaw limity IP** - ogranicz dostęp do swojego IP
5. **Używaj silnych haseł** - dla API Freqtrade
6. **Regularnie monitoruj** - sprawdzaj logi i dashboard
7. **Zacznij od małych kwot** - testuj na niewielkich kwotach
8. **Backup strategii** - zapisuj konfiguracje

### ❌ NIGDY:
1. ❌ Nie commituj kluczy API do Gita
2. ❌ Nie udostępniaj kluczy API
3. ❌ Nie włączaj Withdrawals w API
4. ❌ Nie handluj kwotami, których nie możesz stracić
5. ❌ Nie używaj produkcyjnych kluczy do testów

### 📝 .gitignore (już dodane):
```
freqtrade/.env
freqtrade/config.json
freqtrade/user_data/logs/*
freqtrade/user_data/*.sqlite
freqtrade/user_data/data/*
```

---

## ⚙️ Konfiguracja Strategii

### Pary tradingowe:
W `config.json` → `exchange.pair_whitelist`:
```json
"pair_whitelist": [
  "BTC/USDT",
  "ETH/USDT",
  "BNB/USDT",
  "SOL/USDT",
  "ADA/USDT"
]
```

### Parametry strategii:
W `user_data/strategies/SampleStrategy.py`:
```python
minimal_roi = {
    "60": 0.01,  # 1% po 60 minutach
    "30": 0.02,  # 2% po 30 minutach
    "0": 0.04    # 4% natychmiast
}

stoploss = -0.10  # Stop loss na -10%
timeframe = '5m'   # Timeframe 5 minut
```

### Tworzenie własnej strategii:
```bash
# Skopiuj przykładową strategię
cp freqtrade/user_data/strategies/SampleStrategy.py \
   freqtrade/user_data/strategies/MyStrategy.py

# Edytuj swoją strategię
nano freqtrade/user_data/strategies/MyStrategy.py

# Zmień nazwę klasy i parametry
# Uruchom z nową strategią w docker-compose.yml:
# --strategy MyStrategy
```

---

## 🧪 Testowanie Strategii

### Backtesting (test historyczny):
```bash
docker exec -it freqtrade freqtrade backtesting \
  --config /freqtrade/config.json \
  --strategy SampleStrategy \
  --timerange 20231101-20231201
```

### Hyperopt (optymalizacja parametrów):
```bash
docker exec -it freqtrade freqtrade hyperopt \
  --config /freqtrade/config.json \
  --hyperopt-loss SharpeHyperOptLoss \
  --strategy SampleStrategy \
  --epochs 100
```

---

## 🆘 Troubleshooting

### Problem: Bot się nie uruchamia
```bash
# Sprawdź logi
docker-compose logs freqtrade

# Zweryfikuj konfigurację
docker exec -it freqtrade freqtrade show-config
```

### Problem: Brak połączenia z Binance
- Sprawdź klucze API w `config.json`
- Zweryfikuj uprawnienia API na Binance
- Sprawdź połączenie internetowe
- Dla Testnet: sprawdź URL w `ccxt_config`

### Problem: Brak transakcji
- Sprawdź czy `dry_run: true` (tylko symulacja)
- Sprawdź pary w `pair_whitelist`
- Zweryfikuj warunki strategii
- Sprawdź saldo: `max_open_trades` vs dostępne środki

---

## 📚 Dokumentacja

- **Freqtrade Docs**: https://www.freqtrade.io/en/stable/
- **Binance API**: https://binance-docs.github.io/apidocs/spot/en/
- **Trading Strategies**: https://www.freqtrade.io/en/stable/strategy-customization/
- **Backtesting**: https://www.freqtrade.io/en/stable/backtesting/

---

## 📞 Support

Jeśli masz pytania:
1. Sprawdź logi: `docker-compose logs freqtrade`
2. Dokumentacja Freqtrade: https://www.freqtrade.io/en/stable/
3. Discord Freqtrade: https://discord.gg/MA9v74M

---

**🎯 Miłego tradingu! Pamiętaj: handluj odpowiedzialnie!**
