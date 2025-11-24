# ⚡ Analytics - Quick Start (5 minut)

## 🎯 Co masz GOTOWE

✅ **40+ eventów** do trackowania  
✅ **6 custom hooks** do automatycznego śledzenia  
✅ **Integracja z GTM** - działa od razu  
✅ **RODO compliant** - trackuje tylko po zgodzie  

## 🚀 Przykłady - Copy & Paste

### 1. Przycisk CTA
```tsx
import { trackCTAClick } from '@/lib/analytics';

<button onClick={() => {
  trackCTAClick('Bezpłatna Wycena', 'hero', '#kalkulator');
  // ... reszta logiki
}}>
  Bezpłatna Wycena
</button>
```

### 2. Link do telefonu
```tsx
import { trackPhoneClick } from '@/lib/analytics';

<a 
  href="tel:+48790629497"
  onClick={() => trackPhoneClick('+48790629497', 'footer')}
>
  +48 790 629 497
</a>
```

### 3. Formularz kontaktowy
```tsx
import { trackFormStart, trackFormSubmit, trackLead } from '@/lib/analytics';

<form onSubmit={handleSubmit}>
  <input 
    onFocus={() => trackFormStart('contact_form', 'footer')}
  />
  
  <button type="submit">
    Wyślij
  </button>
</form>

// W handleSubmit:
trackFormSubmit('contact_form', 'footer');
trackLead(10000, 'contact_form');
```

### 4. Kalkulator
```tsx
import { 
  trackCalculatorStart, 
  trackCalculatorStep, 
  trackCalculatorComplete 
} from '@/lib/analytics';

// Otwarcie
const openCalculator = () => {
  trackCalculatorStart();
  setIsOpen(true);
};

// Każdy krok
const handleStepChange = (step, selections) => {
  trackCalculatorStep(step, selections);
};

// Ukończenie
const handleComplete = (totalPrice, options) => {
  trackCalculatorComplete(totalPrice, options);
};
```

### 5. Portfolio
```tsx
import { trackPortfolioClick, trackPortfolioAction } from '@/lib/analytics';

<div onClick={() => {
  trackPortfolioClick('E-commerce XYZ', 'project-123', 'e-commerce');
}}>
  <img src="..." />
</div>

<a 
  href={project.liveUrl}
  onClick={() => trackPortfolioAction('view_live', project.name)}
>
  Zobacz na żywo
</a>
```

### 6. Social Media
```tsx
import { trackSocialClick } from '@/lib/analytics';

<a 
  href="https://facebook.com/..."
  onClick={() => trackSocialClick('facebook', 'click', 'footer')}
>
  <FacebookIcon />
</a>
```

### 7. Zmiana motywu
```tsx
import { trackThemeChange } from '@/lib/analytics';

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  trackThemeChange(newTheme);
};
```

## 🎣 Auto-tracking Hooks

Dodaj do głównego layoutu (już dodane!):

```tsx
import { 
  useScrollDepthTracking,
  useTimeOnPageTracking,
  useErrorTracking,
  useOutboundLinkTracking 
} from '@/hooks/useAnalytics';

function ClientLayout() {
  useScrollDepthTracking();      // 📜 Scroll: 25%, 50%, 75%, 90%, 100%
  useTimeOnPageTracking();       // ⏱️ Time: co 30s
  useErrorTracking();            // ❌ JS Errors
  useOutboundLinkTracking();     // 🔗 External links
  
  return <div>...</div>;
}
```

## 📊 GTM Setup (5 min)

### 1. Variables
```
Workspace → Variables → New

Built-in:
✅ Event
✅ Click URL
✅ Click Text

Custom (Data Layer):
cta_text: {{dlv - cta_text}}
phone_location: {{dlv - phone_location}}
form_name: {{dlv - form_name}}
calculator_value: {{dlv - calculator_value}}
project_name: {{dlv - project_name}}
```

### 2. Triggers
```
New Trigger → Custom Event

cta_click
phone_click
form_submission
calculator_complete
generate_lead
portfolio_click
```

### 3. Tags
```
New Tag → Google Analytics: GA4 Event

Configuration: {{GA4 Config}}
Event Name: {{Event}}

Event Parameters:
- cta_text: {{dlv - cta_text}}
- phone_location: {{dlv - phone_location}}
- form_name: {{dlv - form_name}}

Trigger: All Custom Events (lub wybierz specific)
```

### 4. GA4 Event - Lead
```
Event Name: generate_lead
Parameters:
  - value: {{dlv - calculator_value}}
  - currency: PLN
  - lead_source: {{dlv - lead_source}}
  
Trigger: generate_lead
```

## 🧪 Testowanie

### Console
```javascript
// Zobacz wszystkie eventy
window.dataLayer

// Ostatni event
window.dataLayer[window.dataLayer.length - 1]

// Wszystkie eventy z nazwą
window.dataLayer.filter(e => e.event === 'phone_click')
```

### GTM Preview
1. GTM → Preview
2. Wklej URL: `http://localhost:3000`
3. Klikaj po stronie
4. Zobacz eventy w czasie rzeczywistym

### GA4 Real-time
1. GA4 → Reports → Realtime
2. Zobacz eventy live
3. Sprawdź parametry

## 📈 Top 10 Najważniejszych Eventów

1. **phone_click** - Kliknięcie w telefon
2. **form_submission** - Wysłanie formularza
3. **generate_lead** - Lead (konwersja)
4. **calculator_complete** - Ukończenie kalkulatora
5. **cta_click** - Kliknięcie CTA
6. **portfolio_click** - Kliknięcie w projekt
7. **scroll_depth** - Głębokość scrollu
8. **time_on_page** - Czas na stronie
9. **section_view** - Wyświetlenie sekcji
10. **cookie_consent** - Zgoda na cookies

## 🎯 Najczęstsze Use Cases

### Track wszystkie telefony
```tsx
// Header
<a href="tel:+48790629497" onClick={() => trackPhoneClick('+48790629497', 'header')}>

// Footer
<a href="tel:+48790629497" onClick={() => trackPhoneClick('+48790629497', 'footer')}>

// Floating button (już dodane!)
```

### Track wszystkie CTA
```tsx
// Hero
<button onClick={() => trackCTAClick('Bezpłatna Wycena', 'hero')}>

// Services
<button onClick={() => trackCTAClick('Zobacz więcej', 'services')}>

// Pricing
<button onClick={() => trackCTAClick('Rozpocznij projekt', 'pricing')}>
```

### Track wszystkie formularze
```tsx
// Contact form
trackFormStart('contact_form', 'footer')
trackFormSubmit('contact_form', 'footer')

// Newsletter
trackFormStart('newsletter', 'sidebar')
trackFormSubmit('newsletter', 'sidebar')

// Calculator
trackFormStart('calculator', 'pricing')
trackFormSubmit('calculator', 'pricing')
```

## 💡 Pro Tips

1. **Naming convention:** Używaj snake_case
2. **Add location:** Zawsze dodawaj lokalizację
3. **Test first:** GTM Preview przed publish
4. **Monitor:** Sprawdzaj GA4 Real-time
5. **Privacy:** Nie trackuj PII (email, phone jako wartość)

## 📚 Więcej info

- `ANALYTICS-TRACKING.md` - Pełna dokumentacja (wszystkie eventy)
- `src/lib/analytics.ts` - Kod wszystkich funkcji
- `src/hooks/useAnalytics.ts` - Custom hooks
- `GTM-INTEGRATION.md` - GTM setup guide

---

**Ready!** 🚀 Zacznij trackować już teraz!
