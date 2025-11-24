# 🚀 Google Tag Manager - Zintegrowany!

## ✅ Status: GOTOWE

Twój Google Tag Manager (GTM-554CLKKV) jest już w pełni zintegrowany z systemem cookies zgodnym z RODO!

## 🎯 Co działa automatycznie:

### 1. **Ładowanie warunkowe**
GTM ładuje się **tylko** gdy użytkownik zaakceptuje cookies analityczne:
- ✅ Akceptuj wszystkie → GTM się załaduje
- ✅ Tylko niezbędne → GTM NIE załaduje się
- ✅ Ustawienia + Analytics ON → GTM się załaduje

### 2. **Dwa punkty wejścia**
```html
<!-- JavaScript (główny) -->
<script>
  // Ładuje się dynamicznie po zgodzie
  initGoogleTagManager()
</script>

<!-- Noscript (fallback) -->
<noscript>
  <iframe src="...GTM-554CLKKV"></iframe>
</noscript>
```

### 3. **Pełna zgodność z RODO**
- 🔒 GTM NIE ładuje się bez zgody
- 🔒 Zgoda zapisana w localStorage
- 🔒 Użytkownik może zmienić w każdej chwili

## 📊 Jak testować:

### Test 1: Sprawdź czy GTM się ładuje
```javascript
// Otwórz Console (F12)
console.log(window.dataLayer);
// Powinno pokazać: [{gtm.start: ..., event: 'gtm.js'}]
```

### Test 2: Sprawdź Network
1. Otwórz DevTools → Network
2. Zaakceptuj cookies
3. Poszukaj: `gtm.js?id=GTM-554CLKKV`
4. Status: 200 OK ✅

### Test 3: GTM Preview Mode
1. Zaloguj się: https://tagmanager.google.com/
2. Wybierz: GTM-554CLKKV
3. Kliknij: **Preview**
4. Wklej URL swojej strony
5. Zobacz tagi w czasie rzeczywistym!

## 🔧 Dodawanie eventów do GTM

### Przykład: Śledzenie kliknięć w CTA
```typescript
// W dowolnym komponencie
const handleCTAClick = () => {
  // Wyślij event do GTM
  window.dataLayer?.push({
    event: 'cta_click',
    cta_location: 'hero',
    cta_text: 'Bezpłatna Wycena'
  });
  
  // Reszta logiki...
};
```

### Przykład: Śledzenie formularza
```typescript
const handleFormSubmit = () => {
  window.dataLayer?.push({
    event: 'form_submission',
    form_name: 'contact_form',
    form_location: 'footer'
  });
};
```

## 📈 Konfiguracja w Google Tag Manager

### Krok 1: Google Analytics 4
1. Workspace → Tags → New
2. Tag Type: **Google Analytics: GA4 Configuration**
3. Measurement ID: Twoje `G-XXXXXXXXXX`
4. Trigger: **All Pages**
5. Save & Publish

### Krok 2: Konwersje
1. Workspace → Tags → New
2. Tag Type: **Google Analytics: GA4 Event**
3. Event Name: `conversion`
4. Parameters dodaj według potrzeb
5. Trigger: **Custom Event** (np. form_submission)
6. Save & Publish

### Krok 3: Facebook Pixel (opcjonalnie)
1. Tags → New
2. Tag Type: **Custom HTML**
3. Wklej kod Facebook Pixel
4. Advanced Settings → Firing Priority: **1**
5. Trigger: **All Pages**
6. Save & Publish

## 🐛 Rozwiązywanie problemów

### GTM nie ładuje się?
1. Sprawdź czy zaakceptowałeś cookies analityczne
2. Otwórz Console - czy są błędy?
3. Sprawdź localStorage: `localStorage.getItem('cookie-consent')`

### dataLayer jest undefined?
```typescript
// Bezpieczne pushowanie
if (typeof window !== 'undefined' && window.dataLayer) {
  window.dataLayer.push({...});
}
```

### GTM Preview nie działa?
1. Wyczyść cache przeglądarki (Ctrl+Shift+Del)
2. Użyj trybu incognito
3. Sprawdź czy domena się zgadza

## 📚 Przydatne linki

- [Google Tag Manager Dashboard](https://tagmanager.google.com/)
- [GTM Documentation](https://developers.google.com/tag-platform/tag-manager)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [DataLayer Variables](https://developers.google.com/tag-platform/tag-manager/datalayer)

## 🎉 Następne kroki

1. ✅ Skonfiguruj Google Analytics 4 w GTM
2. ✅ Dodaj conversion tracking
3. ✅ Ustaw cele i ścieżki konwersji
4. ✅ Zintegruj z Google Ads (jeśli używasz)
5. ✅ Dodaj Facebook Pixel (opcjonalnie)

---

**Pytania?** Sprawdź `COOKIES.md` lub `src/lib/cookies.ts`
