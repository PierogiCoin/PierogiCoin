import { PromoCode } from '@/types/promo';

// Baza kodów promocyjnych - w produkcji to by było w bazie danych
export const promoCodes: PromoCode[] = [
  {
    code: 'KLO15',
    discount: 15,
    discountType: 'percentage',
    isActive: true,
    createdAt: new Date().toISOString(),
    usedCount: 0,
    description: 'Zniżka 15% na wszystkie usługi'
  },
  {
    code: 'WELCOME10',
    discount: 10,
    discountType: 'percentage',
    isActive: true,
    createdAt: new Date().toISOString(),
    usedCount: 0,
    description: 'Kod powitalny - 10% zniżki'
  },
  {
    code: 'BLACKFRIDAY',
    discount: 30,
    discountType: 'percentage',
    isActive: false,
    createdAt: new Date().toISOString(),
    usedCount: 0,
    description: 'Black Friday - 30% zniżki',
    minPurchaseAmount: 500,
    maxDiscount: 500
  },
  {
    code: 'RABAT50',
    discount: 50,
    discountType: 'fixed',
    isActive: true,
    createdAt: new Date().toISOString(),
    usedCount: 0,
    description: '50 zł rabatu',
    minPurchaseAmount: 200
  }
];

// Funkcje pomocnicze do zarządzania kodami
export const getPromoCode = (code: string): PromoCode | undefined => {
  return promoCodes.find(promo => promo.code.toUpperCase() === code.toUpperCase());
};

export const validatePromoCode = (code: string): { valid: boolean; discount: number; message: string } => {
  const promo = getPromoCode(code);
  
  if (!promo) {
    return { valid: false, discount: 0, message: 'Kod nie istnieje' };
  }
  
  if (!promo.isActive) {
    return { valid: false, discount: 0, message: 'Kod nie jest już aktywny' };
  }
  
  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
    return { valid: false, discount: 0, message: 'Kod wygasł' };
  }
  
  if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
    return { valid: false, discount: 0, message: 'Kod osiągnął limit użyć' };
  }
  
  return { 
    valid: true, 
    discount: promo.discount, 
    message: `Kod aktywowany! Zniżka ${promo.discount}%` 
  };
};

export const togglePromoCode = (code: string): boolean => {
  const promo = getPromoCode(code);
  if (promo) {
    promo.isActive = !promo.isActive;
    return true;
  }
  return false;
};

export const addPromoCode = (newPromo: Omit<PromoCode, 'createdAt' | 'usedCount'>): PromoCode => {
  const promo: PromoCode = {
    ...newPromo,
    createdAt: new Date().toISOString(),
    usedCount: 0
  };
  promoCodes.push(promo);
  return promo;
};

export const removePromoCode = (code: string): boolean => {
  const index = promoCodes.findIndex(promo => promo.code.toUpperCase() === code.toUpperCase());
  if (index > -1) {
    promoCodes.splice(index, 1);
    return true;
  }
  return false;
};
