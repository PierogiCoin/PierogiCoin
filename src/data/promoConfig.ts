// Konfiguracja aktywnych promocji
// Zmień te wartości aby wyświetlić różne promocje

export interface PromoConfig {
  id: string;
  enabled: boolean;
  priority: number; // Wyższy priorytet wygrywa, jeśli daty się nakładają
  title: string;
  description: string;
  code: string;
  discountLabel: string; // Tekst wyświetlany na badge'u (np. "-15%")
  validUntil: string; // Tekst dla użytkownika
  startDate?: string; // ISO date string (opcjonalne - auto start)
  endDate?: string;   // ISO date string (opcjonalne - auto stop)
  autoShow: boolean;
  delay: number;
  showOnce: boolean;
}

// 🎄 PROMOCJE DO AKTYWACJI
export const PROMO_CAMPAIGNS: Record<string, PromoConfig> = {
  // 1. Stała oferta powitalna (Niski priorytet)
  WELCOME: {
    id: 'welcome_offer',
    enabled: true,
    priority: 1,
    title: '👋 Cześć! Mam prezent.',
    description: 'Zacznijmy współpracę od dobrej wiadomości. Odbierz rabat na start.',
    code: 'START2024',
    discountLabel: '-10%',
    validUntil: 'Bezterminowo',
    autoShow: true,
    delay: 8000, // Pokazujemy dość późno, żeby nie irytować
    showOnce: true,
  },

  // 2. Black Friday / Cyber Monday (Wysoki priorytet)
  BLACK_FRIDAY: {
    id: 'bf_2024',
    enabled: false, // Włączymy w listopadzie
    priority: 10,
    title: '🖤 Black Week Deal',
    description: 'Najlepszy czas na nową stronę. Zamów teraz, zrealizuj w styczniu.',
    code: 'BLACK24',
    discountLabel: '-25%',
    validUntil: '30.11.2024',
    startDate: '2024-11-20T00:00:00.000Z',
    endDate: '2024-12-01T23:59:59.999Z',
    autoShow: true,
    delay: 2000, // Agresywniejsze pokazywanie
    showOnce: false, // Przypominamy przy każdej wizycie w tym okresie
  },

  // 3. Nowy Rok - Nowa Strona
  NEW_YEAR: {
    id: 'new_year_2025',
    enabled: false,
    priority: 5,
    title: '🚀 Nowy Rok, Nowy Wizerunek',
    description: 'Zrealizuj postanowienia biznesowe. Profesjonalna strona www taniej.',
    code: 'LYKKREEA_PRO',
    discountLabel: '-15%',
    validUntil: '31.01.2025',
    startDate: '2025-01-01T00:00:00.000Z',
    endDate: '2025-01-31T23:59:59.999Z',
    autoShow: true,
    delay: 5000,
    showOnce: true,
  },

  // 4. Promocja E-commerce (Dla podstron sklepowych)
  ECOMMERCE_SPECIAL: {
    id: 'ecom_boost',
    enabled: true,
    priority: 3,
    title: '🛍️ Otwórz Sklep Online',
    description: 'Dofinansowanie na start Twojego e-commerce. Oszczędź 500 PLN.',
    code: 'ECOM_BOOST',
    discountLabel: '-500 PLN',
    validUntil: 'Do odwołania',
    autoShow: false, // Nie pokazujemy automatycznie wszędzie
    delay: 10000,
    showOnce: true,
  }
};

// Funkcja zwracająca NAJLEPSZĄ aktywną promocję
export function getActivePromo(): PromoConfig | null {
  const now = new Date();

  const activePromos = Object.values(PROMO_CAMPAIGNS).filter((promo) => {
    // 1. Czy włączona ręcznie?
    if (!promo.enabled) return false;

    // 2. Czy mieści się w datach (jeśli są podane)?
    if (promo.startDate && new Date(promo.startDate) > now) return false;
    if (promo.endDate && new Date(promo.endDate) < now) return false;

    return true;
  });

  // Sortujemy po priorytecie (malejąco) i bierzemy pierwszą
  if (activePromos.length === 0) return null;
  
  return activePromos.sort((a, b) => b.priority - a.priority)[0];
}

// Funkcja do łatwej zmiany promocji
export function activatePromo(promoKey: keyof typeof PROMO_CAMPAIGNS) {
  // W prawdziwej aplikacji to by zapisywało do bazy danych
  // Tu tylko dla demonstracji
  Object.keys(PROMO_CAMPAIGNS).forEach((key) => {
    PROMO_CAMPAIGNS[key as keyof typeof PROMO_CAMPAIGNS].enabled = false;
  });
  PROMO_CAMPAIGNS[promoKey].enabled = true;
}
