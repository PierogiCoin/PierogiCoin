# 💾 Calculator Memory Feature

Automatyczne zapamiętywanie konfiguracji kalkulatora i przypominanie o niewysłanych ofertach.

---

## 🎯 **Co robi?**

Gdy użytkownik:
1. **Wybierze konfigurację** w kalkulatorze (typ, design, funkcje)
2. **Otrzyma wycenę** (np. 2000 zł)
3. **Nie wyśle PDF** z ofertą
4. **Opuści stronę**

**Następnym razem gdy wróci:**
- ✅ Zobaczy **banner przypominający** o niewysłanej ofercie
- ✅ Może **wyślać PDF** jednym kliknięciem
- ✅ Lub **rozpocząć od nowa**

---

## 📊 **Techniczne szczegóły:**

### **localStorage Structure:**

```typescript
{
  selections: {
    type: 'website',
    design: 'custom',
    features: ['cms', 'seo'],
    deadline: 'standard'
  },
  price: 3500,
  timestamp: 1732468352720,
  emailSent: false
}
```

### **Expiry:** 7 dni

Po 7 dniach dane są automatycznie usuwane.

---

## 🔧 **API:**

### **Save Calculation:**

```typescript
import { saveCalculatorData } from '@/lib/calculatorStorage';

saveCalculatorData(
  {
    type: 'website',
    design: 'custom',
    features: ['cms', 'seo'],
    deadline: 'standard'
  },
  3500,
  false // email not sent yet
);
```

### **Get Saved Data:**

```typescript
import { getSavedCalculatorData } from '@/lib/calculatorStorage';

const saved = getSavedCalculatorData();
if (saved) {
  console.log('Price:', saved.price);
  console.log('Selections:', saved.selections);
  console.log('Email sent:', saved.emailSent);
}
```

### **Mark Email as Sent:**

```typescript
import { markEmailAsSent } from '@/lib/calculatorStorage';

// After successful email send
markEmailAsSent();
```

### **Clear Data:**

```typescript
import { clearCalculatorData } from '@/lib/calculatorStorage';

clearCalculatorData();
```

---

## 🎨 **UI Components:**

### **1. SavedCalculationBanner**

Pokazuje się automatycznie gdy użytkownik ma zapisaną konfigurację:

```tsx
import SavedCalculationBanner from '@/components/SavedCalculationBanner';

<SavedCalculationBanner 
  onRestoreCalculation={(selections) => {
    // Restore user's selections
    loadSelections(selections);
  }}
/>
```

**Banner pokazuje:**
- 👋 Przywitanie "Witaj ponownie!"
- 💰 Zapisaną cenę (np. "2 000 zł")
- ⏰ Czas od ostatniego obliczenia ("2 godz. temu")
- ✉️ Status wysyłki (PDF wysłany / nie wysłany)

**Akcje:**
- 📄 **"Wyślij PDF z ofertą"** - przywraca konfigurację i przechodzi do wysyłki
- 🔄 **"Rozpocznij od nowa"** - czyści pamięć i zaczyna od początku
- ❌ **[X]** - zamyka banner (nie czyści pamięci)

---

## 📱 **User Flow:**

### **Scenariusz 1: Użytkownik nie wysłał PDF**

```
1. Użytkownik oblicza wycenę → 2000 zł
2. Zapisuje się automatycznie do localStorage
3. Użytkownik opuszcza stronę (nie wysyła PDF)

--- NASTĘPNA WIZYTA ---

4. Użytkownik wraca na stronę
5. Widzi banner: "Masz niezakończoną wycenę projektu"
6. Pokazuje cenę: 2 000 zł
7. Przycisk: "Wyślij PDF z ofertą"

--- PO KLIKNIĘCIU ---

8. Przywraca konfigurację
9. Pokazuje formularz email
10. Użytkownik wysyła PDF
11. Status zmienia się na: "PDF wysłany ✅"
```

### **Scenariusz 2: Użytkownik wysłał PDF**

```
1. Użytkownik oblicza wycenę → 3500 zł
2. Wysyła PDF na email
3. Zapisuje się z flagą: emailSent = true
4. Użytkownik opuszcza stronę

--- NASTĘPNA WIZYTA ---

5. Użytkownik wraca na stronę
6. Widzi banner: "Masz zapisaną wycenę z wysłaną ofertą"
7. Status: "✅ Oferta została wysłana"
8. Info: "Sprawdź swoją skrzynkę!"
9. Przycisk: "OK, rozumiem" (zamyka banner)
```

### **Scenariusz 3: Wygaśnięcie**

```
1. Użytkownik oblicza wycenę
2. Nie wysyła PDF
3. Nie wraca przez 7 dni

--- PO 7 DNIACH ---

4. Dane automatycznie usuwane
5. Przy następnej wizycie: brak bannera
6. Rozpoczyna od czystej tablicy
```

---

## 🛠️ **Implementation:**

### **Calculator.tsx** (Prosty kalkulator):

