import { promoCodes } from '@/data/promoCodes';

describe('PromoCodes Data', () => {
  it('exports an array of promo codes', () => {
    expect(Array.isArray(promoCodes)).toBe(true);
    expect(promoCodes.length).toBeGreaterThan(0);
  });

  it('each promo code has required fields', () => {
    promoCodes.forEach(promo => {
      expect(promo).toHaveProperty('code');
      expect(promo).toHaveProperty('discount');
      expect(promo).toHaveProperty('discountType');
      expect(promo).toHaveProperty('isActive');
      expect(promo).toHaveProperty('createdAt');
      expect(promo).toHaveProperty('usedCount');
      expect(promo).toHaveProperty('description');
    });
  });

  it('discount types are valid', () => {
    promoCodes.forEach(promo => {
      expect(['percentage', 'fixed']).toContain(promo.discountType);
    });
  });

  it('discount values are positive numbers', () => {
    promoCodes.forEach(promo => {
      expect(promo.discount).toBeGreaterThan(0);
      expect(typeof promo.discount).toBe('number');
    });
  });

  it('codes are uppercase strings', () => {
    promoCodes.forEach(promo => {
      expect(typeof promo.code).toBe('string');
      expect(promo.code.length).toBeGreaterThan(0);
    });
  });

  it('usedCount is initialized to 0 or more', () => {
    promoCodes.forEach(promo => {
      expect(promo.usedCount).toBeGreaterThanOrEqual(0);
    });
  });

  it('contains specific expected promo codes', () => {
    const codes = promoCodes.map(p => p.code);
    expect(codes).toContain('KLO15');
    expect(codes).toContain('WELCOME10');
    expect(codes).toContain('BLACKFRIDAY');
  });

  it('active promo codes exist', () => {
    const activePromos = promoCodes.filter(p => p.isActive);
    expect(activePromos.length).toBeGreaterThan(0);
  });

  it('promo codes with expiry dates are formatted correctly', () => {
    const promosWithExpiry = promoCodes.filter(p => p.expiresAt);
    promosWithExpiry.forEach(promo => {
      const date = new Date(promo.expiresAt!);
      expect(date.toString()).not.toBe('Invalid Date');
    });
  });

  it('promo codes with min purchase have valid amounts', () => {
    const promosWithMin = promoCodes.filter(p => p.minPurchaseAmount);
    promosWithMin.forEach(promo => {
      expect(promo.minPurchaseAmount).toBeGreaterThan(0);
    });
  });

  it('promo codes with max discount have valid amounts', () => {
    const promosWithMax = promoCodes.filter(p => p.maxDiscount);
    promosWithMax.forEach(promo => {
      expect(promo.maxDiscount).toBeGreaterThan(0);
    });
  });
});
