# 🔗 Shareable Calculator Links - Guide

## 🎯 Czym są Shareable Links?

**System linków udostępniających** do kalkulatora wyceny projektów.

Możesz teraz:
- ✅ **Udostępnić link** bezpośrednio do AI kalkulatora
- ✅ **Udostępnić link** bezpośrednio do prostego kalkulatora
- ✅ **Preselekcjonować opcje** (np. Landing Page + Custom Design)
- ✅ **Śledzić źródła** z UTM parameters
- ✅ **Dzielić się** na social media (FB, Twitter, LinkedIn, WhatsApp)

---

## 🚀 Jak używać?

### **1. Bezpośrednie linki:**

#### **Link do sekcji wyboru (AI vs Prosty):**
```
https://twojastrona.pl/#kalkulator
```

#### **Link bezpośrednio do prostego kalkulatora:**
```
https://twojastrona.pl/?calc=simple#kalkulator
```

#### **Link bezpośrednio do AI kalkulatora:**
```
https://twojastrona.pl/?calc=ai#kalkulator
```

---

### **2. Preselekcja opcji:**

#### **Landing Page (preselected):**
```
https://twojastrona.pl/?calc=simple&type=landing&design=custom&features=seo&deadline=standard#kalkulator
```

**Co się stanie:**
- ✅ Otworzy prosty kalkulator
- ✅ Wybierze typ: Landing Page
- ✅ Wybierze design: Custom
- ✅ Zaznaczy funkcję: SEO
- ✅ Wybierze termin: Standardowy
- ✅ Od razu obliczy cenę!

#### **Strona Firmowa (preselected):**
```
https://twojastrona.pl/?calc=simple&type=website&design=custom&features=cms,seo&deadline=standard#kalkulator
```

#### **E-commerce (preselected):**
```
https://twojastrona.pl/?calc=simple&type=ecommerce&design=premium&features=cms,seo,payments&deadline=standard#kalkulator
```

---

### **3. UTM Tracking:**

#### **Kampania email:**
```
https://twojastrona.pl/?calc=simple&utm_source=newsletter&utm_medium=email&utm_campaign=october_promo#kalkulator
```

#### **Kampania Facebook Ads:**
```
https://twojastrona.pl/?calc=ai&utm_source=facebook&utm_medium=paid&utm_campaign=lead_gen#kalkulator
```

#### **Post na LinkedIn:**
```
https://twojastrona.pl/?calc=simple&type=website&utm_source=linkedin&utm_medium=organic&utm_campaign=personal_post#kalkulator
```

---

## 💻 API - Programmatic Usage

### **Import:**
```typescript
import { 
  generateCalculatorLink, 
  calculatorQuickLinks,
  parseCalculatorParams,
  copyCalculatorLink,
  formatSocialLink 
} from '@/lib/calculatorLinks';
```

---

### **generateCalculatorLink()**

Generuje customowy link do kalkulatora.

```typescript
const link = generateCalculatorLink({
  type: 'simple', // 'simple' | 'ai' | 'choice'
  preselect: {
    projectType: 'landing',
    design: 'custom',
    features: ['seo'],
    deadline: 'standard'
  },
  utmSource: 'newsletter',
  utmMedium: 'email',
  utmCampaign: 'october_promo'
});

console.log(link);
// Output: "https://twojastrona.pl/?calc=simple&type=landing&design=custom&features=seo&deadline=standard&utm_source=newsletter&utm_medium=email&utm_campaign=october_promo#kalkulator"
```

---

### **calculatorQuickLinks**

Predefiniowane szybkie linki.

```typescript
// Link do wyboru kalkulatora
const choiceLink = calculatorQuickLinks.choice();
// Output: "https://twojastrona.pl/#kalkulator"

// Link do AI kalkulatora
const aiLink = calculatorQuickLinks.ai();
// Output: "https://twojastrona.pl/?calc=ai#kalkulator"

// Link do prostego kalkulatora
const simpleLink = calculatorQuickLinks.simple();
// Output: "https://twojastrona.pl/?calc=simple#kalkulator"

// Preselekcja: Landing Page
const landingLink = calculatorQuickLinks.landingPage();
// Output: "https://twojastrona.pl/?calc=simple&type=landing&design=custom&features=seo&deadline=standard#kalkulator"

// Preselekcja: Strona Firmowa
const businessLink = calculatorQuickLinks.businessWebsite();

// Preselekcja: E-commerce
const ecommerceLink = calculatorQuickLinks.ecommerce();

// Preselekcja: Aplikacja Webowa
const webAppLink = calculatorQuickLinks.webApp();
```

---

### **parseCalculatorParams()**

Parsuje parametry z URL.

