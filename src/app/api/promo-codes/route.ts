import { NextRequest, NextResponse } from 'next/server';
import {
  listPromoCodes,
  addPromoCode,
  deletePromoCode,
  togglePromoCode,
  getPromoStats,
} from '@/lib/promoKV';
import { PromoCode } from '@/types/promo';

// GET /api/promo-codes
export async function GET() {
  try {
    const codes = await listPromoCodes();
    const stats = await getPromoStats();
    
    return NextResponse.json({
      codes,
      stats,
    });
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch promo codes' },
      { status: 500 }
    );
  }
}

// POST /api/promo-codes
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.code || !data.discount || !data.discountType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const promoCode: PromoCode = {
      code: data.code.toUpperCase(),
      discount: Number(data.discount),
      discountType: data.discountType,
      isActive: data.isActive !== false,
      createdAt: new Date().toISOString(),
      usedCount: 0,
      description: data.description || '',
      expiresAt: data.expiresAt,
      minPurchaseAmount: data.minPurchaseAmount,
      maxDiscount: data.maxDiscount,
      usageLimit: data.usageLimit,
    };
    
    await addPromoCode(promoCode);
    
    return NextResponse.json({
      success: true,
      code: promoCode,
    });
  } catch (error) {
    console.error('Error adding promo code:', error);
    return NextResponse.json(
      { error: 'Failed to add promo code' },
      { status: 500 }
    );
  }
}

// DELETE /api/promo-codes
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.json(
        { error: 'Code parameter required' },
        { status: 400 }
      );
    }
    
    await deletePromoCode(code);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting promo code:', error);
    return NextResponse.json(
      { error: 'Failed to delete promo code' },
      { status: 500 }
    );
  }
}

// PATCH /api/promo-codes
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    if (!code) {
      return NextResponse.json(
        { error: 'Code parameter required' },
        { status: 400 }
      );
    }
    
    const updatedCode = await togglePromoCode(code);
    
    if (!updatedCode) {
      return NextResponse.json(
        { error: 'Code not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      code: updatedCode,
    });
  } catch (error) {
    console.error('Error toggling promo code:', error);
    return NextResponse.json(
      { error: 'Failed to toggle promo code' },
      { status: 500 }
    );
  }
}
