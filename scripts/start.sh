#!/bin/bash

# Sprawdzenie wymaganych zmiennych środowiskowych
required_vars=(
    "DATABASE_URL"
    "JWT_SECRET_KEY"
    "FREQTRADE_API_SERVER"
    "FREQTRADE_USERNAME"
    "FREQTRADE_PASSWORD"
    "CLOUDFLARE_TUNNEL_TOKEN"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Error: $var is not set"
        exit 1
    fi
done

# Uruchomienie aplikacji
docker-compose up -d

echo "Aplikacja została uruchomiona"
echo "Frontend: https://[DOMAIN]"
echo "API: https://api.[DOMAIN]"
echo "Grafana: https://grafana.[DOMAIN]"