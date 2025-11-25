import { PromoCode } from '@/types/promo';

export const promoCodes: PromoCode[] = [
  {
    code: 'START2024',
    discount: 10,
    discountType: 'percentage',
    isActive: true,
    description: '10% rabatu na pierwsze zlecenie',
    usedCount: 45,
    usageLimit: 100,
    createdAt: new Date().toISOString()
  },
  {
    code: 'LYKKREEA_PRO',
    discount: 15,
    discountType: 'percentage',
    isActive: true,
    description: 'Specjalny rabat dla subskrybentów',
    expiresAt: '2024-12-31',
    usedCount: 12,
    createdAt: new Date().toISOString()
  },
  {
    code: 'ECOM_BOOST',
    discount: 500,
    discountType: 'fixed',
    isActive: true,
    description: '500 PLN taniej na sklep internetowy',
    minPurchaseAmount: 3000,
    usedCount: 5,
    createdAt: new Date().toISOString()
  },
  {
    code: 'DEV_SECRET',
    discount: 20,
    discountType: 'percentage',
    isActive: true,
    description: 'Nagroda za ciekawość (Easter Egg)',
    usageLimit: 10,
    usedCount: 2,
    createdAt: new Date().toISOString()
  },
  {
    code: 'PREMIUM_DEAL',
    discount: 12,
    discountType: 'percentage',
    isActive: true,
    description: 'Rabat dla projektów Premium',
    minPurchaseAmount: 5000,
    usedCount: 0,
    createdAt: new Date().toISOString()
  }
];

// --- Funkcje Logiczne ---

export const getPromoCode = (code: string): PromoCode | undefined => {
  return promoCodes.find(promo => promo.code.toUpperCase() === code.toUpperCase());
};

export interface ValidationResult {
  valid: boolean;
  discountValue: number;
  discountType: 'percentage' | 'fixed' | null;
  message: string;
  formattedDiscount: string;
}

export const validatePromoCode = (code: string, currentTotal: number = 0): ValidationResult => {
  const promo = getPromoCode(code);
  
  if (!promo) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: 'Kod nie istnieje.', 
      formattedDiscount: '' 
    };
  }
  
  if (!promo.isActive) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: 'Ten kod jest nieaktywny.', 
      formattedDiscount: '' 
    };
  }
  
  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: 'Kod wygasł.', 
      formattedDiscount: '' 
    };
  }
  
  if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: 'Limit użyć tego kodu został wyczerpany.', 
      formattedDiscount: '' 
    };
  }

  if (promo.minPurchaseAmount && currentTotal < promo.minPurchaseAmount) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: `Kod wymaga zamówienia za min. ${promo.minPurchaseAmount} PLN.`, 
      formattedDiscount: '' 
    };
  }
  
  const formattedDiscount = promo.discountType === 'percentage' 
    ? `-${promo.discount}%` 
    : `-${promo.discount} PLN`;

  return { 
    valid: true, 
    discountValue: promo.discount, 
    discountType: promo.discountType,
    message: promo.description || '',
    formattedDiscount
  };
};
