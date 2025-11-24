# 🎟️ System Kodów Promocyjnych

## Opis
Kompletny system zarządzania kodami promocyjnymi z możliwością tworzenia, aktywacji/dezaktywacji kodów rabatowych.

## 📦 Utworzone pliki

### 1. Typy (`src/types/promo.ts`)
- `PromoCode` - interfejs kodu promocyjnego
- `PromoValidationResult` - wynik walidacji kodu

### 2. Dane (`src/data/promoCodes.ts`)
- Baza kodów promocyjnych (mockowa - w produkcji użyj bazy danych)
- Funkcje zarządzania: `validatePromoCode`, `togglePromoCode`, `addPromoCode`, `removePromoCode`
- Przykładowe kody: **KLO15** (15% zniżki), **WELCOME10** (10% zniżki)

### 3. API (`src/api/validatePromo.ts`)
- Walidacja kodów promocyjnych
- Sprawdzanie statusu aktywności, daty wygaśnięcia, limitu użyć

### 4. Komponenty

#### `PromoCodeInput.tsx` - Pole do wpisywania kodów
**Użycie w komponencie:**
```tsx
import PromoCodeInput from '@/components/PromoCodeInput';

function YourComponent() {
  const handlePromoApplied = (discount: number, code: string) => {
    console.log(`Zastosowano kod ${code} z ${discount}% zniżką`);
    // Tutaj oblicz cenę z rabatem
  };

  return (
    <PromoCodeInput 
      onPromoApplied={handlePromoApplied}
      onPromoRemoved={() => console.log('Usunięto kod')}
    />
  );
}
```

#### `PromoCodeManager.tsx` - Panel admina
- Zarządzanie wszystkimi kodami
- Dodawanie nowych kodów
- Włączanie/wyłączanie kodów
- Usuwanie kodów

### 5. Strona admina (`src/app/admin/promo-codes/page.tsx`)
**URL:** `/admin/promo-codes`

## 🚀 Jak używać

### Dla użytkowników (frontend)
```tsx
import PromoCodeInput from '@/components/PromoCodeInput';

<PromoCodeInput 
  onPromoApplied={(discount, code) => {
    // Oblicz nową cenę
    const newPrice = originalPrice * (1 - discount / 100);
    setFinalPrice(newPrice);
  }}
/>
```

### Dla adminów
1. Przejdź do `/admin/promo-codes`
2. Kliknij **"+ Dodaj Kod"**
3. Wypełnij formularz:
   - **Kod** (np. LATO2024)
   - **Zniżka %** (np. 15)
   - **Opis** (opcjonalnie)
   - **Data wygaśnięcia** (opcjonalnie)
   - **Limit użyć** (opcjonalnie)
4. Kliknij **"Zapisz Kod"**

### Wyłączanie promocji
W panelu admina kliknij **"Wyłącz"** przy danym kodzie - kod przestaje działać, ale możesz go później włączyć.

## 📝 Przykłady kodów

```typescript
// Kod z limitowanym czasem
{
  code: 'BLACKFRIDAY',
  discount: 30,
  isActive: true,
  expiresAt: '2024-11-30',
  usageLimit: 100
}

// Kod stały
{
  code: 'STALY10',
  discount: 10,
  isActive: true
}

// Kod jednorazowy
{
  code: 'FIRST50',
  discount: 50,
  isActive: true,
  usageLimit: 1
}
```

## 🔧 Integracja z cenami

```tsx
const [price, setPrice] = useState(1000);
const [discount, setDiscount] = useState(0);
const [promoCode, setPromoCode] = useState('');

const finalPrice = price * (1 - discount / 100);

<div>
  <p>Cena: {price} zł</p>
  {discount > 0 && (
    <p className="text-green-600">
      Zniżka {discount}% - oszczędzasz {price * discount / 100} zł
    </p>
  )}
  <p className="text-xl font-bold">
    Do zapłaty: {finalPrice.toFixed(2)} zł
  </p>
  
  <PromoCodeInput 
    onPromoApplied={(disc, code) => {
      setDiscount(disc);
      setPromoCode(code);
    }}
    onPromoRemoved={() => {
      setDiscount(0);
      setPromoCode('');
    }}
  />
</div>
```

## 🎯 Features

✅ Wpisywanie i walidacja kodów  
✅ Automatyczne obliczanie zniżki  
✅ Panel admina do zarządzania  
✅ Włączanie/wyłączanie kodów (jak KLO15)  
✅ Daty wygaśnięcia  
✅ Limity użyć  
✅ Responsywny design  
✅ Real-time walidacja  
✅ Komunikaty błędów po polsku  

## 🔐 Produkcja

W wersji produkcyjnej zamień `src/data/promoCodes.ts` na:
- Bazę danych (MongoDB, PostgreSQL)
- API endpoint z backend'em
- Persistent storage dla licznika użyć

## 🎨 Stylizacja

Komponenty używają Tailwind CSS. Możesz dostosować kolory w klasach:
- `bg-blue-600` - główny kolor przycisków
- `bg-green-100` - tło sukcesu
- `bg-red-100` - tło błędów
