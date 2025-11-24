import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

// Funkcja do normalizacji polskich znaków dla PDF (StandardFonts nie obsługują UTF-8)
const normalizePolishChars = (text: string): string => {
    const polishMap: Record<string, string> = {
        'ą': 'a', 'Ą': 'A',
        'ć': 'c', 'Ć': 'C',
        'ę': 'e', 'Ę': 'E',
        'ł': 'l', 'Ł': 'L',
        'ń': 'n', 'Ń': 'N',
        'ó': 'o', 'Ó': 'O',
        'ś': 's', 'Ś': 'S',
        'ź': 'z', 'Ź': 'Z',
        'ż': 'z', 'Ż': 'Z'
    };
    
    // Usuń znaki nowej linii i nadmiarowe spacje, potem zamień polskie znaki
    return text
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (char) => polishMap[char] || char);
};

// Pomocnicza funkcja do zawijania tekstu w PDF
const wrapText = (text: string, font: any, size: number, maxWidth: number) => {
    // Usuń znaki nowej linii i nadmiarowe spacje
    const cleanText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const words = cleanText.split(' ');
    const lines: string[] = [];
    let currentLine = words[0] || '';
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = font.widthOfTextAtSize(currentLine + ' ' + word, size);
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
};

export async function POST(request: NextRequest) {
  console.log("[API] generateOffer called");
  try {
    const body = await request.json();
    console.log("[API] Body:", JSON.stringify(body).substring(0, 200));
    
    // Obsługa dwóch formatów danych - ze starego i nowego kalkulatora
    let email, estimate, description, extracted, aiAnalysisFromRequest;
    
    if (body.analysis) {
      // Format z AiCalculator
      email = body.email;
      description = body.description;
      estimate = body.analysis.estimate;
      extracted = body.analysis.extracted;
      aiAnalysisFromRequest = body.analysis.aiAnalysis;
    } else {
      // Format ze starego Calculator
      email = body.email;
      estimate = body.estimate;
      description = body.description;
      const featuresArray = body.selections?.features || [];
      const featuresString = Array.isArray(featuresArray) ? featuresArray.join(', ') : featuresArray;
      extracted = { type: body.selections?.type, design: body.selections?.design, features: featuresString };
    }

    if (!email || !estimate || !description) {
      return NextResponse.json({ error: "Brak wszystkich wymaganych danych." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Brak klucza API po stronie serwera." }, { status: 500 });
    }
    
    // Użyj analizy AI z requesta lub wygeneruj nową
    let aiAnalysis = aiAnalysisFromRequest;
    
    if (!aiAnalysis) {
      // Inicjalizacja klienta AI tylko jeśli potrzebujemy wygenerować analizę
      const genAI = new GoogleGenerativeAI(apiKey); 
      
      const prompt = `Jesteś ekspertem web developmentu. Na podstawie poniższych danych, stwórz krótką (max 150 słów) analizę i rekomendację dla klienta. Skup się na korzyściach.
        Opis: ${description}, Wycena: ${estimate.min}-${estimate.max} PLN, Typ: ${extracted.type}, Design: ${extracted.design}, Funkcje: ${extracted.features}.`;
        
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const aiResult = await model.generateContent(prompt);
      aiAnalysis = aiResult.response.text();
    } 
    
    // --- Tworzenie dokumentu PDF ---
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const { width, height } = page.getSize();
    const margin = 50;
    const contentWidth = width - 2 * margin; 
    let y = height - margin;

    // === HEADER Z GRADIENTEM (symulacja) ===
    page.drawRectangle({
        x: 0,
        y: height - 120,
        width: width,
        height: 120,
        color: rgb(0.02, 0.44, 0.82), // #0670D1
        opacity: 0.1,
    });

    // Logo/Tytuł
    page.drawText(normalizePolishChars("WSTEPNA OFERTA"), { 
        x: margin, 
        y: y, 
        size: 28, 
        font: boldFont, 
        color: rgb(0.02, 0.44, 0.82) 
    });
    y -= 35;
    
    page.drawText("LykKreacji", { 
        x: margin, 
        y: y, 
        size: 16, 
        font: boldFont, 
        color: rgb(0.4, 0.4, 0.4) 
    });
    y -= 50;

    // Linia oddzielająca
    page.drawLine({
        start: { x: margin, y: y },
        end: { x: width - margin, y: y },
        thickness: 2,
        color: rgb(0.02, 0.44, 0.82),
        opacity: 0.3,
    });
    y -= 30;

    // Info box
    const boxY = y;
    page.drawRectangle({
        x: margin - 10,
        y: boxY - 45,
        width: contentWidth + 20,
        height: 75,
        borderColor: rgb(0.9, 0.9, 0.9),
        borderWidth: 1,
        color: rgb(0.98, 0.98, 0.98),
    });

    page.drawText(normalizePolishChars(`Dla: ${email}`), { 
        x: margin, 
        y: y, 
        size: 11, 
        font, 
        color: rgb(0.2, 0.2, 0.2) 
    });
    y -= 18;
    
    page.drawText(normalizePolishChars(`Data: ${new Date().toLocaleDateString('pl-PL')}`), { 
        x: margin, 
        y: y, 
        size: 11, 
        font, 
        color: rgb(0.2, 0.2, 0.2) 
    });
    y -= 18;
    
    page.drawText(normalizePolishChars(`Nr oferty: PDF-${Date.now().toString().slice(-6)}`), { 
        x: margin, 
        y: y, 
        size: 11, 
        font, 
        color: rgb(0.2, 0.2, 0.2) 
    });
    y -= 40;

    // === CENA - GŁÓWNY HIGHLIGHT ===
    const priceBoxY = y;
    page.drawRectangle({
        x: margin - 10,
        y: priceBoxY - 60,
        width: contentWidth + 20,
        height: 85,
        color: rgb(0.02, 0.44, 0.82),
        opacity: 0.05,
        borderColor: rgb(0.02, 0.44, 0.82),
        borderWidth: 2,
    });

    page.drawText(normalizePolishChars("Szacowana wartosc:"), { 
        x: margin, 
        y: y, 
        size: 12, 
        font: boldFont, 
        color: rgb(0.4, 0.4, 0.4) 
    });
    y -= 30;

    const priceText = estimate.min === estimate.max 
        ? `${estimate.min.toLocaleString('pl-PL')} PLN` 
        : `${estimate.min.toLocaleString('pl-PL')} - ${estimate.max.toLocaleString('pl-PL')} PLN`;
    
    page.drawText(priceText, { 
        x: margin, 
        y: y, 
        size: 24, 
        font: boldFont, 
        color: rgb(0.02, 0.44, 0.82) 
    });
    y -= 15;
    
    page.drawText("(netto)", { 
        x: margin, 
        y: y, 
        size: 10, 
        font, 
        color: rgb(0.5, 0.5, 0.5) 
    });
    y -= 45;

    // === SZCZEGÓŁY PROJEKTU ===
    if (body.summary || extracted) {
        page.drawText(normalizePolishChars("Szczegoly projektu"), { 
            x: margin, 
            y: y, 
            size: 16, 
            font: boldFont, 
            color: rgb(0.1, 0.1, 0.1) 
        });
        y -= 25;

        if (body.summary) {
            body.summary.forEach((item: any) => {
                if (y < margin + 100) {
                    page = pdfDoc.addPage([595, 842]);
                    y = height - margin;
                }
                
                // Bullet point
                page.drawCircle({
                    x: margin + 5,
                    y: y - 3,
                    size: 2,
                    color: rgb(0.02, 0.44, 0.82),
                });
                
                page.drawText(normalizePolishChars(`${item.question}:`), { 
                    x: margin + 15, 
                    y: y, 
                    size: 10, 
                    font: boldFont, 
                    color: rgb(0.3, 0.3, 0.3) 
                });
                y -= 15;
                
                const answerLines = wrapText(normalizePolishChars(item.answer), font, 10, contentWidth - 20);
                answerLines.forEach(line => {
                    page.drawText(line, { 
                        x: margin + 15, 
                        y: y, 
                        size: 10, 
                        font, 
                        color: rgb(0.2, 0.2, 0.2) 
                    });
                    y -= 14;
                });
                y -= 5;
            });
        } else if (extracted) {
            const details = [
                { label: 'Typ strony', value: extracted.type },
                { label: 'Design', value: extracted.design },
                { label: 'Funkcje', value: extracted.features },
            ];
            
            details.forEach(detail => {
                if (y < margin + 100) {
                    page = pdfDoc.addPage([595, 842]);
                    y = height - margin;
                }
                
                page.drawCircle({
                    x: margin + 5,
                    y: y - 3,
                    size: 2,
                    color: rgb(0.02, 0.44, 0.82),
                });
                
                page.drawText(normalizePolishChars(`${detail.label}: ${detail.value}`), { 
                    x: margin + 15, 
                    y: y, 
                    size: 10, 
                    font, 
                    color: rgb(0.2, 0.2, 0.2) 
                });
                y -= 18;
            });
        }
        
        y -= 20;
    }

    // === ANALIZA AI ===
    if (aiAnalysis) {
        if (y < margin + 150) {
            page = pdfDoc.addPage([595, 842]);
            y = height - margin;
        }

        page.drawRectangle({
            x: margin - 10,
            y: y - 15,
            width: contentWidth + 20,
            height: 25,
            color: rgb(1, 0.85, 0.4),
            opacity: 0.2,
        });

        page.drawText(normalizePolishChars("Rekomendacja eksperta"), { 
            x: margin, 
            y: y, 
            size: 14, 
            font: boldFont, 
            color: rgb(0.8, 0.5, 0) 
        });
        y -= 30;

        const aiLines = wrapText(normalizePolishChars(aiAnalysis), font, 10, contentWidth);
        aiLines.forEach(line => {
            if (y < margin + 50) {
                page = pdfDoc.addPage([595, 842]);
                y = height - margin;
            }
            page.drawText(line, { 
                x: margin, 
                y: y, 
                size: 10, 
                font, 
                color: rgb(0.2, 0.2, 0.2) 
            });
            y -= 14;
        });
        
        y -= 20;
    }

    // === OPIS PROJEKTU ===
    if (description && description.length > 10) {
        if (y < margin + 100) {
            page = pdfDoc.addPage([595, 842]);
            y = height - margin;
        }

        page.drawText(normalizePolishChars("Opis projektu od klienta"), { 
            x: margin, 
            y: y, 
            size: 14, 
            font: boldFont, 
            color: rgb(0.1, 0.1, 0.1) 
        });
        y -= 25;

        const descLines = wrapText(normalizePolishChars(description), font, 9, contentWidth);
        descLines.forEach(line => {
            if (y < margin + 50) {
                page = pdfDoc.addPage([595, 842]);
                y = height - margin;
            }
            page.drawText(line, { 
                x: margin, 
                y: y, 
                size: 9, 
                font, 
                color: rgb(0.4, 0.4, 0.4) 
            });
            y -= 13;
        });
    }

    // === FOOTER ===
    const footerY = 60;
    page.drawLine({
        start: { x: margin, y: footerY + 20 },
        end: { x: width - margin, y: footerY + 20 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
    });
    
    page.drawText("LykKreacji.pl | czesc@lykkreacji.pl | +48 790 629 497", { 
        x: margin, 
        y: footerY, 
        size: 8, 
        font, 
        color: rgb(0.5, 0.5, 0.5) 
    });
    
    page.drawText(`Strona ${pdfDoc.getPages().length}`, { 
        x: width - margin - 50, 
        y: footerY, 
        size: 8, 
        font, 
        color: rgb(0.5, 0.5, 0.5) 
    });

    const pdfBytes = await pdfDoc.save();
    
    // --- Wysyłka E-maili (Resend lub Gmail fallback) ---
    const useResend = !!process.env.RESEND_API_KEY;
    const useGmail = !useResend && process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD;
    
    if (!useResend && !useGmail) {
        console.error("[API] Missing email configuration. Need either RESEND_API_KEY or EMAIL_SERVER_USER+PASSWORD");
        return NextResponse.json({ 
            error: "Brak konfiguracji email. Dodaj RESEND_API_KEY lub EMAIL_SERVER_USER + EMAIL_SERVER_PASSWORD do .env.local" 
        }, { status: 500 });
    }

    console.log(`[API] Using email provider: ${useResend ? 'Resend' : 'Gmail'}`);
    
    let resend: Resend | null = null;
    let gmailTransporter: any = null;
    
    if (useResend) {
        resend = new Resend(process.env.RESEND_API_KEY);
    } else if (useGmail) {
        gmailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });
    }
    
    try {
        const clientEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #0670D1;">Cześć!</h1>
                <p>Dziękuję za zainteresowanie. W załączniku znajdziesz wstępną, spersonalizowaną ofertę dla Twojego projektu.</p>
                
                <div style="border-left: 4px solid #0670D1; padding-left: 15px; margin: 20px 0; background-color: #f7f9fc; padding: 15px; border-radius: 4px;">
                    <strong style="color: #0670D1;">💡 Rekomendacja AI:</strong>
                    <p style="margin: 10px 0;">${aiAnalysis}</p>
                </div>
                
                <p><strong>Szacowana wycena:</strong> ${estimate.min} - ${estimate.max} PLN</p>
                
                <p style="margin-top: 20px;">Wkrótce skontaktuję się osobiście, aby omówić szczegóły.</p>
                
                <p style="margin-top: 30px;">Pozdrawiam,<br><strong>Arkadiusz</strong><br>LykKreacji</p>
                
                <hr style="margin-top: 30px; border: none; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 12px; color: #666;">
                    LykKreacji.pl | czesc@lykkreacji.pl | +48 790 629 497
                </p>
            </div>
        `;
        
        const ownerEmailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #0670D1; border-bottom: 3px solid #0670D1; padding-bottom: 10px;">
                    🎯 Nowe zapytanie z kalkulatora!
                </h2>
                
                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>📧 Email klienta:</strong> ${email}</p>
                    <p><strong>💰 Wycena:</strong> ${estimate.min} - ${estimate.max} PLN</p>
                    
                    ${body.summary ? `
                    <h3 style="color: #333; border-left: 4px solid #0670D1; padding-left: 10px;">Podsumowanie:</h3>
                    <ul style="line-height: 1.8;">
                        ${body.summary.map((item: any) => `<li><strong>${item.question.replace("?", "")}:</strong> ${item.answer}</li>`).join('')}
                    </ul>
                    ` : extracted ? `
                    <h3 style="color: #333; border-left: 4px solid #0670D1; padding-left: 10px;">Szczegóły:</h3>
                    <ul style="line-height: 1.8;">
                        <li><strong>Typ:</strong> ${extracted.type}</li>
                        <li><strong>Design:</strong> ${extracted.design}</li>
                        <li><strong>Funkcje:</strong> ${extracted.features}</li>
                    </ul>
                    ` : ''}
                    
                    <h3 style="color: #333; border-left: 4px solid #0670D1; padding-left: 10px; margin-top: 20px;">Opis projektu:</h3>
                    <p style="background: #f7f9fc; padding: 15px; border-radius: 4px;">${description}</p>
                    
                    <h3 style="color: #333; border-left: 4px solid #FFD966; padding-left: 10px; margin-top: 20px;">💡 Analiza AI:</h3>
                    <p style="background: #fffef5; padding: 15px; border-radius: 4px; border-left: 4px solid #FFD966;">${aiAnalysis}</p>
                </div>
                
                <p style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
                    Automatyczne powiadomienie z LykKreacji
                </p>
            </div>
        `;
        
        // Wysyłka przez Resend
        if (useResend && resend) {
            const clientEmail = await resend.emails.send({
                from: 'Arkadiusz z LykKreacji <onboarding@resend.dev>',
                to: email,
                subject: 'Twoja wstępna oferta i analiza projektu | LykKreacji',
                html: clientEmailHtml,
                attachments: [
                    {
                        filename: 'Oferta-LykKreacji.pdf',
                        content: Buffer.from(pdfBytes),
                    }
                ],
            });

            console.log("[API] Client email sent (Resend):", clientEmail.data?.id);

            const ownerEmail = await resend.emails.send({
                from: 'Nowy Lead | Kalkulator <onboarding@resend.dev>',
                to: process.env.EMAIL_TO || 'your-email@example.com',
                subject: `🎯 Nowy lead ze strony: ${email}`,
                html: ownerEmailHtml,
            });

            console.log("[API] Owner email sent (Resend):", ownerEmail.data?.id);
        }
        
        // Wysyłka przez Gmail (fallback)
        else if (useGmail && gmailTransporter) {
            await Promise.all([
                gmailTransporter.sendMail({
                    from: `"Arkadiusz z LykKreacji" <${process.env.EMAIL_SERVER_USER}>`,
                    to: email,
                    subject: 'Twoja wstępna oferta i analiza projektu | LykKreacji',
                    html: clientEmailHtml,
                    attachments: [{ 
                        filename: 'Oferta-LykKreacji.pdf', 
                        content: Buffer.from(pdfBytes), 
                        contentType: 'application/pdf' 
                    }],
                }),
                gmailTransporter.sendMail({
                    from: `"Nowy Lead | Kalkulator" <${process.env.EMAIL_SERVER_USER}>`,
                    to: process.env.EMAIL_TO || process.env.EMAIL_SERVER_USER,
                    subject: `🎯 Nowy lead ze strony: ${email}`,
                    html: ownerEmailHtml,
                })
            ]);
            
            console.log("[API] Emails sent (Gmail)");
        }

    } catch (emailError) {
        console.error("[API] Resend error:", emailError);
        return NextResponse.json({ 
            error: "Nie udało się wysłać emaila.",
            details: emailError instanceof Error ? emailError.message : "Unknown error"
        }, { status: 500 });
    }

    // Poprawka błędu Syntax Error: Ukończenie ciągu znaków.
    return NextResponse.json({ message: "Oferta została pomyślnie wysłana na Twój adres e-mail. Sprawdź swoją skrzynkę (również folder spam)!" });

  } catch (error) {
    console.error("[API] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "";
    console.error("[API] Error details:", errorMessage, errorStack);
    return NextResponse.json({ 
      error: "Wystąpił wewnętrzny błąd serwera.",
      details: errorMessage 
    }, { status: 500 });
  }
}