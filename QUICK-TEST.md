# ⚡ Quick Test Guide - 2 minuty

## 1. Uruchom projekt
```bash
npm run dev
```

## 2. Otwórz DevTools (F12)
- Przełącz na mobile view (Ctrl+Shift+M)
- Wybierz "iPhone 12 Pro" lub "Pixel 5"

## 3. Przetestuj główne funkcje

### ✅ Cookies Banner (5s)
1. Otwórz stronę w incognito
2. Poczekaj 1s → Banner cookies się pojawi
3. Kliknij "Akceptuj wszystkie"
4. Console: `window.dataLayer` → powinien pokazać GTM

### ✅ Pływający Telefon (10s)
1. Poczekaj 5s → Przycisk telefonu wystrzelił z prawego dolnego rogu
2. Kliknij → Powinien otworzyć się telefon (`tel:+48790629497`)
3. Console: Sprawdź event `phone_click` w dataLayer

### ✅ Scroll Test (5s)
1. Scrolluj na sam dół do sekcji "Kontakt"
2. Przycisk telefonu powinien zniknąć
3. Scrolluj z powrotem do góry
4. Przycisk powinien wrócić

### ✅ Zamknięcie (5s)
1. Kliknij przycisk X na przycisku telefonu
2. Przycisk znika z obrotem
3. Odśwież stronę (F5)
4. Przycisk NIE wraca (zapisane w sessionStorage)

### ✅ GTM Tracking (10s)
1. Console: `window.dataLayer`
2. Powinny być eventy:
   - `gtm.js` (GTM załadowany)
   - `gtm.start` (czas startu)
3. Po kliknięciu telefonu:
   - `phone_click` (tracking)

### ✅ Dark Mode (5s)
1. Znajdź toggle motywu w headerze
2. Przełącz Light/Dark
3. Wszystko powinno płynnie się zmienić
4. Pływający telefon też się dostosowuje

## 4. Desktop Test (5s)
- Przełącz z powrotem na desktop view
- Przycisk telefonu NIE powinien się pokazać
- Pozostałe funkcje działają normalnie

## 5. Checklist ✅

- [ ] Cookies banner działa
- [ ] GTM się ładuje po zgodzie
- [ ] Pływający telefon pojawia się po 5s
- [ ] Telefon ukrywa się w sekcji kontakt
- [ ] Można zamknąć przycisk telefonu
- [ ] GTM trackuje kliknięcia
- [ ] Dark mode działa
- [ ] Desktop nie pokazuje przycisku telefonu

## 🎉 Wszystko działa? Gotowe do wdrożenia!

### Następne kroki:
1. ✅ Deploy na Vercel/Netlify
2. ✅ Sprawdź na prawdziwym mobile (nie emulator)
3. ✅ Skonfiguruj GA4 w Google Tag Manager
4. ✅ Monitoruj konwersje (phone clicks)

---

**Problemy?** Sprawdź:
- `COOKIES.md` - System cookies
- `GTM-INTEGRATION.md` - Google Tag Manager
- `FLOATING-PHONE.md` - Pływający przycisk
- `TEST-GTM.md` - Szczegółowe testy
