# 🎁 Popup Promocyjny - Instrukcja Obsługi

## 📋 Opis
System wyświetlający automatyczne popupy z promocjami (Black Friday, Święta, Nowy Rok, itp.).

---

## 🚀 Jak Aktywować Promocję?

### 1. Otwórz plik konfiguracji:
```
src/data/promoConfig.ts
```

### 2. Zmień `enabled: true` dla wybranej promocji:

```typescript
export const PROMO_CAMPAIGNS = {
  blackFriday: {
    enabled: true, // ✅ ZMIEŃ NA true ABY WŁĄCZYĆ
    title: '🎉 Black Friday Sale!',
    code: 'BLACKFRIDAY',
    discount: '30%',
    validUntil: '30.11.2024',
  },
  
  christmas: {
    enabled: false, // ⚠️ ZMIEŃ NA true gdy chcesz włączyć
    title: '🎄 Świąteczna Promocja!',
    code: 'CHRISTMAS2024',
    discount: '25%',
    validUntil: '31.12.2024',
  },
  
  // ...więcej promocji
};
```

---

## 🎨 Dostępne Promocje

| Promocja | Kod | Zniżka | Kiedy Włączyć |
|----------|-----|--------|---------------|
| **Black Friday** | `BLACKFRIDAY` | 30% | Koniec listopada |
| **Święta** | `CHRISTMAS2024` | 25% | Grudzień |
| **Nowy Rok** | `NEWYEAR2025` | 20% | Styczeń |
| **Wiosna** | `SPRING2025` | 15% | Marzec-Kwiecień |
| **Własna** | `CUSTOM` | 10% | Dowolnie |

---

## ✏️ Jak Dodać Własną Promocję?

Edytuj `src/data/promoConfig.ts`:

```typescript
myPromo: {
  enabled: true,
  title: '🔥 Mega Wyprzedaż!',
  description: 'Nie przegap okazji!',
  code: 'MEGA50',
  discount: '50%',
  validUntil: '31.12.2024',
  autoShow: true,
  delay: 3000, // 3 sekundy po załadowaniu strony
  showOnce: true, // pokazuj raz na sesję
},
```

---

## ⚙️ Parametry Konfiguracji

| Parametr | Opis | Przykład |
|----------|------|----------|
| `enabled` | Czy promocja jest aktywna | `true/false` |
| `title` | Tytuł popupu | `"🎉 Black Friday!"` |
| `description` | Opis promocji | `"Zdobądź rabat!"` |
| `code` | Kod rabatowy | `"BLACKFRIDAY"` |
| `discount` | Wysokość zniżki | `"30%"` lub `"100 zł"` |
| `validUntil` | Data ważności | `"30.11.2024"` |
| `autoShow` | Auto-wyświetlanie | `true/false` |
| `delay` | Opóźnienie (ms) | `3000` (3 sek) |
| `showOnce` | Tylko raz na sesję | `true/false` |

---

## 🎯 Jak To Działa?

1. **Użytkownik wchodzi na stronę** → Po 3 sekundach wyświetla się popup
2. **Popup pokazuje** → Tytuł, kod rabatowy, datę ważności
3. **Użytkownik może** → Skopiować kod lub zamknąć popup
4. **`showOnce: true`** → Popup nie pojawi się ponownie w tej sesji

---

## 🔗 Integracja z Systemem Kodów Promocyjnych

Popup działa razem z komponentem `PromoCodeInput`:

```tsx
import PromoCodeInput from '@/components/PromoCodeInput';

<PromoCodeInput 
  onPromoApplied={(discount, code) => {
    console.log(`Zastosowano ${code} z ${discount}% zniżki`);
  }}
/>
```

### Dodaj Kod do Bazy

Edytuj `src/data/promoCodes.ts`:

```typescript
const promoCodes: PromoCode[] = [
  {
    code: 'BLACKFRIDAY',
    discount: 30,
    discountType: 'percentage',
    isActive: true,
    description: 'Black Friday 2024',
    expiresAt: '2024-11-30',
  },
];
```

---

## 🛠️ Testowanie

### Test lokalny:
1. Uruchom aplikację: `npm run dev`
2. Wejdź na `http://localhost:3000`
3. Po 3 sekundach powinien wyświetlić się popup

### Reset sesji:
Jeśli popup się nie pokazuje (bo był już wyświetlony):
1. Otwórz DevTools → Application → Session Storage
2. Usuń `promoPopupShown`
3. Odśwież stronę

---

## 📅 Harmonogram Promocji 2024-2025

| Data | Promocja | Kod | Akcja |
|------|----------|-----|-------|
| **25-30.11.2024** | Black Friday | `BLACKFRIDAY` | Ustaw `enabled: true` |
| **01-31.12.2024** | Święta | `CHRISTMAS2024` | Ustaw `enabled: true` |
| **01-15.01.2025** | Nowy Rok | `NEWYEAR2025` | Ustaw `enabled: true` |
| **01-31.03.2025** | Wiosna | `SPRING2025` | Ustaw `enabled: true` |

---

## 🎨 Wygląd Popupu

Popup ma:
- ✅ Gradient tło (fiolet → różowy → czerwony)
- ✅ Duży kod promocyjny z przyciskiem "Kopiuj"
- ✅ Przycisk zamykania (X)
- ✅ Animacje (fade in, slide up)
- ✅ Responsive design
- ✅ Backdrop blur

---

## 🚨 Ważne!

- **Tylko JEDNA promocja** może być aktywna jednocześnie
- Pamiętaj **zaktualizować daty** ważności
- Dodaj kod do `promoCodes.ts` aby działał w kalkulatorze
- Testuj popup przed uruchomieniem kampanii

---

## 📞 Potrzebujesz Pomocy?

Jeśli masz pytania lub problemy:
1. Sprawdź console w DevTools (`F12`)
2. Sprawdź czy popup jest w DOM (`Inspect Element`)
3. Upewnij się, że `enabled: true`

---

## ✅ Checklist Przed Uruchomieniem Promocji

- [ ] Zmień `enabled: true` w `promoConfig.ts`
- [ ] Zaktualizuj datę `validUntil`
- [ ] Dodaj kod do `promoCodes.ts`
- [ ] Przetestuj popup lokalnie
- [ ] Sprawdź responsywność na mobile
- [ ] Zweryfikuj czy kod działa w kalkulatorze
- [ ] Deploy do produkcji
- [ ] Testuj na żywo

---

🎉 **Gotowe! Twój popup promocyjny jest skonfigurowany!**
