// PLIK: ./api/analyzeProject.ts

import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { put } from "@vercel/blob";

// Inicjalizacja klienta AI w bezpieczny sposób
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Cennik
const priceMap = {
  type: { "one-page": 400, business: 750, ecommerce: 1500, blog: 900 },
  design: { template: 250, custom: 1000 },
  features: { basic: 100, cms: 400, social: 300, advanced: 1250 },
};

export async function POST(request: NextRequest) {
  console.log("[API] analyzeProject called");
  
  try {
    const body = await request.json();
    const { description, email } = body;

    if (!description || description.length < 20) {
      return NextResponse.json({ error: "Opis projektu jest zbyt krótki, opisz go bardziej szczegółowo." }, { status: 400 });
    }
    
    if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "Brak konfiguracji klucza API po stronie serwera." }, { status: 500 });
    }

    // === KROK 1: EKSTRAKCJA DANYCH PRZEZ AI ===
    console.log("[API] Starting data extraction...");
    const extractionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const extractionPrompt = `
      Jesteś analitykiem IT. Przeanalizuj opis projektu i przyporządkuj go do kategorii. Odpowiedz TYLKO w formacie JSON.
      Kategorie: "type": ["one-page", "business", "ecommerce", "blog"], "design": ["template", "custom"], "features": ["basic", "cms", "social", "advanced"] (możesz wybrać kilka, oddzielone przecinkiem).
      Opis: "${description}"
      JSON:
    `;
    const extractionResult = await extractionModel.generateContent(extractionPrompt);
    let extractedData;
    try {
      const jsonResponse = extractionResult.response.text().replace(/```json|```/g, "").trim();
      extractedData = JSON.parse(jsonResponse);
    } catch (e) {
      throw new Error("AI nie zwróciło poprawnego formatu JSON do wyceny.");
    }
    console.log("[API] Extracted data:", extractedData);

    // === KROK 2: OBLICZENIE WYCENY ===
    let baseTotal = 0;
    baseTotal += priceMap.type[extractedData.type as keyof typeof priceMap.type] || 0;
    baseTotal += priceMap.design[extractedData.design as keyof typeof priceMap.design] || 0;
    if (extractedData.features && typeof extractedData.features === "string") {
      extractedData.features.split(",").forEach((feat: string) => {
        baseTotal += priceMap.features[feat.trim() as keyof typeof priceMap.features] || 0;
      });
    }
    const estimate = { min: Math.round(baseTotal), max: Math.ceil((baseTotal * 1.25) / 100) * 100 };
    console.log("[API] Calculated estimate:", estimate);

    // === KROK 3: WYGENEROWANIE ANALIZY TEKSTOWEJ ===
    console.log("[API] Starting AI analysis...");
    const analysisModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const analysisPrompt = `
      Jesteś konsultantem ds. strategii cyfrowej. Klient opisał projekt: "${description}".
      Nasza analiza wykazała: Typ: '${extractedData.type}', Design: '${extractedData.design}', Funkcje: '${extractedData.features}'. Wycena: ${estimate.min}-${estimate.max} PLN.
      Napisz krótką (3-4 zdania), profesjonalną analizę po polsku. Podaj 2-3 spersonalizowane wskazówki, aby projekt odniósł sukces. Bądź zwięzły i ekspercki. Nie używaj markdown.
    `;
    const analysisResult = await analysisModel.generateContent(analysisPrompt);
    const aiAnalysis = analysisResult.response.text();
    console.log("[API] AI analysis completed");

    // === KROK 4: WYGENEROWANIE OFERTY W PDF ---
    console.log("[API] Generating PDF...");
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let y = height - 50;
    const margin = 50;
    const maxWidth = width - 2 * margin;

    page.drawText("Spersonalizowana Oferta - LykKreacji", { x: margin, y, font: boldFont, size: 24, color: rgb(0, 0.44, 0.95) });
    y -= 50;
    page.drawText(`Dla: ${email}`, { x: margin, y, font, size: 12, color: rgb(0.2, 0.2, 0.2) });
    y -= 30;
    page.drawText(`Opis projektu: ${description.substring(0, 100)}...`, { x: margin, y, font, size: 10 });
    y -= 30;

    page.drawText("Wstępna Wycena:", { x: margin, y, font: boldFont, size: 16, color: rgb(0, 0, 0) });
    y -= 25;
    page.drawText(`Szacowany koszt: ${estimate.min} - ${estimate.max} PLN`, { x: margin + 10, y, font, size: 12, color: rgb(0, 0.44, 0.95) });
    y -= 40;

    page.drawText("Analiza AI Twojego Pomysłu:", { x: margin, y, font: boldFont, size: 16, color: rgb(0, 0, 0) });
    y -= 25;
    
    const wrapText = (text: string, font: any, size: number, maxWidth: number) => {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = words[0];
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

    const analysisLines = wrapText(aiAnalysis, font, 10, maxWidth - 10);
    analysisLines.forEach(line => {
        if (y > margin) {
            page.drawText(line, { x: margin + 10, y, font, size: 10, lineHeight: 15 });
            y -= 15;
        }
    });

    const pdfBytes = await pdfDoc.save();
    console.log("[API] PDF generated");

    // === KROK 5: ZAPISANIE PDF W VERCEL BLOB ===
    console.log("[API] Uploading to Blob...");
    
    // Rozwiązanie problemu z typem: Konwersja Uint8Array na Buffer
    const pdfBuffer = Buffer.from(pdfBytes); 
    
    const blob = await put(`oferty/oferta-${email.replace(/@/g, "-")}-${Date.now()}.pdf`, pdfBuffer, { access: "public", contentType: "application/pdf" });
    
    console.log("[API] Blob uploaded:", blob.url);

    // === KROK 6: WYSŁANIE ODPOWIEDZI DO FRONTENDU ===
    return NextResponse.json({
      estimate,
      aiAnalysis,
      extracted: extractedData,
      pdfUrl: blob.url,
    });

  } catch (error) {
    console.error("[API] Error in analyzeProject:", error);
    const errorMessage = error instanceof Error ? error.message : "Nieznany błąd serwera.";
    return NextResponse.json({ error: "Nie udało się przeanalizować projektu.", details: errorMessage }, { status: 500 });
  }
}