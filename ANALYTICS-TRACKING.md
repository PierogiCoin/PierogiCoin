# 📊 Complete Analytics Tracking Guide

## 🎯 Overview

Kompletny system śledzenia eventów dla Google Analytics 4 przez Google Tag Manager.

## 📦 Co jest trackowane automatycznie?

### ✅ Zachowanie użytkownika
- ✨ **Page Views** - Każde wyświetlenie strony
- 📜 **Scroll Depth** - 25%, 50%, 75%, 90%, 100%
- ⏱️ **Time on Page** - Co 30 sekund + przy opuszczeniu
- 👁️ **Section Views** - Wejście w sekcje (50% widoczności)
- 🔗 **Outbound Links** - Kliknięcia w linki zewnętrzne
- ❌ **JavaScript Errors** - Automatyczne raportowanie błędów

### ✅ Interakcje
- 📞 **Phone Clicks** - Kliknięcia w numery telefonu
- ✉️ **Email Clicks** - Kliknięcia w adresy email
- 🎯 **CTA Clicks** - Call-to-action buttons
- 🧭 **Navigation** - Menu i linki nawigacyjne
- 📱 **Social Media** - Kliknięcia w social links
- 🔙 **Back to Top** - Powrót na górę strony
- 🌓 **Theme Changes** - Zmiana motywu (light/dark)

### ✅ Formularze
- ▶️ **Form Start** - Rozpoczęcie wypełniania
- ✅ **Form Submit** - Wysłanie formularza
- ❌ **Form Errors** - Błędy walidacji

### ✅ Kalkulator wyceny
- 🚀 **Calculator Start** - Otwarcie kalkulatora
- 👣 **Calculator Steps** - Każdy krok wyboru opcji
- 🎉 **Calculator Complete** - Ukończenie + wygenerowana cena

### ✅ Portfolio
- 🖼️ **Portfolio Click** - Kliknięcie w projekt
- 👀 **Portfolio View** - Wyświetlenie szczegółów
- 🔗 **Portfolio Action** - "Zobacz na żywo" / "Zobacz kod"

### ✅ Konwersje
- 🎯 **Lead Generation** - Wygenerowana wycena
- 📝 **Quote Request** - Zapytanie ofertowe
- 💰 **Conversion** - Główne konwersje

### ✅ Media
- ▶️ **Video Play** - Odtworzenie video
- ⏸️ **Video Pause** - Pauza
- ✅ **Video Complete** - Obejrzane do końca

### ✅ Cookies
- 🍪 **Cookie Consent** - Wybór zgody (accept/reject/custom)

## 🔧 Jak używać w kodzie

### Import
```typescript
import {
  trackCTAClick,
  trackFormSubmit,
  trackPhoneClick,
  trackConversion,
  // ... etc
} from '@/lib/analytics';
```

### Przykłady użycia

#### 1. Śledzenie kliknięcia CTA
```typescript
<button onClick={() => {
  trackCTAClick(
    'Bezpłatna Wycena',    // Tekst przycisku
    'hero_section',         // Lokalizacja
    '#kalkulator'           // Cel (opcjonalnie)
  );
}}>
  Bezpłatna Wycena
</button>
```

#### 2. Śledzenie telefonu
```typescript
<a 
  href="tel:+48790629497"
  onClick={() => trackPhoneClick('+48790629497', 'header')}
>
  Zadzwoń
</a>
```

#### 3. Śledzenie formularza
```typescript
// Rozpoczęcie
<input onFocus={() => trackFormStart('contact_form', 'footer')} />

// Wysłanie
const handleSubmit = async (data) => {
  await sendForm(data);
  trackFormSubmit('contact_form', 'footer', {
    project_type: data.projectType,
    budget: data.budget
  });
};

// Błąd
catch (error) {
  trackFormError('contact_form', 'email', 'Invalid email format');
}
```

#### 4. Śledzenie kalkulatora
```typescript
// Start
trackCalculatorStart();

// Każdy krok
trackCalculatorStep(2, {
  website_type: 'e-commerce',
  pages: 10,
  features: ['payments', 'newsletter']
});

// Ukończenie
trackCalculatorComplete(15000, {
  website_type: 'e-commerce',
  pages: 10,
  total_features: 5
});
```

