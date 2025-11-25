export interface PromoCode {
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED'; // Procentowy lub Kwotowy
  value: number; // Wartość (np. 15 dla 15%, 500 dla 500 PLN)
  isActive: boolean;
  description: string; // Krótki opis dla użytkownika
  minPurchaseAmount?: number; // Minimalna kwota zamówienia
  expiresAt?: string; // Data wygaśnięcia (ISO string)
  usageLimit?: number; // Limit użyć globalnie
  usedCount: number; // Ile razy użyto
}

const promoCodes: PromoCode[] = [
  {
    code: 'START2024',
    discountType: 'PERCENTAGE',
    value: 10,
    isActive: true,
    description: '10% rabatu na pierwsze zlecenie',
    usedCount: 45,
    usageLimit: 100
  },
  {
    code: 'LYKKREEA_PRO',
    discountType: 'PERCENTAGE',
    value: 15,
    isActive: true,
    description: 'Specjalny rabat dla subskrybentów',
    expiresAt: '2024-12-31',
    usedCount: 12
  },
  {
    code: 'ECOM_BOOST',
    discountType: 'FIXED',
    value: 500,
    isActive: true,
    description: '500 PLN taniej na sklep internetowy',
    minPurchaseAmount: 3000, // Działa tylko przy większych projektach
    usedCount: 5
  },
  {
    code: 'DEV_SECRET',
    discountType: 'PERCENTAGE',
    value: 20,
    isActive: true,
    description: 'Nagroda za ciekawość (Easter Egg)',
    usageLimit: 10, // Bardzo limitowany
    usedCount: 2
  },
  {
    code: 'PREMIUM_DEAL',
    discountType: 'PERCENTAGE',
    value: 12,
    isActive: true,
    description: 'Rabat dla projektów Premium',
    minPurchaseAmount: 5000,
    usedCount: 0
  }
];

// --- Funkcje Logiczne ---

export const getPromoCode = (code: string): PromoCode | undefined => {
  return promoCodes.find(promo => promo.code.toUpperCase() === code.toUpperCase());
};

export interface ValidationResult {
  valid: boolean;
  discountValue: number;
  discountType: 'PERCENTAGE' | 'FIXED' | null;
  message: string;
  formattedDiscount: string; // np. "-15%" lub "-500 PLN"
}

export const validatePromoCode = (code: string, currentTotal: number = 0): ValidationResult => {
  const promo = getPromoCode(code);
  
  // 1. Czy kod istnieje?
  if (!promo) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: 'Kod nie istnieje.', 
      formattedDiscount: '' 
    };
  }
  
  // 2. Czy jest aktywny?
  if (!promo.isActive) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: 'Ten kod jest nieaktywny.', 
      formattedDiscount: '' 
    };
  }
  
  // 3. Czy wygasł czasowo?
  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: 'Kod wygasł.', 
      formattedDiscount: '' 
    };
  }
  
  // 4. Czy wyczerpano limit użyć?
  if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: 'Limit użyć tego kodu został wyczerpany.', 
      formattedDiscount: '' 
    };
  }

  // 5. Czy spełniono minimalną kwotę zamówienia?
  if (promo.minPurchaseAmount && currentTotal < promo.minPurchaseAmount) {
    return { 
      valid: false, 
      discountValue: 0, 
      discountType: null, 
      message: `Kod wymaga zamówienia za min. ${promo.minPurchaseAmount} PLN.`, 
      formattedDiscount: '' 
    };
  }
  
  // SUKCES
  const formattedDiscount = promo.discountType === 'PERCENTAGE' 
    ? `-${promo.value}%` 
    : `-${promo.value} PLN`;

  return { 
    valid: true, 
    discountValue: promo.value, 
    discountType: promo.discountType,
    message: promo.description,
    formattedDiscount
  };
};
