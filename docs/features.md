# Funkcje Platformy Trader Codex

## 🔐 System Autentykacji

Pełny system zarządzania użytkownikami i bezpieczeństwa.

- **Rejestracja i Logowanie**: Bezpieczna rejestracja użytkowników i logowanie zgodne z OAuth2.
- **JWT Tokens**: Wykorzystanie tokenów JWT do autoryzacji sesji.
- **Zabezpieczone Trasy**: Ochrona dostępu do prywatnych zasobów zarówno po stronie backendu, jak i frontendu.
- **Automatyczne Wylogowanie**: Obsługa wygasania tokenów i bezpieczne wylogowanie.

## 🤖 Zarządzanie Botami Tradingowymi

Centrum dowodzenia dla Twoich operacji handlowych.

- **CRUD Operacje**: Pełna możliwość tworzenia, edycji, usuwania i podglądu botów.
- **Kontrola Stanu**: Uruchamianie i zatrzymywanie botów jednym kliknięciem.
- **Status Live**: Podgląd statusu botów w czasie rzeczywistym (Aktywny, Zatrzymany, Błąd).
- **Statystyki**: Natychmiastowy dostęp do informacji o zyskach, saldzie i liczbie transakcji dla każdego bota.

## 📊 Dashboard w Czasie Rzeczywistym

Interaktywne centrum monitoringu.

- **Live Updates**: Wykorzystanie WebSocket do natychmiastowej aktualizacji danych bez odświeżania strony.
- **Wskaźniki Kluczowe**:
    - Całkowite Saldo (Total Balance)
    - Aktywne Boty
    - Całkowity Zysk (Total Profit)
    - Liczba Transakcji
- **Ostatnie Transakcje**: Podgląd na żywo ostatnich operacji kupna i sprzedaży.
- **Wskaźnik Połączenia**: Informacja o stanie połączenia z serwerem (Live/Offline).

## 📈 Analityka i Wizualizacje

Zaawansowane narzędzia do analizy wyników.

- **Wykres Zysków (Profit Chart)**:
    - Interaktywny wykres liniowy/obszarowy.
    - Wizualizacja przyrostu kapitału w czasie.
- **Rozkład Portfela (Portfolio Distribution)**:
    - Wykres kołowy pokazujący alokację środków w różnych parach walutowych.
- **Wydajność Botów (Performance Chart)**:
    - Porównanie wyników poszczególnych botów.
    - Analiza skuteczności strategii.
- **Szczegółowe Raporty**: Karty wyników dla każdego bota z osobna.

## 🔄 Integracja z Freqtrade

Bezpośrednie połączenie z silnikiem Freqtrade.

- **Sterowanie**: Możliwość sterowania instancjami Freqtrade z poziomu platformy.
- **Monitoring**: Pobieranie statusu, zysków i historii transakcji bezpośrednio z Freqtrade API.
- **Synchronizacja**: Spójność danych między platformą a silnikiem tradingowym.
