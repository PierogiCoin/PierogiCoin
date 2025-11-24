// Konfiguracja aktywnych promocji
// Zmień te wartości aby wyświetlić różne promocje

export interface PromoConfig {
  enabled: boolean;
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  image?: string;
  autoShow: boolean;
  delay: number;
  showOnce: boolean;
}

// 🎄 PROMOCJE DO AKTYWACJI
export const PROMO_CAMPAIGNS: Record<string, PromoConfig> = {
  blackFriday: {
    enabled: true, // ⚠️ Zmień na true aby aktywować
    title: '🎉 Black Friday Sale!',
    description: 'Zdobądź ekskluzywny rabat na wszystkie usługi!',
    code: 'BLACKFRIDAY',
    discount: '30%',
    validUntil: '30.11.2024',
    autoShow: true,
    delay: 3000,
    showOnce: true,
  },
  
  christmas: {
    enabled: false, // ⚠️ Zmień na true aby aktywować
    title: '🎄 Świąteczna Promocja!',
    description: 'Najlepszy prezent dla Twojego biznesu!',
    code: 'CHRISTMAS2024',
    discount: '25%',
    validUntil: '31.12.2024',
    autoShow: true,
    delay: 3000,
    showOnce: true,
  },
  
  newYear: {
    enabled: false, // ⚠️ Zmień na true aby aktywować
    title: '🎆 Nowy Rok, Nowe Możliwości!',
    description: 'Rozpocznij rok z rabatem na usługi!',
    code: 'NEWYEAR2025',
    discount: '20%',
    validUntil: '15.01.2025',
    autoShow: true,
    delay: 3000,
    showOnce: true,
  },
  
  spring: {
    enabled: false, // ⚠️ Zmień na true aby aktywować
    title: '🌸 Wiosenna Promocja!',
    description: 'Świeży start z rabatem!',
    code: 'SPRING2025',
    discount: '15%',
    validUntil: '31.03.2025',
    autoShow: true,
    delay: 3000,
    showOnce: true,
  },

  // Dodaj własne promocje tutaj
  custom: {
    enabled: false,
    title: '🎁 Specjalna Oferta!',
    description: 'Twoja własna promocja!',
    code: 'CUSTOM',
    discount: '10%',
    validUntil: '31.12.2024',
    autoShow: true,
    delay: 3000,
    showOnce: true,
  },
};

// Funkcja zwracająca aktywną promocję
export function getActivePromo(): PromoConfig | null {
  const activePromo = Object.values(PROMO_CAMPAIGNS).find(
    (promo) => promo.enabled
  );
  return activePromo || null;
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
