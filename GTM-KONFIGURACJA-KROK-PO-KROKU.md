# 🎯 Google Tag Manager - Konfiguracja Krok Po Kroku

## 📋 Przed rozpoczęciem

✅ Masz **GTM-554CLKKV** (już zintegrowane w kodzie)  
❓ Potrzebujesz **Measurement ID z Google Analytics 4**

---

## KROK 1: Załóż Google Analytics 4 (jeśli nie masz)

### 1.1 Przejdź na: https://analytics.google.com/

### 1.2 Kliknij "Start measuring"
- Account name: **Twoja firma**
- Property name: **Twoja strona**
- Timezone: **Poland**
- Currency: **PLN**

### 1.3 Zapisz swoje **Measurement ID**
```
Wyglada tak: G-XXXXXXXXXX
```
**ZAPISZ TO!** Będziesz potrzebować za chwilę.

---

## KROK 2: Zaloguj się do Google Tag Manager

### 2.1 Przejdź: https://tagmanager.google.com/

### 2.2 Wybierz kontener: **GTM-554CLKKV**

### 2.3 Kliknij "Workspace" (górny pasek)

---

## KROK 3: Utwórz Zmienne (Variables)

### 3.1 Kliknij: **Variables** (lewy panel)

### 3.2 Kliknij: **New** w sekcji "User-Defined Variables"

### 3.3 Stwórz te zmienne (jedna po drugiej):

#### Zmienna 1: cta_text
```
1. Kliknij "Variable Configuration"
2. Wybierz: "Data Layer Variable"
3. Data Layer Variable Name: cta_text
4. Nazwa zmiennej: DLV - cta_text
5. Kliknij "Save"
```

#### Zmienna 2: phone_location
```
1. New → Variable Configuration
2. Wybierz: "Data Layer Variable"
3. Data Layer Variable Name: phone_location
4. Nazwa zmiennej: DLV - phone_location
5. Save
```

#### Zmienna 3: form_name
```
1. New → Variable Configuration
2. Wybierz: "Data Layer Variable"
3. Data Layer Variable Name: form_name
4. Nazwa zmiennej: DLV - form_name
5. Save
```

#### Zmienna 4: calculator_value
```
1. New → Variable Configuration
2. Wybierz: "Data Layer Variable"
3. Data Layer Variable Name: calculator_value
4. Nazwa zmiennej: DLV - calculator_value
5. Save
```

#### Zmienna 5: lead_source
```
1. New → Variable Configuration
2. Wybierz: "Data Layer Variable"
3. Data Layer Variable Name: lead_source
4. Nazwa zmiennej: DLV - lead_source
5. Save
```

#### Zmienna 6: project_name
```
1. New → Variable Configuration
2. Wybierz: "Data Layer Variable"
3. Data Layer Variable Name: project_name
4. Nazwa zmiennej: DLV - project_name
5. Save
```

#### Zmienna 7: scroll_percentage
```
1. New → Variable Configuration
2. Wybierz: "Data Layer Variable"
3. Data Layer Variable Name: scroll_percentage
4. Nazwa zmiennej: DLV - scroll_percentage
5. Save
```

### ✅ Masz 7 zmiennych? Super! Idziemy dalej.

---

## KROK 4: Utwórz Wyzwalacze (Triggers)

### 4.1 Kliknij: **Triggers** (lewy panel)

### 4.2 Kliknij: **New**

### 4.3 Stwórz te wyzwalacze:

#### Wyzwalacz 1: CTA Click
```
1. Trigger Configuration → "Custom Event"
2. Event name: cta_click
3. Nazwa triggera: CE - CTA Click
4. Save
```

#### Wyzwalacz 2: Phone Click
```
1. New → Custom Event
2. Event name: phone_click
3. Nazwa: CE - Phone Click
4. Save
```

#### Wyzwalacz 3: Form Submit
```
1. New → Custom Event
2. Event name: form_submission
3. Nazwa: CE - Form Submission
4. Save
```