#### 5. Śledzenie portfolio
```typescript
<div onClick={() => {
  trackPortfolioClick(
    'Sklep e-commerce XYZ',  // Nazwa projektu
    'project-123',            // ID projektu
    'e-commerce'              // Kategoria
  );
}}>
```

#### 6. Konwersja - Lead
```typescript
trackLead(
  12000,              // Wartość leadu w PLN
  'calculator',       // Źródło
  {
    project_type: 'e-commerce',
    contact_method: 'email'
  }
);
```

#### 7. Śledzenie social media
```typescript
<a 
  href="https://facebook.com/..."
  onClick={() => trackSocialClick('facebook', 'click', 'footer')}
>
  Facebook
</a>
```

## 🎣 Custom Hooks

### Automatyczne śledzenie

```typescript
import { 
  useScrollDepthTracking,
  useTimeOnPageTracking,
  useErrorTracking,
  useOutboundLinkTracking,
  useSectionTracking 
} from '@/hooks/useAnalytics';

function MyComponent() {
  // Automatycznie trackuje scroll depth
  useScrollDepthTracking();
  
  // Automatycznie trackuje czas na stronie
  useTimeOnPageTracking();
  
  // Automatycznie łapie błędy JS
  useErrorTracking();
  
  // Automatycznie trackuje linki zewnętrzne
  useOutboundLinkTracking();
  
  // Trackuje wejście w sekcję
  useSectionTracking('portfolio', 'Portfolio Section');
  
  return <div>...</div>;
}
```

### Custom tracking dla sekcji
```typescript
import { useSectionTracking } from '@/hooks/useAnalytics';

function HeroSection() {
  useSectionTracking('hero', 'Hero Section');
  return <section id="hero">...</section>;
}
```

## 📊 Konfiguracja w Google Tag Manager

### 1. Podstawowy setup

#### Variables (zmienne):
```
Event: {{Event}}
phone_number: {{DLV - phone_number}}
cta_text: {{DLV - cta_text}}
form_name: {{DLV - form_name}}
scroll_percentage: {{DLV - scroll_percentage}}
project_name: {{DLV - project_name}}
calculator_value: {{DLV - calculator_value}}
```

### 2. Triggers (wyzwalacze):

#### CTA Clicks
```
Trigger Type: Custom Event
Event name: cta_click
```

#### Phone Clicks
```
Trigger Type: Custom Event
Event name: phone_click
```

#### Form Submission
```
Trigger Type: Custom Event
Event name: form_submission
```

#### Scroll Depth
```
Trigger Type: Custom Event
Event name: scroll_depth
```

#### Calculator Complete
```
Trigger Type: Custom Event
Event name: calculator_complete
```

#### Lead Generation
```
Trigger Type: Custom Event
Event name: generate_lead
```

### 3. Tags (tagi):

#### Google Analytics 4 - Event
```
Tag Type: Google Analytics: GA4 Event
Configuration Tag: {{GA4 Config}}
Event Name: {{Event}}
Event Parameters:
  - cta_text: {{DLV - cta_text}}
  - phone_location: {{DLV - phone_location}}
  - form_name: {{DLV - form_name}}
  ...etc
```

#### Conversion - Lead
```
Tag Type: Google Analytics: GA4 Event
Event Name: generate_lead
Event Parameters:
  - value: {{DLV - calculator_value}}
  - currency: PLN
  - lead_source: {{DLV - lead_source}}
Trigger: generate_lead
```

## 📈 Przykładowe raporty GA4

### 1. Funnel Konwersji
```
Krok 1: Page View (strona główna)
Krok 2: Calculator Start
Krok 3: Calculator Step 1
Krok 4: Calculator Step 2
Krok 5: Calculator Complete
Krok 6: Form Submission
Krok 7: Generate Lead
```

### 2. Zaangażowanie użytkownika
```
- Scroll Depth (średni %)
- Time on Page (średni czas)
- Section Views (najpopularniejsze)
- CTA Click Rate
- Phone Click Rate
```

