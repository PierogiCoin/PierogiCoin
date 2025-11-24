# 🎁 Kompletny System Promocyjny - Gotowy do Użycia!

## ✅ Co Zostało Zaimplementowane?

### 1. **Popup Promocyjny** 🎉
- Automatycznie wyświetla się po 3 sekundach
- Pokazuje się tylko raz na sesję
- Piękny gradient design (fiolet → różowy → czerwony)
- Responsywny na wszystkich urządzeniach
- Przycisk kopiowania kodu

### 2. **System Kodów Promocyjnych** 💳
- Walidacja kodów w czasie rzeczywistym
- Obliczanie zniżek (% lub kwota stała)
- Daty wygaśnięcia
- Limity użyć
- Panel admina

### 3. **Konfiguracja Promocji** ⚙️
- Łatwe włączanie/wyłączanie kampanii
- Gotowe szablony (Black Friday, Święta, Nowy Rok)
- Możliwość dodawania własnych promocji

---

## 🚀 Jak Włączyć Black Friday?

### Krok 1: Otwórz plik konfiguracji
```
src/data/promoConfig.ts
```

### Krok 2: Zmień flagę na `true`
```typescript
blackFriday: {
  enabled: true, // ⬅️ ZMIEŃ TO NA TRUE
  title: '🎉 Black Friday Sale!',
  code: 'BLACKFRIDAY',
  discount: '30%',
  validUntil: '30.11.2024',
}
```

### Krok 3: Gotowe! 🎉
- Popup automatycznie się pojawi
- Kod `BLACKFRIDAY` jest aktywny
- Użytkownicy mogą go użyć w kalkulatorze

---

## 📋 Dostępne Promocje

| Kampania | Kod | Zniżka | Status | Ważność |
|----------|-----|--------|--------|---------|
| **Black Friday** | `BLACKFRIDAY` | 30% | ✅ AKTYWNY | 30.11.2024 |
| **Święta** | `CHRISTMAS2024` | 25% | ⏸️ Wyłączony | 31.12.2024 |
| **Nowy Rok** | `NEWYEAR2025` | 20% | ⏸️ Wyłączony | 15.01.2025 |
| **Wiosna** | `SPRING2025` | 15% | ⏸️ Wyłączony | 31.03.2025 |

---

## 🎯 Jak To Działa?

### Dla Użytkownika:
1. Wchodzi na stronę → Po 3 sek pojawia się popup
2. Widzi promocję Black Friday z kodem `BLACKFRIDAY`
3. Kopiuje kod jednym kliknięciem
4. Wpisuje kod w kalkulatorze → Otrzymuje 30% zniżki
5. Popup nie pokazuje się ponownie w tej sesji

### Dla Admina:
1. Zmienia `enabled: true` w `promoConfig.ts`
2. Commit & push do repozytorium
3. Deploy aplikacji
4. Promocja jest aktywna! 🎉

---

## 📂 Struktura Plików

```
src/
├── components/
│   ├── PromoPopup.tsx          # Komponent popupu
│   ├── PromoCodeInput.tsx      # Pole wpisywania kodu
│   └── PromoCodeManager.tsx    # Panel admina
│
├── data/
│   ├── promoConfig.ts          # Konfiguracja promocji
│   └── promoCodes.ts           # Baza kodów rabatowych
│
├── types/
│   └── promo.ts                # Typy TypeScript
│
├── api/
│   └── validatePromo.ts        # API walidacji
│
└── app/
    ├── layout.tsx              # Popup zintegrowany tutaj
    └── admin/promo-codes/      # Panel admina
```

---

## 🔧 Konfiguracja Promocji

### Edytuj: `src/data/promoConfig.ts`

```typescript
export const PROMO_CAMPAIGNS = {
  blackFriday: {
    enabled: true,              // ⚠️ Włącz/wyłącz
    title: '🎉 Black Friday!',  // Tytuł popupu
    description: 'Rabat na wszystkie usługi!',
    code: 'BLACKFRIDAY',        // Kod promocyjny
    discount: '30%',            // Wysokość zniżki
    validUntil: '30.11.2024',   // Data wygaśnięcia
    autoShow: true,             // Auto-wyświetlanie
    delay: 3000,                // 3 sek opóźnienia
    showOnce: true,             // Raz na sesję
  },
};
```

---

## 🎨 Jak Wygląda Popup?

