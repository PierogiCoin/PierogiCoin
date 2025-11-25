/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/generateOffer/route';

// Mock Google Generative AI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockReturnValue('AI analysis mock response'),
        },
      }),
    }),
  })),
}));

// Mock PDF-lib
jest.mock('pdf-lib', () => ({
  PDFDocument: {
    create: jest.fn().mockResolvedValue({
      addPage: jest.fn().mockReturnValue({
        getSize: jest.fn().mockReturnValue({ width: 595, height: 842 }),
        drawRectangle: jest.fn(),
        drawText: jest.fn(),
        drawLine: jest.fn(),
      }),
      embedFont: jest.fn().mockResolvedValue({
        widthOfTextAtSize: jest.fn().mockReturnValue(100),
      }),
      save: jest.fn().mockResolvedValue(Buffer.from('mock-pdf')),
    }),
  },
  rgb: jest.fn(),
  StandardFonts: {
    Helvetica: 'Helvetica',
    HelveticaBold: 'HelveticaBold',
  },
}));

// Mock Resend
const mockResendSend = jest.fn().mockResolvedValue({ id: 'mock-email-id' });
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockResendSend,
    },
  })),
}));

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'mock-message-id' }),
  }),
}));

describe('GenerateOffer API Route', () => {
  beforeEach(() => {
    mockResendSend.mockClear();
    mockResendSend.mockResolvedValue({ id: 'mock-email-id' });
    process.env.GEMINI_API_KEY = 'test-api-key';
    process.env.RESEND_API_KEY = 'test-resend-key';
    process.env.EMAIL_TO = 'test@example.com';
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_TO;
  });

  describe('Request Validation', () => {
    it('returns 400 when email is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          estimate: { min: 2000, max: 3000 },
          description: 'Test project',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('wymaganych');
    });

    it('returns 400 when estimate is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          description: 'Test project',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('wymaganych');
    });

    it('returns 400 when description is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('wymaganych');
    });

    it('returns 500 when GEMINI_API_KEY is missing', async () => {
      delete process.env.GEMINI_API_KEY;

      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Test project',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('klucza API');
    });

    it('accepts valid request with all required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Valid project description',
          selections: { type: 'landing', design: 'custom', features: [] },
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeLessThan(400);
    });
  });

  describe('Data Format Support', () => {
    it('handles old calculator format with selections', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Landing page project',
          selections: {
            type: 'landing',
            design: 'custom',
            features: ['cms', 'seo'],
            deadline: 'standard',
          },
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeLessThan(400);
    });

    it('handles AI calculator format with analysis', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          description: 'AI analyzed project',
          analysis: {
            estimate: { min: 5000, max: 7000 },
            extracted: {
              type: 'ecommerce',
              design: 'premium',
              features: 'CMS, SEO, Payments',
            },
            aiAnalysis: 'Pre-generated AI analysis text',
          },
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeLessThan(400);
    });

    it('handles features as array', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Project',
          selections: {
            type: 'website',
            design: 'premium',
            features: ['cms', 'seo', 'multilang'],
          },
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeLessThan(400);
    });

    it('handles empty features array', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Simple project',
          selections: {
            type: 'landing',
            design: 'template',
            features: [],
          },
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeLessThan(400);
    });
  });

  describe('Promo Code Support', () => {
    it('accepts promo code parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Project with promo',
          selections: { type: 'landing', design: 'custom', features: [] },
          promoCode: 'SAVE15',
          promoDiscount: 15,
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeLessThan(400);
    });

    it('accepts original and final price', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Project',
          selections: { type: 'landing', design: 'custom', features: [] },
          promoCode: 'DISCOUNT20',
          promoDiscount: 20,
          originalPrice: 2500,
          finalPrice: 2000,
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeLessThan(400);
    });
  });

  describe('Summary Data', () => {
    it('accepts summary array', async () => {
      const summary = [
        { question: 'Typ projektu', answer: 'Landing Page' },
        { question: 'Design', answer: 'Custom' },
        { question: 'Funkcje', answer: 'CMS, SEO' },
      ];

      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Project',
          selections: { type: 'landing', design: 'custom', features: [] },
          summary,
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeLessThan(400);
    });
  });

  describe('Error Handling', () => {
    it('handles AI generation errors gracefully', async () => {
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      
      GoogleGenerativeAI.mockImplementationOnce(() => ({
        getGenerativeModel: jest.fn().mockReturnValue({
          generateContent: jest.fn().mockRejectedValue(new Error('AI service error')),
        }),
      }));

      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Project',
          selections: { type: 'landing', design: 'custom', features: [] },
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('handles email sending errors', async () => {
      mockResendSend.mockRejectedValueOnce(new Error('Email service error'));

      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          estimate: { min: 2000, max: 3000 },
          description: 'Project',
          selections: { type: 'landing', design: 'custom', features: [] },
        }),
      });

      const response = await POST(request);

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('handles malformed JSON gracefully', async () => {
      const request = new NextRequest('http://localhost:3000/api/generateOffer', {
        method: 'POST',
        body: 'invalid json',
      });

      const response = await POST(request);

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('Price Range Validation', () => {
    it('accepts different price ranges', async () => {
      const testCases = [
        { min: 1000, max: 1500 },
        { min: 5000, max: 10000 },
        { min: 15000, max: 25000 },
      ];

      for (const estimate of testCases) {
        const request = new NextRequest('http://localhost:3000/api/generateOffer', {
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            estimate,
            description: 'Project',
            selections: { type: 'landing', design: 'custom', features: [] },
          }),
        });

        const response = await POST(request);
        expect(response.status).toBeLessThan(400);
      }
    });
  });
});
