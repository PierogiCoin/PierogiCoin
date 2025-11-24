# 🍪 System Zarządzania Cookies

## Przegląd

Projekt zawiera kompletny system zgody na cookies zgodny z RODO (GDPR), który:

- ✅ Wyświetla banner cookies przy pierwszej wizycie
- ✅ Pozwala na szczegółowe zarządzanie preferencjami
- ✅ Zapisuje wybory użytkownika w localStorage
- ✅ Umożliwia ponowne zarządzanie cookies w stopce
- ✅ Jest responsywny i dostępny

## Komponenty

### 1. `CookieConsent.tsx`
Główny komponent banera cookies z trzema trybami:
- **Akceptuj wszystkie** - zgoda na wszystkie typy cookies
- **Tylko niezbędne** - tylko wymagane cookies
- **Ustawienia** - szczegółowe zarządzanie preferencjami

### 2. `lib/cookies.ts`
Helper functions do sprawdzania zgody w kodzie:

```typescript
import { hasConsent, getCookiePreferences, initGoogleAnalytics } from '@/lib/cookies';

// Sprawdź czy użytkownik zgodził się na analytics
if (hasConsent('analytics')) {
  // Inicjalizuj Google Analytics
  initGoogleAnalytics();
}

// Pobierz wszystkie preferencje
const preferences = getCookiePreferences();
console.log(preferences); // { necessary: true, analytics: true, marketing: false }
```

## Typy Cookies

### Niezbędne (necessary)
- Zawsze włączone
- Wymagane do podstawowego działania strony
- Przykłady: zgoda na cookies, sesja użytkownika

### Analityczne (analytics)
- Opcjonalne
- Google Analytics, statystyki odwiedzin
- Użytkownik może wyłączyć

### Marketingowe (marketing)
- Opcjonalne
- Facebook Pixel, reklamy, remarketing
- Użytkownik może wyłączyć

## Integracja z Google Tag Manager

✅ **GTM jest już skonfigurowany!** (ID: GTM-554CLKKV)

W `lib/cookies.ts` znajduje się funkcja `initGoogleTagManager()`. Działa automatycznie gdy:

1. Użytkownik zaakceptuje cookies analityczne
2. Strona załaduje się ponownie (jeśli użytkownik już wybrał wcześniej)

### Jak to działa:

```typescript
// W CookieConsent.tsx - automatyczne ładowanie
if (prefs.analytics) {
  import('@/lib/cookies').then(({ initGoogleTagManager }) => {
    initGoogleTagManager(); // ✅ GTM-554CLKKV ładuje się tutaj
  });
}
```

### Co jest śledzone:

- ✅ **Pageviews** - automatycznie przez GTM
- ✅ **Events** - możesz dodać własne w Google Tag Manager
- ✅ **Conversions** - konfiguruj w GTM dashboard
- ✅ **E-commerce** - jeśli skonfigurujesz w GTM

### Testowanie GTM:

1. Otwórz stronę w trybie incognito
2. Akceptuj cookies (analityczne)
3. Otwórz Chrome DevTools → Console
4. Wpisz: `window.dataLayer`
5. Powinieneś zobaczyć tablicę z eventami GTM

### GTM Preview Mode:

1. Zaloguj się do [Google Tag Manager](https://tagmanager.google.com/)
2. Wybierz kontener GTM-554CLKKV
3. Kliknij "Preview"
4. Wpisz URL swojej strony
5. Zobacz które tagi się uruchamiają w czasie rzeczywistym!

## Zarządzanie Cookies przez Użytkownika

Użytkownik może ponownie otworzyć ustawienia cookies poprzez:

1. **Przycisk w stopce** - "Zarządzaj cookies"
2. **Funkcja reset** - `resetCookieConsent()` z `lib/cookies.ts`

Przycisk w stopce resetuje localStorage i przeładowuje stronę, aby wyświetlić banner ponownie.

## Dostosowanie Stylu

Banner używa Tailwind CSS i automatycznie dostosowuje się do motywu (light/dark).

Główne klasy CSS:
- `bg-white dark:bg-slate-900` - tło banera
- `from-cyan-500 to-blue-500` - gradient przycisków
- `rounded-2xl shadow-2xl` - zaokrąglenia i cienie

## Zgodność z RODO

System jest zgodny z RODO dzięki:

- ✅ Jawnej zgody użytkownika (opt-in)
- ✅ Szczegółowym opisom każdego typu cookies
- ✅ Możliwości zmiany preferencji w każdej chwili
- ✅ Linkom do Polityki Prywatności
- ✅ Blokowaniu niewymaganych cookies przed zgodą

## Testowanie

1. Otwórz stronę w trybie incognito
2. Powinien pojawić się banner cookies po 1 sekundzie
3. Przetestuj wszystkie opcje:
   - Akceptuj wszystkie
   - Tylko niezbędne
   - Ustawienia (toggle poszczególnych cookies)
4. Sprawdź localStorage:
   ```javascript
   localStorage.getItem('cookie-consent')
   // {"necessary":true,"analytics":true,"marketing":true}
   ```
5. Kliknij "Zarządzaj cookies" w stopce - banner powinien pojawić się ponownie

## Przyszłe Rozszerzenia

Możesz dodać:
- 🔄 Automatyczne wygaśnięcie zgody po X miesiącach
- 📊 Więcej typów cookies (funkcjonalne, preferencje, itp.)
- 🌐 Wielojęzyczność
- 📱 Dedykowaną stronę `/cookies` z pełną listą używanych cookies
- 🔔 Powiadomienie o zmianie polityki cookies

## Wsparcie

W razie pytań sprawdź:
- `src/components/CookieConsent.tsx` - główna logika
- `src/lib/cookies.ts` - funkcje pomocnicze
- `src/app/polityka-prywatnosci/page.tsx` - dokumentacja prawna