#### Wyzwalacz 4: Calculator Complete
```
1. New → Custom Event
2. Event name: calculator_complete
3. Nazwa: CE - Calculator Complete
4. Save
```

#### Wyzwalacz 5: Lead (KONWERSJA!)
```
1. New → Custom Event
2. Event name: generate_lead
3. Nazwa: CE - Generate Lead
4. Save
```

#### Wyzwalacz 6: Portfolio Click
```
1. New → Custom Event
2. Event name: portfolio_click
3. Nazwa: CE - Portfolio Click
4. Save
```

#### Wyzwalacz 7: Scroll Depth
```
1. New → Custom Event
2. Event name: scroll_depth
3. Nazwa: CE - Scroll Depth
4. Save
```

### ✅ Masz 7 wyzwalaczy? Świetnie!

---

## KROK 5: Główny Tag GA4

### 5.1 Kliknij: **Tags** (lewy panel)

### 5.2 Kliknij: **New**

### 5.3 Konfiguracja:
```
1. Tag Configuration → "Google Analytics: GA4 Configuration"
2. Measurement ID: G-XXXXXXXXXX (WKLEJ SWOJE!)
3. Nazwa taga: GA4 - Configuration
```

### 5.4 Triggering:
```
1. Kliknij "Triggering"
2. Wybierz: "All Pages"
3. Save
```

### ✅ WAŻNE: Bez tego nic nie zadziała!

---

## KROK 6: Tag dla Wszystkich Eventów

### 6.1 Tags → **New**

### 6.2 Tag Configuration:
```
1. Wybierz: "Google Analytics: GA4 Event"
2. Configuration Tag: {{GA4 - Configuration}}
3. Event Name: {{Event}}
```

### 6.3 Event Parameters - KLIKNIJ "Add Row" 7 razy:
```
Parameter Name          |  Value
------------------------|-------------------------
cta_text                |  {{DLV - cta_text}}
phone_location          |  {{DLV - phone_location}}
form_name               |  {{DLV - form_name}}
calculator_value        |  {{DLV - calculator_value}}
lead_source             |  {{DLV - lead_source}}
project_name            |  {{DLV - project_name}}
scroll_percentage       |  {{DLV - scroll_percentage}}
```

### 6.4 Nazwa taga:
```
GA4 - All Custom Events
```

### 6.5 Triggering:
```
1. Kliknij "Triggering"
2. Dodaj WSZYSTKIE stworzone triggery (7 sztuk):
   - CE - CTA Click
   - CE - Phone Click
   - CE - Form Submission
   - CE - Calculator Complete
   - CE - Generate Lead
   - CE - Portfolio Click
   - CE - Scroll Depth
3. Save
```

---

## KROK 7: Tag dla Konwersji (Lead)

### 7.1 Tags → **New**

### 7.2 Tag Configuration:
```
1. Google Analytics: GA4 Event
2. Configuration Tag: {{GA4 - Configuration}}
3. Event Name: generate_lead
```

### 7.3 Event Parameters:
```
Parameter Name  |  Value
----------------|------------------------
value           |  {{DLV - calculator_value}}
currency        |  PLN
lead_source     |  {{DLV - lead_source}}
```

### 7.4 Nazwa:
```
GA4 - Lead Conversion
```

### 7.5 Triggering:
```
CE - Generate Lead
```

### 7.6 Save

---

## KROK 8: Publikuj! 🚀

### 8.1 Kliknij: **Submit** (górny prawy róg)

### 8.2 Wersja:
```
Version Name: Initial Analytics Setup
Version Description: Konfiguracja GA4, eventy, konwersje
```

### 8.3 Kliknij: **Publish**

### ✅ GOTOWE!

---

## KROK 9: Testowanie (WAŻNE!)

### 9.1 GTM Preview Mode

