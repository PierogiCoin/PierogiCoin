import { 
  savePromoToStorage, 
  getPromoFromStorage, 
  removePromoFromStorage,
  trackPromoUsage 
} from '@/lib/promoStorage';

describe('PromoStorage Library', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('savePromoToStorage', () => {
    it('saves promo code to localStorage', () => {
      savePromoToStorage('SAVE20', 20, 'percentage');
      
      const stored = localStorage.getItem('appliedPromoCode');
      expect(stored).not.toBeNull();
      
      const data = JSON.parse(stored!);
      expect(data.code).toBe('SAVE20');
      expect(data.discount).toBe(20);
      expect(data.discountType).toBe('percentage');
      expect(data.appliedAt).toBeDefined();
    });

    it('saves fixed discount type', () => {
      savePromoToStorage('FIXED100', 100, 'fixed');
      
      const stored = localStorage.getItem('appliedPromoCode');
      const data = JSON.parse(stored!);
      expect(data.discountType).toBe('fixed');
    });

    it('updates timestamp on save', () => {
      const now = new Date().toISOString();
      savePromoToStorage('TEST', 10, 'percentage');
      
      const stored = localStorage.getItem('appliedPromoCode');
      const data = JSON.parse(stored!);
      const savedTime = new Date(data.appliedAt);
      const currentTime = new Date(now);
      
      expect(Math.abs(savedTime.getTime() - currentTime.getTime())).toBeLessThan(1000);
    });
  });

  describe('getPromoFromStorage', () => {
    it('retrieves saved promo code', () => {
      savePromoToStorage('GET20', 20, 'percentage');
      
      const promo = getPromoFromStorage();
      expect(promo).not.toBeNull();
      expect(promo!.code).toBe('GET20');
      expect(promo!.discount).toBe(20);
    });

    it('returns null when no promo exists', () => {
      const promo = getPromoFromStorage();
      expect(promo).toBeNull();
    });

    it('returns null for expired promo code', () => {
      const expiredDate = new Date();
      expiredDate.setHours(expiredDate.getHours() - 25);
      
      const expiredData = {
        code: 'EXPIRED',
        discount: 15,
        discountType: 'percentage' as const,
        appliedAt: expiredDate.toISOString()
      };
      
      localStorage.setItem('appliedPromoCode', JSON.stringify(expiredData));
      
      const promo = getPromoFromStorage();
      expect(promo).toBeNull();
    });

    it('handles invalid JSON gracefully', () => {
      localStorage.setItem('appliedPromoCode', 'invalid-json');
      
      const promo = getPromoFromStorage();
      expect(promo).toBeNull();
    });

    it('keeps valid non-expired promo', () => {
      savePromoToStorage('VALID', 25, 'percentage');
      
      const promo = getPromoFromStorage();
      expect(promo).not.toBeNull();
      expect(promo!.code).toBe('VALID');
    });
  });

  describe('removePromoFromStorage', () => {
    it('removes promo code from localStorage', () => {
      savePromoToStorage('REMOVE', 10, 'percentage');
      expect(localStorage.getItem('appliedPromoCode')).not.toBeNull();
      
      removePromoFromStorage();
      expect(localStorage.getItem('appliedPromoCode')).toBeNull();
    });

    it('handles removal when no promo exists', () => {
      expect(() => removePromoFromStorage()).not.toThrow();
    });
  });

  describe('trackPromoUsage', () => {
    beforeEach(() => {
      (window as any).dataLayer = [];
      jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      delete (window as any).dataLayer;
      jest.restoreAllMocks();
    });

    it('pushes event to dataLayer', () => {
      trackPromoUsage('TRACK20', 200, 1000);
      
      expect((window as any).dataLayer).toHaveLength(1);
      expect((window as any).dataLayer[0]).toEqual({
        event: 'promo_code_applied',
        promo_code: 'TRACK20',
        discount_value: 200,
        order_value: 1000
      });
    });

    it('logs to console', () => {
      trackPromoUsage('LOG10', 100, 1000);
      
      expect(console.log).toHaveBeenCalledWith(
        'Promo code used:',
        { code: 'LOG10', discount: 100, orderValue: 1000 }
      );
    });

    it('handles missing dataLayer gracefully', () => {
      delete (window as any).dataLayer;
      
      expect(() => trackPromoUsage('TEST', 50, 500)).not.toThrow();
    });
  });
});
