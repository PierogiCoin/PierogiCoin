import { validatePromoCode } from '@/data/promoCodes';
import { PromoValidationResult } from '@/types/promo';

export async function validatePromo(code: string): Promise<PromoValidationResult> {
  if (!code || code.trim().length === 0) {
    return {
      valid: false,
      message: 'Proszę wpisać kod promocyjny'
    };
  }

  const result = validatePromoCode(code.trim());
  
  return {
    valid: result.valid,
    discount: result.discount,
    message: result.message,
    code: result.valid ? code.toUpperCase() : undefined
  };
}
