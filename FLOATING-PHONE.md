# 📞 Pływający Przycisk Telefonu

## ✅ Status: Aktywny (Mobile Only)

Dyskretny, pływający przycisk telefonu zoptymalizowany pod konwersje i UX.

## 🎯 Charakterystyka

### Wygląd
- 🟢 **Zielony gradient** (from-green-500 to-green-600)
- 📍 **Pozycja:** Prawy dolny róg
- 📏 **Rozmiar:** 56x56px (14rem)
- ✨ **Animacje:** Pulsowanie + subtelne skalowanie
- 💫 **Shadow:** Świecący zielony cień

### Zachowanie
- ⏱️ **Pojawia się po:** 5 sekundach od załadowania strony
- 📱 **Widoczny tylko na:** Mobile i Tablet (do 1024px)
- 🚫 **Ukrywa się gdy:** Użytkownik scrolluje do sekcji kontakt/footer
- ❌ **Można zamknąć:** Przycisk X (zapisuje w sessionStorage)
- 🔄 **Reset:** Po zamknięciu karty przeglądarki

### Funkcjonalność
- ☎️ **Klik → Telefon:** `tel:+48790629497`
- 📊 **GTM Tracking:** Event `phone_click` z location i numerem
- 💬 **Tooltip:** Pokazuje numer na hover (desktop)

## 🎨 Animacje GSAP

### 1. Wejście (Entry)
```typescript
gsap.fromTo('.floating-phone-btn',
  { scale: 0, opacity: 0, rotation: -180 },
  { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(1.7)' }
);
```
- Efekt: "Pop in" z obrotem
- Timing: 0.5s
- Easing: Back elastic

### 2. Pulsowanie (Continuous)
```typescript
gsap.to('.floating-phone-icon', {
  scale: 1.1,
  duration: 0.8,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});
```
- Efekt: Subtelne pulsowanie ikony
- Loop: Nieskończony
- Przyciąga wzrok bez irytacji

### 3. Ukrywanie (Hide)
```typescript
gsap.to('.floating-phone-btn',
  { scale: 0, opacity: 0, rotation: 180, duration: 0.3, ease: 'back.in(1.7)' }
);
```
- Efekt: "Pop out" z obrotem w drugą stronę
- Timing: 0.3s (szybsze niż wejście)

### 4. Scroll-based
- Fade out gdy w sekcji kontakt
- Fade in gdy użytkownik scrolluje z powrotem
- Duration: 0.3s
- Smooth transitions

## 📊 GTM Integration

### Event Tracking
```javascript
window.dataLayer.push({
  event: 'phone_click',
  phone_location: 'floating_button',
  phone_number: '+48790629497'
});
```

### Jak wykorzystać w GTM:

1. **Trigger:** Custom Event = `phone_click`
2. **Variables:**
   - `{{phone_location}}` → "floating_button"
   - `{{phone_number}}` → "+48790629497"
3. **Use Case:** Śledzenie konwersji telefonicznych

### Przykład GA4 Event Tag:
```
Event Name: phone_call_intent
Parameters:
  - source: floating_button
  - phone: +48790629497
```

## 🎨 Customizacja

### Zmiana koloru
```tsx
// Zmień w FloatingPhone.tsx
className="bg-gradient-to-br from-blue-500 to-blue-600"  // Niebieski
className="bg-gradient-to-br from-cyan-500 to-cyan-600"  // Cyan
className="bg-gradient-to-br from-purple-500 to-purple-600"  // Fioletowy
```

### Zmiana pozycji
```tsx
// Prawy górny róg
className="fixed top-20 right-4 z-40"

// Lewy dolny róg
className="fixed bottom-20 left-4 z-40"

// Centralnie na dole
className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40"
```

### Zmiana timingu
```tsx
// Pojawia się po 10 sekundach
setTimeout(() => setIsVisible(true), 10000);

// Pojawia się od razu
setTimeout(() => setIsVisible(true), 0);

// Pojawia się po scrollu (np. 30% strony)
useEffect(() => {
  const handleScroll = () => {
    const scrolled = window.scrollY / document.documentElement.scrollHeight;
    if (scrolled > 0.3) setIsVisible(true);
  };
  window.addEventListener('scroll', handleScroll);
}, []);
```

### Zmiana rozmiaru
```tsx
// Mniejszy (12rem = 48px)
className="w-12 h-12"

// Większy (16rem = 64px)
className="w-16 h-16"
```

