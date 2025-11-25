import { NextResponse } from 'next/server';
import { migrateFromFile } from '@/lib/promoKV';
import { promoCodes } from '@/data/promoCodes';

export async function GET() {
  try {
    await migrateFromFile(promoCodes);
    
    return NextResponse.json({
      success: true,
      message: `Migrated ${promoCodes.length} promo codes to KV`,
      count: promoCodes.length,
    });
  } catch (error) {
    console.error('Error migrating promo codes:', error);
    return NextResponse.json(
      { error: 'Failed to migrate promo codes' },
      { status: 500 }
    );
  }
}
