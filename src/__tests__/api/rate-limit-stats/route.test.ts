/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { GET } from '@/app/api/rate-limit-stats/route';

// Mock rateLimitMonitor
jest.mock('@/lib/rateLimitMonitor', () => ({
  rateLimitMonitor: {
    getStats: jest.fn().mockReturnValue({
      totalAttempts: 100,
      blockedAttempts: 5,
      uniqueIPs: 20,
    }),
    getRecentAttempts: jest.fn().mockReturnValue([
      { ip: '127.0.0.1', timestamp: Date.now(), blocked: false },
      { ip: '192.168.1.1', timestamp: Date.now(), blocked: true },
    ]),
  },
}));

describe('RateLimitStats API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ADMIN_SECRET = 'test-secret';
  });

  afterEach(() => {
    delete process.env.ADMIN_SECRET;
  });

  describe('Authentication', () => {
    it('returns 401 without secret', async () => {
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('returns 401 with wrong secret', async () => {
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=wrong');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('returns 200 with correct secret', async () => {
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=test-secret');
      const response = await GET(request);

      expect(response.status).toBe(200);
    });
  });

  describe('Stats Retrieval', () => {
    it('returns stats and recent attempts', async () => {
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=test-secret');
      const response = await GET(request);
      const data = await response.json();

      expect(data.stats).toBeDefined();
      expect(data.recentAttempts).toBeDefined();
    });

    it('uses default minutes parameter', async () => {
      const { rateLimitMonitor } = require('@/lib/rateLimitMonitor');
      
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=test-secret');
      await GET(request);

      expect(rateLimitMonitor.getStats).toHaveBeenCalledWith(5);
    });

    it('accepts custom minutes parameter', async () => {
      const { rateLimitMonitor } = require('@/lib/rateLimitMonitor');
      
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=test-secret&minutes=10');
      await GET(request);

      expect(rateLimitMonitor.getStats).toHaveBeenCalledWith(10);
    });

    it('limits recent attempts to 20', async () => {
      const { rateLimitMonitor } = require('@/lib/rateLimitMonitor');
      
      // Mock 50 attempts
      const manyAttempts = Array(50).fill(null).map((_, i) => ({
        ip: `192.168.1.${i}`,
        timestamp: Date.now(),
        blocked: false,
      }));
      rateLimitMonitor.getRecentAttempts.mockReturnValue(manyAttempts);

      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=test-secret');
      const response = await GET(request);
      const data = await response.json();

      expect(data.recentAttempts.length).toBeLessThanOrEqual(20);
    });
  });

  describe('Response Format', () => {
    it('returns JSON content type', async () => {
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=test-secret');
      const response = await GET(request);

      expect(response.headers.get('content-type')).toContain('application/json');
    });

    it('includes stats object', async () => {
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=test-secret');
      const response = await GET(request);
      const data = await response.json();

      expect(typeof data.stats).toBe('object');
    });

    it('includes recentAttempts array', async () => {
      const request = new NextRequest('http://localhost:3000/api/rate-limit-stats?secret=test-secret');
      const response = await GET(request);
      const data = await response.json();

      expect(Array.isArray(data.recentAttempts)).toBe(true);
    });
  });
});
