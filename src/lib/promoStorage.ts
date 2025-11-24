// LocalStorage handling dla kodów promocyjnych

interface StoredPromoCode {
  code: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  appliedAt: string;
}

const STORAGE_KEY = 'appliedPromoCode';
const EXPIRY_HOURS = 24; // Kod wygasa po 24h w localStorage

export const savePromoToStorage = (code: string, discount: number, discountType: 'percentage' | 'fixed'): void => {
  if (typeof window === 'undefined') return;
  
  const data: StoredPromoCode = {
    code,
    discount,
    discountType,
    appliedAt: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getPromoFromStorage = (): StoredPromoCode | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const data: StoredPromoCode = JSON.parse(stored);
    
    // Sprawdź czy nie wygasło
    const appliedAt = new Date(data.appliedAt);
    const now = new Date();
    const hoursDiff = (now.getTime() - appliedAt.getTime()) / (1000 * 60 * 60);
    
    if (hoursDiff > EXPIRY_HOURS) {
      removePromoFromStorage();
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
};

export const removePromoFromStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

// Analytics tracking
export const trackPromoUsage = (code: string, discount: number, orderValue: number): void => {
  // Integracja z Google Analytics / GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'promo_code_applied',
      promo_code: code,
      discount_value: discount,
      order_value: orderValue
    });
  }
  
  console.log('Promo code used:', { code, discount, orderValue });
};
