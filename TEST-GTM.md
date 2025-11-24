# 🧪 Jak przetestować GTM + Cookies

## Quick Start (5 minut)

### 1. Uruchom serwer
```bash
npm run dev
```

### 2. Otwórz stronę w trybie incognito
```
http://localhost:3000
```

### 3. Poczekaj 1 sekundę
Banner cookies powinien się pojawić! 🍪

### 4. Kliknij "Akceptuj wszystkie"

### 5. Otwórz Console (F12)
```javascript
// Sprawdź dataLayer
window.dataLayer
// Powinno pokazać: [{gtm.start: ..., event: 'gtm.js'}]

// Sprawdź zgodę
localStorage.getItem('cookie-consent')
// Powinno pokazać: {"necessary":true,"analytics":true,"marketing":true}
```

### 6. Sprawdź Network (F12 → Network tab)
- Poszukaj: `gtm.js?id=GTM-554CLKKV`
- Status: **200** ✅

## Scenariusze testowe

### ✅ Test 1: Akceptuj wszystkie
1. Otwórz stronę (incognito)
2. Kliknij "Akceptuj wszystkie"
3. Sprawdź: `window.dataLayer` - powinien istnieć
4. Sprawdź Network - `gtm.js` załadowany

### ✅ Test 2: Tylko niezbędne
1. Otwórz stronę (incognito)
2. Kliknij "Tylko niezbędne"
3. Sprawdź: `window.dataLayer` - powinien być undefined
4. Sprawdź Network - BRAK `gtm.js`

### ✅ Test 3: Własne ustawienia
1. Otwórz stronę (incognito)
2. Kliknij "Ustawienia"
3. Włącz tylko Analytics (wyłącz Marketing)
4. Kliknij "Zapisz ustawienia"
5. Sprawdź: `window.dataLayer` - powinien istnieć
6. Sprawdź localStorage:
```javascript
JSON.parse(localStorage.getItem('cookie-consent'))
// {necessary: true, analytics: true, marketing: false}
```

### ✅ Test 4: Zarządzaj cookies (reset)
1. Zaakceptuj cookies
2. Scroll na dół strony do stopki
3. Kliknij "Zarządzaj cookies"
4. Strona się przeładuje
5. Banner powinien pojawić się ponownie

### ✅ Test 5: Powrót na stronę
1. Zaakceptuj cookies
2. Zamknij kartę
3. Otwórz stronę ponownie (NIE incognito)
4. Banner NIE powinien się pokazać
5. GTM powinien załadować się automatycznie

## GTM Preview Mode (Advanced)

### 1. Zaloguj się do GTM
https://tagmanager.google.com/

### 2. Wybierz kontener
GTM-554CLKKV

### 3. Włącz Preview
- Kliknij przycisk "Preview" (góra po prawej)
- Wpisz URL: `http://localhost:3000`
- Kliknij "Connect"

### 4. Zaakceptuj cookies na swojej stronie

### 5. Zobacz debug panel
- Lewa strona: Lista eventów
- Prawa strona: Tagi które się uruchomiły
- Debug: Szczegóły każdego taga

### 6. Testuj eventy
```javascript
// W Console swojej strony
window.dataLayer.push({
  event: 'test_event',
  test_data: 'hello GTM!'
});
```
Zobaczysz event w debug panelu! 🎉

## Checklist przed wdrożeniem

- [ ] Banner cookies się pokazuje
- [ ] Można wybrać wszystkie 3 opcje
- [ ] GTM ładuje się tylko po zgodzie
- [ ] Przycisk "Zarządzaj cookies" działa
- [ ] localStorage zapisuje preferencje
- [ ] GTM Preview Mode działa
- [ ] Polityka Prywatności jest aktualna
- [ ] Regulamin jest aktualny

## Problemy i rozwiązania

### 🔴 Banner się nie pokazuje
```javascript
// Sprawdź localStorage
localStorage.removeItem('cookie-consent')
localStorage.removeItem('cookie-consent-date')
// Odśwież stronę
```

### 🔴 GTM się nie ładuje
```javascript
// Sprawdź zgodę
const consent = JSON.parse(localStorage.getItem('cookie-consent'))
console.log('Analytics:', consent.analytics) // Musi być true
```

### 🔴 dataLayer jest undefined
```javascript
// Poczekaj 2 sekundy po zaakceptowaniu
setTimeout(() => {
  console.log(window.dataLayer)
}, 2000)
```

### 🔴 GTM Preview nie łączy się
1. Wyłącz AdBlocker
2. Wyczyść cache (Ctrl+Shift+Del)
3. Sprawdź czy URL się zgadza
4. Użyj trybu incognito

## Tips & Tricks

### Szybki reset (dev mode)
```javascript
// W Console
localStorage.clear()
location.reload()
```

### Debug GTM
```javascript
// Zobacz wszystkie eventy
window.dataLayer.forEach((item, index) => {
  console.log(index, item)
})
```

### Testuj bez reload
```javascript
// Załaduj GTM ręcznie (dev only)
import('@/lib/cookies').then(m => m.initGoogleTagManager())
```

### Sprawdź kiedy zgoda została udzielona
```javascript
const date = localStorage.getItem('cookie-consent-date')
console.log('Zgoda z:', new Date(date).toLocaleString())
```

---

✅ **Gotowe do produkcji!**
