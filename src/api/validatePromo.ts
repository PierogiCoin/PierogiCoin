import { PromoValidationResult } from '@/types/promo';

export async function validatePromo(code: string, amount: number = 0): Promise<PromoValidationResult> {
  if (!code || code.trim().length === 0) {
    return {
      valid: false,
      message: 'Proszę wpisać kod promocyjny'
    };
  }

  try {
    const response = await fetch('/api/promo-codes/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code.trim(), amount }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        valid: false,
        message: data.message || data.error || 'Błąd walidacji kodu'
      };
    }

    return {
      valid: data.valid,
      discount: data.discount,
      discountType: data.discountType,
      message: data.message,
      code: code.toUpperCase()
    };
  } catch (error) {
    console.error('Error validating promo code:', error);
    return {
      valid: false,
      message: 'Wystąpił błąd podczas sprawdzania kodu'
    };
  }
}
