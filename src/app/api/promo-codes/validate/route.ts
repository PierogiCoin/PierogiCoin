import { NextRequest, NextResponse } from 'next/server';
import { validatePromoCode, incrementUsage } from '@/lib/promoKV';

// POST /api/promo-codes/validate
export async function POST(request: NextRequest) {
  try {
    const { code, amount } = await request.json();
    
    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }
    
    const result = await validatePromoCode(code);
    
    if (!result.valid || !result.promo) {
      return NextResponse.json({
        valid: false,
        message: result.message,
      });
    }
    
    if (result.promo.minPurchaseAmount && amount < result.promo.minPurchaseAmount) {
      return NextResponse.json({
        valid: false,
        message: `Minimalna wartość zamówienia: ${result.promo.minPurchaseAmount} zł`,
      });
    }
    
    let discountAmount = 0;
    if (result.promo.discountType === 'percentage') {
      discountAmount = (amount * result.promo.discount) / 100;
      
      if (result.promo.maxDiscount && discountAmount > result.promo.maxDiscount) {
        discountAmount = result.promo.maxDiscount;
      }
    } else {
      discountAmount = result.promo.discount;
    }
    
    await incrementUsage(code);
    
    return NextResponse.json({
      valid: true,
      message: result.message,
      discount: result.discount,
      discountType: result.promo.discountType,
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalAmount: Math.round((amount - discountAmount) * 100) / 100,
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}
