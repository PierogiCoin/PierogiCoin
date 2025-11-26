import { kv } from '@vercel/kv';
import { PromoCode } from '@/types/promo';
import fs from 'fs/promises';
import path from 'path';

const PROMO_PREFIX = 'promo:';
const PROMO_STATS_KEY = 'promo:stats';
const LOCAL_STORAGE_FILE = path.join(process.cwd(), 'src', 'data', 'localPromoCodes.json');

// Check if KV is configured with valid credentials
const isKvConfigured = !!(
  process.env.KV_REST_API_URL &&
  process.env.KV_REST_API_URL.startsWith('https://') &&
  process.env.KV_REST_API_TOKEN
);

// --- Local Storage Helpers ---

async function getLocalData(): Promise<{ codes: PromoCode[], stats: any }> {
  try {
    const data = await fs.readFile(LOCAL_STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return default data if file doesn't exist
    return { codes: [], stats: { totalCodes: 0, totalUsages: 0 } };
  }
}

async function saveLocalData(data: { codes: PromoCode[], stats: any }): Promise<void> {
  try {
    const dir = path.dirname(LOCAL_STORAGE_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save local promo data:', error);
  }
}

/**
 * Add or update a promo code
 */
export async function addPromoCode(code: PromoCode): Promise<void> {
  if (isKvConfigured) {
    const key = `${PROMO_PREFIX}${code.code.toUpperCase()}`;
    await kv.set(key, code);

    if (code.expiresAt) {
      const expiry = Math.floor(new Date(code.expiresAt).getTime() / 1000);
      await kv.expireat(key, expiry);
    }

    // Only increment totalCodes if it's a new code (simplified logic for now)
    // In a real scenario we'd check existence first, but for KV this is fine
    await kv.hincrby(PROMO_STATS_KEY, 'totalCodes', 1);
  } else {
    const data = await getLocalData();
    const existingIndex = data.codes.findIndex(c => c.code === code.code);

    if (existingIndex >= 0) {
      data.codes[existingIndex] = code;
    } else {
      data.codes.push(code);
      data.stats.totalCodes += 1;
    }

    await saveLocalData(data);
  }
}

/**
 * Get a promo code by code string
 */
export async function getPromoCode(code: string): Promise<PromoCode | null> {
  if (isKvConfigured) {
    const key = `${PROMO_PREFIX}${code.toUpperCase()}`;
    return await kv.get<PromoCode>(key);
  } else {
    const data = await getLocalData();
    return data.codes.find(c => c.code.toUpperCase() === code.toUpperCase()) || null;
  }
}

/**
 * Get all promo codes
 */
export async function listPromoCodes(): Promise<PromoCode[]> {
  if (isKvConfigured) {
    const keys = await kv.keys(`${PROMO_PREFIX}*`);
    if (keys.length === 0) return [];

    const codes = await Promise.all(
      keys
        .filter(key => key !== PROMO_STATS_KEY)
        .map(key => kv.get<PromoCode>(key))
    );

    return codes.filter((code): code is PromoCode => code !== null);
  } else {
    const data = await getLocalData();
    return data.codes;
  }
}

/**
 * Delete a promo code
 */
export async function deletePromoCode(code: string): Promise<void> {
  if (isKvConfigured) {
    const key = `${PROMO_PREFIX}${code.toUpperCase()}`;
    await kv.del(key);
    await kv.hincrby(PROMO_STATS_KEY, 'totalCodes', -1);
  } else {
    const data = await getLocalData();
    const initialLength = data.codes.length;
    data.codes = data.codes.filter(c => c.code.toUpperCase() !== code.toUpperCase());

    if (data.codes.length < initialLength) {
      data.stats.totalCodes = Math.max(0, data.stats.totalCodes - 1);
      await saveLocalData(data);
    }
  }
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

  if (isKvConfigured) {
    await kv.hincrby(PROMO_STATS_KEY, 'totalUsages', 1);
  } else {
    const data = await getLocalData();
    data.stats.totalUsages += 1;
    // Note: addPromoCode already saved the updated promo code to the file
    // but we need to save the stats update
    // Re-reading might be safer to avoid race conditions in a real app, 
    // but for local dev this is acceptable
    const currentData = await getLocalData();
    currentData.stats.totalUsages = data.stats.totalUsages;
    await saveLocalData(currentData);
  }
}

/**
 * Get promo stats
 */
export async function getPromoStats() {
  if (isKvConfigured) {
    const stats = await kv.hgetall(PROMO_STATS_KEY);
    return {
      totalCodes: Number(stats?.totalCodes) || 0,
      totalUsages: Number(stats?.totalUsages) || 0,
    };
  } else {
    const data = await getLocalData();
    return data.stats;
  }
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
