import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { put } from "@vercel/blob";

// Inicjalizacja klienta AI - teraz w bezpieczny sposób
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  console.log("[API] generateOffer called");
  
  try {
    const body = await request.json();
    console.log("[API] Request body:", body);

    // ZMIANA: Dostosowanie do struktury danych wysyłanej z front-endu
    const { email, description, analysis } = body;
    
    // Uproszczone zmienne na potrzeby kodu poniżej:
    const customDescription = description;
    const estimate = analysis?.estimate;
    const extracted = analysis?.extracted;

    if (!analysis || !estimate || !email || !customDescription || !extracted) {
      console.log("[API] Missing required fields in analysis object");
      return NextResponse.json({ error: "Brak wszystkich wymaganych pól analitycznych lub e-maila." }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
        console.error("[API] Missing GEMINI_API_KEY environment variable");
        return NextResponse.json({ error: "Brak konfiguracji klucza API po stronie serwera." }, { status: 500 });
    }

    console.log("[API] Starting AI analysis...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // ZMIANA: Prompt dostosowany do danych z analizy
    const prompt = `
      Jesteś światowej klasy konsultantem ds. strategii cyfrowej. Klient opisał projekt: "${customDescription}".
      Zautomatyzowana analiza wstępna wykazała:
      - Typ strony: ${extracted.type}
      - Styl Designu: ${extracted.design}
      - Kluczowe Funkcje: ${extracted.features}
      
      Wycena: ${estimate.min} - ${estimate.max} PLN.
      
      Wygeneruj krótką (3-4 zdania), profesjonalną analizę w języku polskim. Podaj 2-3 kluczowe wskazówki, aby projekt odniósł sukces, uwzględniając wskazane funkcje i design.
      Bądź zwięzły i brzmij jak ekspert. Nie używaj formatowania markdown.
    `;
    const result = await model.generateContent(prompt);
    const aiAnalysis = result.response.text();
    console.log("[API] AI analysis completed");

    // --- Generowanie PDF ---
    console.log("[API] Generating PDF...");
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = height - 50;
    page.drawText("Spersonalizowana Oferta - LykKreacji", { x: 50, y, font: boldFont, size: 24, color: rgb(0, 0.44, 0.95) });
    y -= 50;
    page.drawText(`Dla: ${email}`, { x: 50, y, font, size: 12, color: rgb(0.2, 0.2, 0.2) });
    y -= 30;
    page.drawText("Podsumowanie Twojego Projektu:", { x: 50, y, font: boldFont, size: 16 });
    y -= 25;
    
    // ZMIANA: Drukowanie danych z obiektu 'extracted'
    const summaryItems = [
      { label: "Typ Strony", value: extracted.type },
      { label: "Design", value: extracted.design },
      { label: "Funkcje", value: extracted.features },
    ];

    summaryItems.forEach((item) => {
      if (y > 50) {
        const text = `${item.label}: ${item.value}`;
        page.drawText(text, { x: 60, y, font, size: 10 });
        y -= 15;
      }
    });
    
    y -= 15;
    page.drawText(`Opis Klienta: ${customDescription.substring(0, 150)}...`, { x: 60, y, font, size: 10, color: rgb(0.4, 0.4, 0.4) });

    y -= 30;
    page.drawText(`Szacowana wycena: ${estimate.min} - ${estimate.max} PLN`, { x: 50, y, font: boldFont, size: 14, color: rgb(0, 0.44, 0.95) });
    y -= 40;
    page.drawText("Analiza AI i Kluczowe Wskazówki:", { x: 50, y, font: boldFont, size: 16 });
    y -= 25;
    
    // Zapewnienie zawijania tekstu dla długich linii AI
    const lines = aiAnalysis.match(/.{1,80}(\s|$)/g) || [];
    lines.forEach((line) => {
      if (y > 50) {
        page.drawText(line.trim(), { x: 60, y, font, size: 10 });
        y -= 15;
      }
    });

    const pdfBytes = await pdfDoc.save();
    console.log("[API] PDF generated");

    // --- Zapisanie PDF w Vercel Blob ---
    console.log("[API] Uploading to Blob...");
    
    const pdfBuffer = Buffer.from(pdfBytes); 
    const blob = await put(`oferty/oferta-${Date.now()}.pdf`, pdfBuffer, { access: "public", contentType: "application/pdf" });
    
    console.log("[API] Blob uploaded:", blob.url);

    // --- Wysłanie Odpowiedzi ---
    // Zazwyczaj to API wysyła PDF E-MAILem, a front-end otrzymuje potwierdzenie sukcesu.
    // Zwrócenie URL jest użyteczne do testów.
    return NextResponse.json({
      message: "Oferta została pomyślnie wygenerowana i wysłana.",
      pdfUrl: blob.url,
    });

  } catch (error) {
    console.error("[API] Error in generateOffer:", error);
    const errorMessage = error instanceof Error ? error.message : "Nieznany błąd serwera.";
    return NextResponse.json({ error: "Nie udało się wygenerować oferty.", details: errorMessage }, { status: 500 });
  }
}