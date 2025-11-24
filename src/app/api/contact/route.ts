import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize lazily to avoid build errors
let resend: Resend | null = null;

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
  }
  return resend;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Walidacja
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Brak wymaganych pól' },
        { status: 400 }
      );
    }

    const emailTo = process.env.EMAIL_TO || 'czesc@lykkreacji.pl';
    const resendClient = getResend();

    // 1. Wyślij powiadomienie do siebie
    await resendClient.emails.send({
      from: 'LykKreacji <czesc@lykkreacji.pl>',
      to: emailTo,
      subject: `Nowe zgłoszenie od ${name}`,
      html: `
        <h2>Nowe zgłoszenie kontaktowe</h2>
        <p><strong>Imię:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Wiadomość:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    // 2. Wyślij potwierdzenie do klienta
    await resendClient.emails.send({
      from: 'LykKreacji <czesc@lykkreacji.pl>',
      to: email,
      subject: 'Dziękujemy za wiadomość - LykKreacji',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Cześć ${name}! 👋</h2>
          
          <p>Dziękujemy za kontakt! Otrzymaliśmy Twoją wiadomość i <strong>odpowiemy w ciągu 2 dni roboczych</strong>.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0891b2;">Twoja wiadomość:</h3>
            <p style="color: #475569;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>W międzyczasie możesz:</p>
          <ul style="color: #475569;">
            <li>Odwiedzić nasze portfolio: <a href="https://lykkreacji.pl/#portfolio">lykkreacji.pl</a></li>
            <li>Skorzystać z kalkulatora ceny: <a href="https://lykkreacji.pl/#kalkulator">Kalkulator</a></li>
            <li>Zadzwonić: <a href="tel:+48790629497">+48 790 629 497</a></li>
          </ul>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #94a3b8; font-size: 14px;">
            Pozdrawiamy,<br>
            <strong>Zespół LykKreacji</strong><br>
            <a href="https://lykkreacji.pl">lykkreacji.pl</a> | czesc@lykkreacji.pl | +48 790 629 497
          </p>
        </div>
      `
    });

    return NextResponse.json({ 
      success: true,
      message: 'Wiadomość wysłana pomyślnie' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Błąd wysyłania wiadomości' },
      { status: 500 }
    );
  }
}