## 🧪 Testowanie

### Test 1: Pojawienie się
1. Otwórz stronę na mobile (lub DevTools mobile view)
2. Poczekaj 5 sekund
3. Przycisk powinien "wystrzelić" z prawego dolnego rogu

### Test 2: Ukrywanie w kontakt
1. Scroll na sam dół do sekcji kontakt
2. Przycisk powinien zniknąć (fade out)
3. Scroll z powrotem do góry
4. Przycisk powinien wrócić (fade in)

### Test 3: Zamknięcie
1. Kliknij przycisk X w prawym górnym rogu
2. Przycisk powinien się obrócić i zniknąć
3. Odśwież stronę (F5)
4. Przycisk NIE powinien się pojawić (sessionStorage)
5. Zamknij i otwórz kartę na nowo
6. Przycisk powinien wrócić

### Test 4: GTM Event
1. Kliknij przycisk telefonu
2. Otwórz Console (F12)
3. Sprawdź: `window.dataLayer`
4. Powinien być event: `phone_click`

### Test 5: Responsywność
1. Desktop (>1024px) → Przycisk NIE powinien się pokazać
2. Tablet (768-1024px) → Przycisk POWINIEN się pokazać
3. Mobile (<768px) → Przycisk POWINIEN się pokazać

## 📱 Mobile UX Best Practices

### ✅ Co robi dobrze:
- Nie pojawia się od razu (5s delay)
- Ukrywa się w sekcji kontakt (nie duplikuje)
- Można go zamknąć (respekt dla użytkownika)
- Tylko na mobile (gdzie faktycznie można zadzwonić)
- Tracking w GTM (mierzysz konwersje)

### ✅ Dlaczego to działa:
- **Zielony kolor** = call-to-action (uniwersalny "dzwoń")
- **Pulsowanie** = przyciąga wzrok bez irytacji
- **Shadow glow** = wyróżnia się na tle
- **Animacje** = premium feel, profesjonalnie
- **sessionStorage** = nie wraca po zamknięciu (w tej sesji)

## 🔧 Troubleshooting

### Przycisk się nie pokazuje?
```javascript
// Sprawdź console
console.log('Window width:', window.innerWidth); // Musi być <= 1024
console.log('Hidden:', sessionStorage.getItem('phone-button-hidden')); // Musi być null
```

### Przycisk widoczny na desktop?
Usuń warunek w `FloatingPhone.tsx`:
```tsx
// Zakomentuj te linie:
// if (typeof window !== 'undefined' && window.innerWidth > 1024) {
//   return null;
// }
```

### GTM event się nie wysyła?
```javascript
// Sprawdź czy dataLayer istnieje
console.log(window.dataLayer);

// Sprawdź czy zgoda na analytics
localStorage.getItem('cookie-consent');
```

## 📊 Metryki do śledzenia

W Google Analytics (przez GTM):
1. **Phone Click Rate** = phone_click / pageviews
2. **Average Time to Click** = czas od załadowania do kliknięcia
3. **Mobile vs Tablet** = device breakdown
4. **Bounce Rate** = czy pomaga zatrzymać użytkowników?

## 🎯 Optymalizacja Konwersji

### A/B Testing Ideas:
- [ ] Kolor: Zielony vs Niebieski vs Cyan
- [ ] Timing: 5s vs 10s vs po scrollu
- [ ] Rozmiar: 48px vs 56px vs 64px
- [ ] Pozycja: Prawy vs Lewy dolny róg
- [ ] Tekst: Tylko ikona vs "Zadzwoń"
- [ ] Pulsowanie: Tak vs Nie

### Heatmap Analysis:
Użyj narzędzi jak Hotjar/Clarity do sprawdzenia:
- Czy użytkownicy go zauważają?
- Czy próbują go kliknąć?
- Czy przeszkadza w czytaniu treści?

## 🚀 Następne kroki

### Możliwe rozszerzenia:
1. **WhatsApp button** obok telefonu
2. **Telegram/Messenger** dla młodszej grupy
3. **Callback form** w tooltip
4. **Godziny pracy** - pokaż "Dzwoń teraz" lub "Zostaw wiadomość"
5. **A/B różnych kolorów** przez GTM

---

**Kod:** `src/components/FloatingPhone.tsx`  
**Build size:** ~4.7KB  
**Dependencies:** GSAP, Lucide Icons  
**Performance:** Lazy loaded, minimal impact