```typescript
// URL: https://twojastrona.pl/?calc=simple&type=landing&design=custom&features=seo#kalkulator

const params = parseCalculatorParams();

console.log(params);
// Output:
// {
//   type: 'simple',
//   preselect: {
//     projectType: 'landing',
//     design: 'custom',
//     features: ['seo'],
//     deadline: undefined
//   }
// }
```

---

### **copyCalculatorLink()**

Kopiuje link do schowka.

```typescript
const link = calculatorQuickLinks.ai();
const success = await copyCalculatorLink(link);

if (success) {
  console.log('Link skopiowany! ✅');
} else {
  console.log('Błąd kopiowania ❌');
}
```

---

### **formatSocialLink()**

Formatuje link dla social media.

```typescript
const calculatorLink = calculatorQuickLinks.ai();
const message = 'Sprawdź AI Kalkulator wyceny! 🚀';

// Facebook
const fbLink = formatSocialLink('facebook', calculatorLink, message);
// Output: "https://www.facebook.com/sharer/sharer.php?u=..."

// Twitter
const twitterLink = formatSocialLink('twitter', calculatorLink, message);
// Output: "https://twitter.com/intent/tweet?url=...&text=..."

// LinkedIn
const linkedinLink = formatSocialLink('linkedin', calculatorLink);
// Output: "https://www.linkedin.com/sharing/share-offsite/?url=..."

// WhatsApp
const whatsappLink = formatSocialLink('whatsapp', calculatorLink, message);
// Output: "https://wa.me/?text=..."
```

---

## 🎨 UI Component - ShareCalculatorButton

Gotowy komponent z UI do udostępniania.

### **Import:**
```typescript
import { ShareCalculatorButton } from '@/components/ShareCalculatorButton';
```

---

### **Button Variant:**

```tsx
<ShareCalculatorButton
  options={{ type: 'simple' }}
  message="Oblicz wycenę projektu! 💰"
  variant="button"
  className="mt-4"
/>
```

**Wynik:**
- 🔵 Piękny gradient button (blue → purple)
- 🎯 Tekst: "Udostępnij"
- 📋 Menu z opcjami: Copy, Facebook, Twitter, LinkedIn, WhatsApp

---

### **Icon Variant:**

```tsx
<ShareCalculatorButton
  options={{ type: 'ai' }}
  message="AI Kalkulator wyceny! 🤖"
  variant="icon"
/>
```

**Wynik:**
- 🔘 Mała ikona Share (bez tekstu)
- 🎯 Idealny do toolbarów
- 📋 Ten sam menu dropdown

---

### **Custom Options:**

```tsx
<ShareCalculatorButton
  options={{
    type: 'simple',
    preselect: {
      projectType: 'landing',
      design: 'custom',
      features: ['seo', 'cms']
    },
    utmSource: 'blog',
    utmMedium: 'article',
    utmCampaign: 'landing_page_guide'
  }}
  message="Sprawdź wycenę Landing Page! 🚀"
  variant="button"
/>
```

---

## 📊 URL Parameters - Complete Reference

### **Dostępne parametry:**

| Parametr | Typ | Wartości | Przykład |
|----------|-----|----------|----------|
| `calc` | string | `simple`, `ai`, `choice` | `?calc=simple` |
| `type` | string | `landing`, `website`, `ecommerce`, `app` | `?type=landing` |
| `design` | string | `template`, `custom`, `premium` | `?design=custom` |
| `features` | string | `cms`, `seo`, `multilang`, `payments`, `animations` (comma-separated) | `?features=cms,seo` |
| `deadline` | string | `standard`, `fast`, `express` | `?deadline=standard` |
| `utm_source` | string | dowolny | `?utm_source=facebook` |
| `utm_medium` | string | dowolny | `?utm_medium=paid` |
| `utm_campaign` | string | dowolny | `?utm_campaign=october` |

---

### **Przykłady kombinacji:**

#### **1. Prosty kalkulator z preselekcją:**
```
?calc=simple&type=website&design=custom&features=cms,seo&deadline=standard#kalkulator
```

#### **2. AI kalkulator z tracking:**
```
?calc=ai&utm_source=newsletter&utm_medium=email&utm_campaign=ai_launch#kalkulator
```

#### **3. Pełna preselekcja + tracking:**
```
?calc=simple&type=ecommerce&design=premium&features=cms,seo,payments&deadline=fast&utm_source=facebook&utm_medium=paid&utm_campaign=ecommerce_promo#kalkulator
```

---

## 🎯 Use Cases

### **1. Email Marketing:**

**Newsletter:**
```
Oblicz wycenę swojego projektu!
[Przycisk: Kalkulator Wyceny]
→ Link: ?calc=simple&utm_source=newsletter&utm_medium=email&utm_campaign=monthly_october
```

---

### **2. Social Media Posts:**