```typescript
import { saveCalculatorData, markEmailAsSent } from '@/lib/calculatorStorage';

// Save on every selection change
useEffect(() => {
  if (selections.type && selections.design) {
    saveCalculatorData(selections, calculatedPrice, false);
  }
}, [selections]);

// Mark as sent after email
const handleSendEmail = async () => {
  await sendEmail();
  markEmailAsSent();
};
```

### **AiCalculator.tsx** (AI kalkulator):

```typescript
import { saveCalculatorData, markEmailAsSent } from '@/lib/calculatorStorage';

// Save after analysis
useEffect(() => {
  if (result && result.estimate) {
    const avgPrice = (result.estimate.min + result.estimate.max) / 2;
    saveCalculatorData(
      {
        type: result.extracted.type,
        design: result.extracted.design,
        features: [result.extracted.features],
        deadline: 'standard',
      },
      avgPrice,
      false
    );
  }
}, [result]);

// Mark as sent after email
const handleGenerateOffer = async () => {
  await generateOffer();
  markEmailAsSent();
};
```

---

## 📊 **Analytics:**

### **Events tracked:**

```typescript
// When user restores calculation
gtag('event', 'calculator_restored', {
  price: saved.price,
  time_since: getTimeSinceCalculation(),
});

// When user dismisses without sending
gtag('event', 'calculator_dismissed', {
  price: saved.price,
  email_sent: saved.emailSent,
});

// When user completes after reminder
gtag('event', 'calculator_completed_from_memory', {
  price: saved.price,
});
```

---

## 🎯 **Benefits:**

### **For Users:**
- ✅ Don't lose their configuration
- ✅ Quick reminder to complete action
- ✅ One-click to resume
- ✅ No need to reconfigure

### **For Business:**
- 📈 **Higher conversion rate** - remind users to complete
- 💰 **Recover abandoned calculations** - bring users back
- 📊 **Track completion rate** - measure effectiveness
- 🎯 **Re-engagement** - second chance to convert

---

## 🔒 **Privacy:**

### **Data stored locally:**
- ✅ Stored in **user's browser** (localStorage)
- ✅ **Not sent to server** (privacy first)
- ✅ **Automatically expires** after 7 days
- ✅ User can **clear anytime** ("Rozpocznij od nowa")

### **What we DON'T store:**
- ❌ Email addresses (only after user sends)
- ❌ Personal information
- ❌ Payment details
- ❌ Sensitive data

---

## 🧪 **Testing:**

### **Test Scenario 1: Save & Restore**

```bash
1. Go to calculator
2. Select configuration
3. See price (e.g., 2000 zł)
4. Close tab
5. Open new tab → go to calculator
6. Should see banner with saved price
```

### **Test Scenario 2: Send Email**

```bash
1. Restore saved calculation
2. Enter email
3. Send PDF
4. Close tab
5. Open new tab → go to calculator
6. Should see "PDF wysłany ✅"
```

### **Test Scenario 3: Clear**

```bash
1. See saved calculation banner
2. Click "Rozpocznij od nowa"
3. Close tab
4. Open new tab → go to calculator
5. Should NOT see banner (cleared)
```

### **Test Scenario 4: Expiry**

```bash
1. Save calculation
2. Change system date +8 days
3. Reload page
4. Should NOT see banner (expired)
```

---

## 🐛 **Troubleshooting:**

### **Banner not showing?**

Check:
1. localStorage enabled? (check browser settings)
2. Incognito mode? (localStorage disabled)
3. Data expired? (check timestamp)
4. Browser compatibility? (use modern browser)

### **Data not saving?**

```typescript
// Debug in console:
import { getSavedCalculatorData } from '@/lib/calculatorStorage';

console.log('Saved data:', getSavedCalculatorData());
```

### **Clear localStorage manually:**

```typescript
// In browser console:
localStorage.removeItem('lykkreacji_calculator_data');
```

---

## 📈 **Success Metrics:**

Track these KPIs:
- **Recovery rate:** % of users who return and complete
- **Time to return:** Average time between sessions
- **Completion rate:** % who send PDF after reminder
- **Dismissal rate:** % who ignore and start new

**Target metrics:**
- Recovery rate: > 30%
- Completion rate: > 50%
- Dismissal rate: < 20%

---

## 🚀 **Future Enhancements:**

### **Możliwe ulepszenia:**

1. **Email reminder:**
   - Send email after 24h if not completed
   - "Dokończ swoją wycenę!"

2. **Multiple calculations:**
   - Save up to 3 calculations
   - Compare different options

3. **Share link:**
   - Generate shareable link
   - Send to colleague/client

4. **Calendar integration:**
   - "Zapisz termin konsultacji"
   - Add to Google Calendar

5. **Price alerts:**
   - Notify if price changes
   - Special offers for saved configs

---

## 📚 **Related Files:**

```
src/
├── lib/
│   └── calculatorStorage.ts      # Storage API
├── components/
│   ├── SavedCalculationBanner.tsx # Banner UI
│   ├── Calculator.tsx             # Integration
│   └── AiCalculator.tsx          # Integration
└── docs/
    └── CALCULATOR-MEMORY.md      # This file
```

---

**Built with ❤️ by LykKreacji** 💾
