import { cn, formatPrice, absoluteUrl } from '@/lib/utils';

describe('Utils Library', () => {
  describe('cn function', () => {
    it('merges class names', () => {
      const result = cn('p-4', 'text-white', 'bg-blue-500');
      expect(result).toContain('p-4');
      expect(result).toContain('text-white');
      expect(result).toContain('bg-blue-500');
    });

    it('handles conditional classes', () => {
      const result = cn('base-class', { 'active': true, 'disabled': false });
      expect(result).toContain('base-class');
      expect(result).toContain('active');
      expect(result).not.toContain('disabled');
    });

    it('resolves tailwind conflicts', () => {
      const result = cn('p-2', 'p-4');
      expect(result).toContain('p-4');
      expect(result).not.toContain('p-2');
    });

    it('handles empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('handles arrays of classes', () => {
      const result = cn(['text-sm', 'font-bold'], 'text-blue-500');
      expect(result).toContain('text-sm');
      expect(result).toContain('font-bold');
      expect(result).toContain('text-blue-500');
    });
  });

  describe('formatPrice function', () => {
    it('formats price in PLN', () => {
      const result = formatPrice(1250);
      expect(result).toContain('1');
      expect(result).toContain('250');
      expect(result).toContain('zł');
    });

    it('formats zero price', () => {
      const result = formatPrice(0);
      expect(result).toContain('0');
      expect(result).toContain('zł');
    });

    it('formats decimal prices', () => {
      const result = formatPrice(99.99);
      expect(result).toContain('99');
      expect(result).toContain('zł');
    });

    it('formats large numbers', () => {
      const result = formatPrice(1000000);
      expect(result).toContain('000');
      expect(result).toContain('zł');
    });
  });

  describe('absoluteUrl function', () => {
    const originalEnv = process.env.NEXT_PUBLIC_APP_URL;

    afterEach(() => {
      process.env.NEXT_PUBLIC_APP_URL = originalEnv;
    });

    it('creates absolute URL with custom domain', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';
      const result = absoluteUrl('/portfolio');
      expect(result).toBe('https://example.com/portfolio');
    });

    it('uses localhost as fallback', () => {
      delete process.env.NEXT_PUBLIC_APP_URL;
      const result = absoluteUrl('/about');
      expect(result).toBe('http://localhost:3000/about');
    });

    it('handles root path', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://test.com';
      const result = absoluteUrl('/');
      expect(result).toBe('https://test.com/');
    });

    it('handles paths with query params', () => {
      process.env.NEXT_PUBLIC_APP_URL = 'https://test.com';
      const result = absoluteUrl('/search?q=test');
      expect(result).toBe('https://test.com/search?q=test');
    });
  });
});