**Facebook:**
```
🚀 Sprawdź nowy AI Kalkulator!
Wycena projektu w 3 minuty!
[Link: calculatorQuickLinks.ai()]
```

**LinkedIn:**
```
💡 Transparentna wycena projektów web
Kalkulator z preselekcją dla różnych typów:
- Landing Page: [Link]
- Strona Firmowa: [Link]
- E-commerce: [Link]
```

---

### **3. Blog Articles:**

**Artykuł: "Ile kosztuje Landing Page?"**
```tsx
<ShareCalculatorButton
  options={{
    type: 'simple',
    preselect: {
      projectType: 'landing',
      design: 'custom',
      features: ['seo']
    },
    utmSource: 'blog',
    utmMedium: 'article',
    utmCampaign: 'landing_page_cost'
  }}
  message="Oblicz wycenę swojego Landing Page! 🚀"
/>
```

---

### **4. Paid Ads:**

**Google Ads:**
```
Ad Copy: "Wycena Strony Internetowej | Kalkulator Online"
Landing URL: ?calc=simple&type=website&utm_source=google&utm_medium=cpc&utm_campaign=website_calculator
```

**Facebook Ads:**
```
Ad Copy: "AI Kalkulator Wyceny Projektu"
Landing URL: ?calc=ai&utm_source=facebook&utm_medium=paid&utm_campaign=ai_calc_oct
```

---

### **5. WhatsApp / Messenger:**

**Auto-reply:**
```
Cześć! 👋
Sprawdź nasz kalkulator wyceny:
[Link: calculatorQuickLinks.choice()]
```

**Direct message:**
```
Hej! Widzę że interesujesz się stroną firmową.
Sprawdź szybką wycenę:
[Link: calculatorQuickLinks.businessWebsite()]
```

---

## 📈 Analytics & Tracking

### **Google Analytics Events:**

**Automatyczne eventy:**

1. **calculator_preselected:**
```javascript
gtag('event', 'calculator_preselected', {
  project_type: 'landing',
  design: 'custom',
  features: 'seo',
  deadline: 'standard'
});
```

2. **share (copy link):**
```javascript
gtag('event', 'share', {
  method: 'copy_link',
  content_type: 'calculator_link',
  item_id: 'simple'
});
```

3. **share (social):**
```javascript
gtag('event', 'share', {
  method: 'facebook',
  content_type: 'calculator_link',
  item_id: 'ai'
});
```

---

### **Custom Tracking:**

```typescript
// Track link generation
const link = generateCalculatorLink({ type: 'simple' });
gtag('event', 'link_generated', {
  calculator_type: 'simple',
  url: link
});

// Track clicks
document.querySelector('.share-button').addEventListener('click', () => {
  gtag('event', 'share_button_click', {
    button_type: 'calculator_share'
  });
});
```

---

## 🧪 Testing

### **Test 1: Prosty kalkulator**
```bash
1. Otwórz: http://localhost:3001/?calc=simple#kalkulator
2. Powinien otworzyć się prosty kalkulator ✅
```

### **Test 2: AI kalkulator**
```bash
1. Otwórz: http://localhost:3001/?calc=ai#kalkulator
2. Powinien otworzyć się AI kalkulator ✅
```

### **Test 3: Preselekcja**
```bash
1. Otwórz: http://localhost:3001/?calc=simple&type=landing&design=custom&features=seo#kalkulator
2. Kalkulator powinien mieć:
   - Typ: Landing Page ✅
   - Design: Custom ✅
   - Funkcje: SEO zaznaczone ✅
   - Termin: Standard ✅
   - Cena obliczona automatycznie ✅
```

### **Test 4: Copy to clipboard**
```bash
1. Kliknij ShareCalculatorButton
2. Wybierz "Kopiuj link"
3. Ctrl+V w notepad
4. Link powinien być skopiowany ✅
```

### **Test 5: Social share**
```bash
1. Kliknij ShareCalculatorButton
2. Wybierz "Facebook"
3. Nowe okno Facebook share ✅
4. Link w polu "Share" ✅
```

---

## 🎊 Quick Start Examples

### **Example 1: Simple Share Button**

```tsx
import { ShareCalculatorButton } from '@/components/ShareCalculatorButton';

export default function MyComponent() {
  return (
    <div>
      <h2>Udostępnij kalkulator</h2>
      <ShareCalculatorButton
        options={{ type: 'simple' }}
        message="Oblicz wycenę projektu! 💰"
      />
    </div>
  );
}
```

---

### **Example 2: Multiple Quick Links**

```tsx
import { calculatorQuickLinks } from '@/lib/calculatorLinks';

export default function QuickLinks() {
  return (
    <div className="flex gap-4">
      <a href={calculatorQuickLinks.ai()}>AI Kalkulator</a>
      <a href={calculatorQuickLinks.simple()}>Prosty Kalkulator</a>
      <a href={calculatorQuickLinks.landingPage()}>Landing Page</a>
      <a href={calculatorQuickLinks.ecommerce()}>E-commerce</a>
    </div>
  );
}
```

