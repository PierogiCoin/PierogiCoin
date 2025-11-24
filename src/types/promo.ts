export type DiscountType = 'percentage' | 'fixed';

export interface PromoCode {
  code: string;
  discount: number; // procent zniżki (np. 15) lub stała kwota (np. 50)
  discountType: DiscountType; // 'percentage' lub 'fixed'
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
  usageLimit?: number;
  usedCount: number;
  description?: string;
  minPurchaseAmount?: number; // minimalna kwota zakupu
  maxDiscount?: number; // maksymalna zniżka (dla percentage)
  categories?: string[]; // kategorie produktów
}

export interface PromoValidationResult {
  valid: boolean;
  discount?: number;
  discountType?: DiscountType;
  message: string;
  code?: string;
}
