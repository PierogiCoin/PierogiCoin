# 🎟️ Kody Promocyjne - Szybki Start

## ✅ Co zostało stworzone?

System kodów promocyjnych z:
- ✨ Polem do wpisywania kodów przez użytkowników
- 🔧 Panelem admina do zarządzania kodami
- 📊 Automatycznym obliczaniem zniżek
- 🎯 Włączaniem/wyłączaniem promocji

## 🚀 Jak uruchomić?

```bash
npm run dev
```

## 📍 Strony do odwiedzenia

### 1. Demo (użytkownik)
```
http://localhost:3000/demo-promo
```
Tutaj możesz przetestować wpisywanie kodów jak zwykły użytkownik.

### 2. Panel Admina
```
http://localhost:3000/admin/promo-codes
```
Tutaj zarządzasz kodami - dodajesz, wyłączasz, usuwasz.

## 🎯 Przykładowe kody (już działają!)

- **KLO15** - 15% zniżki
- **WELCOME10** - 10% zniżki

## 💡 Jak używać w swoim projekcie?

### Krok 1: Dodaj komponent w swoim formularzu

```tsx
import PromoCodeInput from '@/components/PromoCodeInput';

function TwojFormularz() {
  const [cena, setCena] = useState(1000);
  const [znizka, setZnizka] = useState(0);
  
  const cenaKoncowa = cena * (1 - znizka / 100);

  return (
    <div>
      <p>Cena: {cena} zł</p>
      <p>Do zapłaty: {cenaKoncowa} zł</p>
      
      <PromoCodeInput 
        onPromoApplied={(discount, code) => {
          setZnizka(discount);
          // Tutaj możesz zapisać kod do bazy/formularza
        }}
      />
    </div>
  );
}
```

### Krok 2: Zarządzaj kodami w panelu admina

1. Otwórz `/admin/promo-codes`
2. Kliknij **"+ Dodaj Kod"**
3. Wypełnij:
   - Kod (np. LATO2024)
   - Zniżka % (np. 20)
   - Opis (opcjonalnie)
4. Kliknij **"Zapisz Kod"**

### Krok 3: Wyłączanie promocji (jak chciałeś!)

Gdy chcesz zakończyć promocję **KLO15**:
1. Wejdź na `/admin/promo-codes`
2. Znajdź kod **KLO15**
3. Kliknij przycisk **"Wyłącz"**

Kod przestaje działać natychmiast! Możesz go później włączyć ponownie.

## 📁 Struktura plików

```
src/
├── types/promo.ts              # Typy TypeScript
├── data/promoCodes.ts          # Baza kodów (tu dodane KLO15, WELCOME10)
├── api/validatePromo.ts        # Walidacja kodów
├── components/
│   ├── PromoCodeInput.tsx      # Pole dla użytkownika
│   └── PromoCodeManager.tsx    # Panel admina
└── app/
    ├── demo-promo/page.tsx     # Strona demo
    └── admin/promo-codes/page.tsx  # Strona admina
```

## 🎨 Funkcje

✅ Wpisywanie kodów przez klientów  
✅ Walidacja w czasie rzeczywistym  
✅ Komunikaty po polsku  
✅ Panel admina (dodawanie/wyłączanie/usuwanie)  
✅ Daty wygaśnięcia  
✅ Limity użyć  
✅ Automatyczne liczenie zniżek  
✅ Responsywny design  

## 🔥 Najważniejsze funkcje

### Dla użytkownika:
- Wpisz kod → Kliknij "Zastosuj" → Zniżka się liczy!

### Dla admina:
- Dodaj nowy kod w 30 sekund
- Wyłącz/Włącz jednym klikiem
- Ustaw datę wygaśnięcia
- Ustaw limit użyć

## ⚠️ Ważne dla produkcji

Obecna wersja używa pamięci (mock data). Dla prawdziwej aplikacji:
1. Połącz z bazą danych (MongoDB/PostgreSQL)
2. Stwórz API endpoints
3. Dodaj licznik użyć (ile razy kod został użyty)
4. Dodaj zabezpieczenia (tylko admin może zarządzać)

## 📞 Jak to wygląda?

### Użytkownik widzi:
```
┌────────────────────────────────┐
│ [WPISZ KOD]  [Zastosuj]       │
│                                 │
│ ✓ Kod: KLO15 - Zniżka 15%     │
│   [Usuń]                        │
└────────────────────────────────┘
```

### Admin widzi:
```
┌─────────────────────────────────┐
│ Zarządzanie Kodami  [+ Dodaj]  │
├─────────────────────────────────┤
│ KLO15        -15%  ✓ Aktywny   │
│ [Wyłącz] [Usuń]                │
├─────────────────────────────────┤
│ WELCOME10    -10%  ✓ Aktywny   │
│ [Wyłącz] [Usuń]                │
└─────────────────────────────────┘
```

## 🎉 Gotowe!

Wszystko działa. Odpal `npm run dev` i testuj!
