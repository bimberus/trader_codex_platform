# Instalacja

## Wymagania wstępne

- Docker i Docker Compose
- Git
- direnv
- Dostęp do Cloudflare

## Kroki instalacji

1. Sklonuj repozytorium:
```bash
git clone https://github.com/bimberus/trader_codex_platform.git
cd trader_codex_platform
```

2. Skopiuj przykładowy plik konfiguracyjny:
```bash
cp .envrc.example .envrc
```

3. Edytuj plik `.envrc` i dostosuj zmienne środowiskowe

4. Zezwól na ładowanie zmiennych środowiskowych:
```bash
direnv allow
```

5. Uruchom aplikację:
```bash
scripts/start.sh
```

## Weryfikacja instalacji

Sprawdź czy aplikacja działa poprawnie:

1. Frontend powinien być dostępny pod adresem: https://[DOMAIN]
2. API powinno być dostępne pod adresem: https://api.[DOMAIN]
3. Grafana powinna być dostępna pod adresem: https://grafana.[DOMAIN]

## Rozwiązywanie problemów

Jeśli napotkasz problemy podczas instalacji:

1. Sprawdź logi:
```bash
make logs
```

2. Sprawdź status kontenerów:
```bash
make ps
```

3. Upewnij się, że wszystkie wymagane porty są dostępne

4. Sprawdź konfigurację Cloudflare Tunnel