---

### **Example 3: Custom Link Generator**

```tsx
import { generateCalculatorLink, copyCalculatorLink } from '@/lib/calculatorLinks';

export default function CustomLinkGenerator() {
  const handleGenerateAndCopy = async () => {
    const link = generateCalculatorLink({
      type: 'simple',
      preselect: {
        projectType: 'website',
        design: 'premium',
        features: ['cms', 'seo', 'multilang']
      },
      utmSource: 'website',
      utmMedium: 'button',
      utmCampaign: 'premium_offer'
    });

    const copied = await copyCalculatorLink(link);
    if (copied) {
      alert('Link skopiowany! ✅');
    }
  };

  return (
    <button onClick={handleGenerateAndCopy}>
      Generuj i kopiuj link
    </button>
  );
}
```

---

## 🔒 Security & Privacy

### **Co jest bezpieczne:**
- ✅ Wszystkie parametry są walidowane
- ✅ Tylko dozwolone wartości są akceptowane
- ✅ Brak SQL injection / XSS risk
- ✅ Client-side tylko (brak danych na serwerze)

### **Co NIE jest wysyłane:**
- ❌ Email użytkownika
- ❌ Personal data
- ❌ Payment info
- ❌ IP addresses

### **Co JEST w URL:**
- ✅ Typ kalkulatora
- ✅ Preselekcja opcji
- ✅ UTM parameters (tracking)

---

## 📚 Files

```
Nowe pliki:
├── src/lib/calculatorLinks.ts              # API (209 lines)
├── src/components/ShareCalculatorButton.tsx  # UI Component (250 lines)
├── SHAREABLE-CALCULATOR-LINKS.md          # Guide (this file)

Zmodyfikowane:
├── src/components/Calculator.tsx           # URL params support
├── src/components/CalculatorChoice.tsx     # URL params support + share buttons
```

---

## 🎯 Benefits

### **Dla użytkowników:**
- ✅ Szybki dostęp do kalkulatora
- ✅ Preselekcjonowane opcje (oszczędność czasu)
- ✅ Łatwe udostępnianie (social, email, SMS)

### **Dla biznesu:**
- 📈 Wyższy CTR (Click-Through Rate)
- 🎯 Lepszy tracking (UTM parameters)
- 💰 Więcej konwersji (direct links)
- 📊 Analytics insights
- 🚀 Viral potential (social sharing)

---

## 🚀 Deployment

**Status:** ✅ **PRODUCTION READY**

**Gotowe do użycia:**
- ✅ Generowanie linków
- ✅ Parsowanie URL params
- ✅ Share button UI
- ✅ Social media integration
- ✅ Analytics tracking
- ✅ Mobile responsive

---

## 💡 Pro Tips

### **Tip 1: Email Campaigns**
Używaj preselekcji + UTM dla segmentacji:
```
Newsletter A (small business):
→ ?calc=simple&type=website&utm_source=newsletter&utm_campaign=small_business

Newsletter B (enterprise):
→ ?calc=ai&type=app&utm_source=newsletter&utm_campaign=enterprise
```

### **Tip 2: Social Media**
Różne linki dla różnych platform:
```
Facebook: ?calc=simple&utm_source=facebook&utm_medium=organic
Twitter: ?calc=ai&utm_source=twitter&utm_medium=organic
LinkedIn: ?calc=simple&type=website&utm_source=linkedin&utm_medium=organic
```

### **Tip 3: Paid Ads**
Track kampanie osobno:
```
Google Ads Campaign 1: ?utm_source=google&utm_medium=cpc&utm_campaign=search_calculator
Facebook Ads Campaign 1: ?utm_source=facebook&utm_medium=paid&utm_campaign=calculator_oct
```

---

## 🎊 Summary

**Masz teraz:**
- ✅ **System shareable links** dla kalkulatora
- ✅ **Preselekcja opcji** w URL
- ✅ **UTM tracking** dla analytics
- ✅ **Social sharing** (FB, Twitter, LinkedIn, WhatsApp)
- ✅ **Copy to clipboard** functionality
- ✅ **UI Component** gotowy do użycia
- ✅ **Full API** dla custom implementations

**Rezultat:**
```
📈 Wyższy traffic do kalkulatora
🎯 Lepszy tracking źródeł
💰 Więcej konwersji
🚀 Viral potential
📊 Actionable analytics
```

---

**Zbudowane z ❤️ przez LykKreacji** 🔗

**Status:** ✅ **PRODUCTION READY**
**Commit:** `TBD`
**Data:** 2024-11-24
