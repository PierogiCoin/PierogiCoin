/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/liveAnalyze/route';

// Mock Google Generative AI - fixed hoisting issue
jest.mock('@google/generative-ai', () => {
  const mockGenerateContent = jest.fn().mockResolvedValue({
    response: {
      text: jest.fn().mockReturnValue(JSON.stringify({
        estimate: { min: 3000, max: 5000 },
        extracted: {
          type: 'Landing Page',
          design: 'Średni',
          features: 'Formularz, CMS',
        },
        aiAnalysis: 'Projekt wymaga nowoczesnego designu.',
      })),
    },
  });

  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      getGenerativeModel: jest.fn(() => ({
        generateContent: mockGenerateContent,
      })),
    })),
  };
});

describe('LiveAnalyze API Route', () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
  });

  describe('Request Validation', () => {
    it('returns 500 when GEMINI_API_KEY is missing', async () => {
      delete process.env.GEMINI_API_KEY;

      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Test project',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('klucza API');
    });

    it('returns 400 when description is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('wymagany');
    });

    it('returns 400 when description is not a string', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 12345,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('wymagany');
    });

    it('accepts valid description', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Potrzebuję strony dla mojej firmy',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
    });
  });

  describe('Response Processing', () => {
    it('returns parsed JSON response', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Test project',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.estimate).toBeDefined();
      expect(data.extracted).toBeDefined();
      expect(data.aiAnalysis).toBeDefined();
    });

    it('returns estimate with min and max', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Test project',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.estimate.min).toBeDefined();
      expect(data.estimate.max).toBeDefined();
      expect(typeof data.estimate.min).toBe('number');
      expect(typeof data.estimate.max).toBe('number');
    });

    it('returns extracted project details', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Test project',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.extracted.type).toBeDefined();
      expect(data.extracted.design).toBeDefined();
      expect(data.extracted.features).toBeDefined();
    });
  });

  describe('Different Project Types', () => {
    it('handles landing page description', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Potrzebuję prostej strony sprzedażowej dla produktu',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it('handles e-commerce description', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Chcę sklep internetowy z płatnościami i CMS',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
    });

    it('handles vague description', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Strona dla firmy',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
    });
  });

  describe('Response Format', () => {
    it('returns JSON content type', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Test',
        }),
      });

      const response = await POST(request);

      expect(response.headers.get('content-type')).toContain('application/json');
    });

    it('returns 200 status for successful analysis', async () => {
      const request = new NextRequest('http://localhost:3000/api/liveAnalyze', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Test project',
        }),
      });

      const response = await POST(request);

      expect(response.status).toBe(200);
    });
  });
});
