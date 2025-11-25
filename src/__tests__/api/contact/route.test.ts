/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/contact/route';

// Mock Resend
const mockSend = jest.fn().mockResolvedValue({ id: 'mock-email-id' });

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mockSend,
      },
    })),
  };
});

describe('Contact API Route', () => {
  beforeEach(() => {
    mockSend.mockClear();
    process.env.RESEND_API_KEY = 'test-api-key';
    process.env.EMAIL_TO = 'test@example.com';
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_TO;
  });

  describe('POST /api/contact', () => {
    it('returns 400 when name is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@example.com',
          message: 'Test message',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Brak wymaganych pól');
    });

    it('returns 400 when email is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test User',
          message: 'Test message',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Brak wymaganych pól');
    });

    it('returns 400 when message is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Brak wymaganych pól');
    });

    it('returns 200 with success message for valid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jan Kowalski',
          email: 'jan@example.com',
          message: 'Chcę wycenę strony',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Wiadomość wysłana pomyślnie');
    });

    it('accepts optional phone field', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jan Kowalski',
          email: 'jan@example.com',
          phone: '+48 123 456 789',
          message: 'Chcę wycenę strony',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('sends notification email to admin', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jan Kowalski',
          email: 'jan@example.com',
          message: 'Test message',
        }),
      });

      await POST(request);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Nowe zgłoszenie od Jan Kowalski',
        })
      );
    });

    it('sends confirmation email to user', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jan Kowalski',
          email: 'jan@example.com',
          message: 'Test message',
        }),
      });

      await POST(request);

      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'jan@example.com',
          subject: 'Dziękujemy za wiadomość - LykKreacji',
        })
      );
    });

    it('includes phone in admin email when provided', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jan Kowalski',
          email: 'jan@example.com',
          phone: '+48 123 456 789',
          message: 'Test message',
        }),
      });

      await POST(request);

      const adminEmailCall = mockSend.mock.calls[0][0];
      expect(adminEmailCall.html).toContain('+48 123 456 789');
    });

    it('handles newlines in message properly', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jan Kowalski',
          email: 'jan@example.com',
          message: 'Line 1\nLine 2\nLine 3',
        }),
      });

      await POST(request);

      const adminEmailCall = mockSend.mock.calls[0][0];
      expect(adminEmailCall.html).toContain('<br>');
    });

    it('sends exactly 2 emails (admin + user)', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jan Kowalski',
          email: 'jan@example.com',
          message: 'Test message',
        }),
      });

      await POST(request);

      expect(mockSend).toHaveBeenCalledTimes(2);
    });

    it('includes user message in confirmation email', async () => {
      const userMessage = 'To jest moja testowa wiadomość';
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jan Kowalski',
          email: 'jan@example.com',
          message: userMessage,
        }),
      });

      await POST(request);

      const confirmationEmailCall = mockSend.mock.calls[1][0];
      expect(confirmationEmailCall.html).toContain(userMessage);
    });
  });
});