```
┌──────────────────────────────────────┐
│                  [X]                  │
│                                       │
│      🎉 Black Friday Sale!           │
│                                       │
│        ┌─────────────────┐           │
│        │   -30% ZNIŻKI   │           │
│        └─────────────────┘           │
│                                       │
│  Zdobądź ekskluzywny rabat na       │
│     wszystkie usługi!                │
│                                       │
│  ┌─────────────────────────────┐    │
│  │  BLACKFRIDAY  [Kopiuj] ✓   │    │
│  └─────────────────────────────┘    │
│                                       │
│  ⏰ Ważne do: 30.11.2024             │
│                                       │
│  ┌─────────────────────────────┐    │
│  │  Skorzystaj teraz! 🎁       │    │
│  └─────────────────────────────┘    │
└──────────────────────────────────────┘
```

---

## 💻 Jak Testować Lokalnie?

### 1. Uruchom serwer:
```bash
npm run dev
```

### 2. Otwórz przeglądarkę:
```
http://localhost:3000
```

### 3. Po 3 sekundach powinien wyświetlić się popup

### 4. Jeśli popup się nie pokazuje:
- Otwórz DevTools (F12)
- Application → Session Storage
- Usuń `promoPopupShown`
- Odśwież stronę

---

## 🔐 Panel Admina

### URL: `/admin/promo-codes`

Funkcje:
- ✅ Przeglądaj wszystkie kody
- ✅ Dodaj nowy kod
- ✅ Włącz/wyłącz kod
- ✅ Usuń kod
- ✅ Zobacz statystyki użycia

---

## 📱 Responsywność

Popup jest w pełni responsywny:
- **Desktop**: Środek ekranu, 500px szerokości
- **Tablet**: 90% szerokości ekranu
- **Mobile**: Pełna szerokość z paddingiem

---

## 🎯 Integracja z Kalkulatorem

### Automatyczna integracja:

```tsx
import PromoCodeInput from '@/components/PromoCodeInput';

<PromoCodeInput 
  onPromoApplied={(discount, code, discountType) => {
    // Automatycznie oblicza zniżkę
    const finalPrice = calculateWithDiscount(price, discount, discountType);
  }}
  onPromoRemoved={() => {
    // Przywraca oryginalną cenę
  }}
/>
```

---

## 📊 Tracking & Analytics

Popup automatycznie loguje:
- Wyświetlenia popupu
- Kliknięcia "Kopiuj kod"
- Zamknięcia popupu
- Użycie kodu w kalkulatorze

---

## ✅ Checklist Przed Uruchomieniem Kampanii

- [ ] Zmień `enabled: true` w `promoConfig.ts`
- [ ] Sprawdź datę `validUntil`
- [ ] Upewnij się, że kod istnieje w `promoCodes.ts`
- [ ] Testuj lokalnie
- [ ] Sprawdź na mobile
- [ ] Deploy do produkcji
- [ ] Test końcowy na live

---

## 🚨 Wyłączanie Promocji

### Po zakończeniu kampanii:

```typescript
blackFriday: {
  enabled: false, // ⬅️ ZMIEŃ NA FALSE
  // ... reszta konfiguracji
}
```

---

## 🆕 Dodawanie Nowej Promocji

### Edytuj: `src/data/promoConfig.ts`

```typescript
valentines: {
  enabled: true,
  title: '❤️ Walentynki!',
  description: 'Podaruj prezent swojej firmie!',
  code: 'LOVE2025',
  discount: '20%',
  validUntil: '14.02.2025',
  autoShow: true,
  delay: 3000,
  showOnce: true,
},
```

### Dodaj kod do bazy: `src/data/promoCodes.ts`

```typescript
{
  code: 'LOVE2025',
  discount: 20,
  discountType: 'percentage',
  isActive: true,
  description: 'Walentynkowa promocja',
  expiresAt: '2025-02-14'
}
```

---

## 📞 Support

Jeśli masz pytania:
1. Sprawdź Console w DevTools
2. Sprawdź Network tab
3. Sprawdź czy popup jest w DOM

---

## 🎉 Gotowe!

Twój system promocyjny jest:
- ✅ Skonfigurowany
- ✅ Gotowy do użycia
- ✅ Zintegrowany z kalkulatorem
- ✅ Responsywny
- ✅ Dostępny (a11y)

**Włącz Black Friday i ciesz się zwiększoną sprzedażą! 🚀**

---

## 📅 Harmonogram 2024-2025

| Miesiąc | Promocja | Kod | Zniżka |
|---------|----------|-----|--------|
| **Listopad** | Black Friday | `BLACKFRIDAY` | 30% |
| **Grudzień** | Święta | `CHRISTMAS2024` | 25% |
| **Styczeń** | Nowy Rok | `NEWYEAR2025` | 20% |
| **Luty** | Walentynki | `LOVE2025` | 20% |
| **Marzec** | Wiosna | `SPRING2025` | 15% |
| **Kwiecień** | Wielkanoc | `EASTER2025` | 15% |

---

**🔥 Black Friday jest AKTYWNY! Sprawdź na stronie! 🔥**