### 3. Portfolio Performance
```
- Portfolio Click Rate
- Most Viewed Projects
- Portfolio Action Rate (live/code)
```

### 4. Błędy
```
- JavaScript Errors (count)
- Form Errors (by field)
- 404 Errors
```

## 🧪 Testowanie

### Console Debug
```javascript
// Zobacz wszystkie eventy
window.dataLayer.forEach((item, index) => {
  console.log(`${index}:`, item);
});

// Ostatni event
console.log(window.dataLayer[window.dataLayer.length - 1]);
```

### GTM Preview Mode
1. Otwórz GTM → Preview
2. Wklej URL swojej strony
3. Wykonaj akcje na stronie
4. Zobacz które eventy się uruchomiły

### Real-time w GA4
1. Google Analytics → Reports → Realtime
2. Zobacz eventy w czasie rzeczywistym
3. Sprawdź parametry eventów

## 🎯 Najważniejsze metryki do monitorowania

### Konwersje:
- ✅ Lead Generation Rate
- ✅ Quote Request Rate
- ✅ Phone Click Rate
- ✅ Form Submission Rate
- ✅ Calculator Completion Rate

### Engagement:
- ✅ Average Time on Page
- ✅ Scroll Depth (średni %)
- ✅ Section View Rate
- ✅ Bounce Rate

### Portfolio:
- ✅ Portfolio Click Rate
- ✅ Most Popular Projects
- ✅ Project View Duration

### UX:
- ✅ JavaScript Error Rate
- ✅ Form Error Rate
- ✅ 404 Rate

## 🚀 Advanced: Custom Events

### Dodaj własny event:

```typescript
// 1. Dodaj do lib/analytics.ts
export const trackCustomEvent = (
  eventName: string,
  eventData: Record<string, any>
) => {
  pushToDataLayer({
    event: eventName,
    ...eventData
  });
};

// 2. Użyj w komponencie
import { trackCustomEvent } from '@/lib/analytics';

trackCustomEvent('special_action', {
  action_type: 'demo_request',
  value: 1000
});

// 3. Skonfiguruj w GTM
// Trigger: Custom Event = special_action
// Tag: GA4 Event
```

## 📊 Dashboard Recommendations

### Google Data Studio / Looker Studio:
1. **Overview Dashboard:**
   - Total Page Views
   - Total Conversions
   - Conversion Rate
   - Top Pages

2. **Conversion Funnel:**
   - Calculator Start → Complete → Lead
   - Visualize drop-off rates

3. **User Behavior:**
   - Average Scroll Depth
   - Time on Page by Section
   - Most Clicked CTAs

4. **Portfolio Performance:**
   - Most Viewed Projects
   - Click-through Rate
   - Time on Portfolio Section

## 🎓 Best Practices

1. ✅ **Consistent Naming:** Używaj snake_case dla eventów
2. ✅ **Add Context:** Zawsze dodawaj lokalizację (header, footer, etc.)
3. ✅ **Value Tracking:** Przypisuj wartość do konwersji
4. ✅ **Test Before Deploy:** Użyj GTM Preview Mode
5. ✅ **Monitor Regularly:** Sprawdzaj Real-time w GA4
6. ✅ **Privacy First:** Nie trackuj danych osobowych (email, telefon jako wartość)

## 🔒 Privacy & GDPR

- ✅ Wszystkie eventy trackują się **tylko po zgodzie** na cookies analityczne
- ✅ Nie wysyłamy danych osobowych (PII)
- ✅ Numery telefonów i emaile jako kategorie, nie wartości
- ✅ IP anonimizowane w GA4

---

**Pliki:**
- `src/lib/analytics.ts` - Wszystkie funkcje trackingowe
- `src/hooks/useAnalytics.ts` - Custom hooks
- `src/lib/cookies.ts` - Zarządzanie zgodą

**Build size:** ~12KB  
**Performance:** Lazy loaded, minimal impact  
**Dependencies:** Brak (używa natywnego dataLayer)