```
1. GTM → Kliknij "Preview" (górny prawy róg)
2. Wklej URL: http://localhost:3000 (lub Twoja domena)
3. Kliknij "Connect"
```

### 9.2 Otwarta zostanie Twoja strona + GTM Debug Panel

### 9.3 Testuj:
```
✅ Kliknij przycisk → Zobacz event "cta_click" w GTM
✅ Kliknij telefon → Zobacz "phone_click"
✅ Otwórz kalkulator → Zobacz "calculator_complete"
✅ Wyślij formularz → Zobacz "form_submission" i "generate_lead"
```

### 9.4 GA4 Real-time Check

```
1. Otwórz: https://analytics.google.com/
2. Reports → Realtime
3. Zobacz eventy w czasie rzeczywistym!
```

### 9.5 Console Check
```javascript
// Otwórz Console (F12)
window.dataLayer

// Zobacz ostatni event
window.dataLayer[window.dataLayer.length - 1]
```

---

## ✅ Checklist - Czy wszystko działa?

### W GTM Preview widzisz:
- [ ] Tag "GA4 - Configuration" fires on All Pages
- [ ] Tag "GA4 - All Custom Events" fires on clicks
- [ ] Variables mają wartości (nie są undefined)
- [ ] Event "generate_lead" fires po konwersji

### W GA4 Realtime widzisz:
- [ ] Active users (Ty!)
- [ ] Events: cta_click, phone_click, etc.
- [ ] Event parameters (cta_text, phone_location)
- [ ] Conversion: generate_lead

### W Console widzisz:
- [ ] `window.dataLayer` ma eventy
- [ ] Eventy mają wszystkie dane
- [ ] Brak błędów w console

---

## 🐛 Troubleshooting

### Problem: Tag się nie uruchamia
```
✅ Sprawdź czy zaakceptowałeś cookies (banner na stronie)
✅ Sprawdź czy trigger ma dobry event name
✅ Zobacz GTM Preview - czy event się pojawia?
```

### Problem: Variables są undefined
```
✅ Sprawdź czy nazwa zmiennej = nazwa w dataLayer
✅ W console sprawdź: window.dataLayer[window.dataLayer.length - 1]
✅ Czy event ma te parametry?
```

### Problem: GA4 nie pokazuje eventów
```
✅ Sprawdź Measurement ID (czy dobrze wkleiłeś)
✅ Poczekaj 5-10 minut (GA4 może mieć delay)
✅ Sprawdź Network → gtm.js (czy się ładuje)
```

### Problem: GTM Preview się nie łączy
```
✅ Wyczyść cache (Ctrl+Shift+Del)
✅ Użyj trybu Incognito
✅ Sprawdź czy domena się zgadza
✅ Wyłącz AdBlocka
```

---

## 📊 Co dalej?

### W Google Analytics 4:
1. **Configure → Events** - Oznacz "generate_lead" jako konwersję
2. **Reports → Engagement → Events** - Zobacz wszystkie eventy
3. **Explore → Free form** - Stwórz custom raporty
4. **Admin → Data display → Reporting identity** - Ustaw "Blended"

### Dodatkowe tagi (opcjonalnie):
- Facebook Pixel (jeśli używasz Facebook Ads)
- Google Ads Conversion Tracking
- LinkedIn Insight Tag
- Hotjar / Microsoft Clarity

---

## 📚 Dokumentacja projektu

- `ANALYTICS-TRACKING.md` - Wszystkie eventy (pełna lista)
- `ANALYTICS-QUICK-START.md` - Przykłady kodu
- `GTM-INTEGRATION.md` - Techniczne info
- `src/lib/analytics.ts` - Kod trackingu

---

## 🎉 Gratulacje!

Masz w pełni działające śledzenie analytics! 🚀

**Pytania?** Sprawdź dokumentację lub zobacz console: `window.dataLayer`

---

**Utworzone:** 2025-11-20  
**Wersja GTM:** GTM-554CLKKV  
**Status:** ✅ Production Ready
