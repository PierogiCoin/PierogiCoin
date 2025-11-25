import { kv } from '@vercel/kv';
import { PromoCode } from '@/types/promo';

const PROMO_PREFIX = 'promo:';
const PROMO_STATS_KEY = 'promo:stats';

/**
 * Add or update a promo code in KV store
 */
export async function addPromoCode(code: PromoCode): Promise<void> {
  const key = `${PROMO_PREFIX}${code.code.toUpperCase()}`;
  
  // Store the promo code
  await kv.set(key, code);
  
  // Set expiry if provided
  if (code.expiresAt) {
    const expiry = Math.floor(new Date(code.expiresAt).getTime() / 1000);
    await kv.expireat(key, expiry);
  }
  
  // Update stats
  await kv.hincrby(PROMO_STATS_KEY, 'totalCodes', 1);
}

/**
 * Get a promo code by code string
 */
export async function getPromoCode(code: string): Promise<PromoCode | null> {
  const key = `${PROMO_PREFIX}${code.toUpperCase()}`;
  const promo = await kv.get<PromoCode>(key);
  
  return promo;
}

/**
 * Get all promo codes
 */
export async function listPromoCodes(): Promise<PromoCode[]> {
  const keys = await kv.keys(`${PROMO_PREFIX}*`);
  
  if (keys.length === 0) return [];
  
  const codes = await Promise.all(
    keys
      .filter(key => key !== PROMO_STATS_KEY)
      .map(key => kv.get<PromoCode>(key))
  );
  
  return codes.filter((code): code is PromoCode => code !== null);
}

/**
 * Delete a promo code
 */
export async function deletePromoCode(code: string): Promise<void> {
  const key = `${PROMO_PREFIX}${code.toUpperCase()}`;
  await kv.del(key);
  
  // Update stats
  await kv.hincrby(PROMO_STATS_KEY, 'totalCodes', -1);
}

/**
 * Toggle promo code active state
 */
export async function togglePromoCode(code: string): Promise<PromoCode | null> {
  const promo = await getPromoCode(code);
  
  if (!promo) return null;
  
  promo.isActive = !promo.isActive;
  await addPromoCode(promo);
  
  return promo;
}

/**
 * Increment usage count
 */
export async function incrementUsage(code: string): Promise<void> {
  const promo = await getPromoCode(code);
  
  if (!promo) return;
  
  promo.usedCount = (promo.usedCount || 0) + 1;
  await addPromoCode(promo);
  
  // Update global stats
  await kv.hincrby(PROMO_STATS_KEY, 'totalUsages', 1);
}

/**
 * Get promo stats
 */
export async function getPromoStats() {
  const stats = await kv.hgetall(PROMO_STATS_KEY);
  return {
    totalCodes: stats?.totalCodes || 0,
    totalUsages: stats?.totalUsages || 0,
  };
}

/**
 * Validate promo code
 */
export async function validatePromoCode(code: string): Promise<{
  valid: boolean;
  discount: number;
  message: string;
  promo?: PromoCode;
}> {
  const promo = await getPromoCode(code);
  
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
    message: `Kod aktywowany! Zniżka ${promo.discount}${promo.discountType === 'percentage' ? '%' : 'zł'}`,
    promo,
  };
}

/**
 * Migrate existing codes from file to KV (one-time operation)
 */
export async function migrateFromFile(codes: PromoCode[]): Promise<void> {
  for (const code of codes) {
    await addPromoCode(code);
  }
}
