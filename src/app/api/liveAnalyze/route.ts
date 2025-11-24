import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicjalizacja klienta AI w bezpieczny sposób
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");


export async function POST(request: NextRequest) {
  console.log("[v1] liveAnalyze API called (using @google/generative-ai)")

  try {
    // WALIDACJA KLUCZA API (Uproszczona)
    if (!process.env.GEMINI_API_KEY) {
        console.error("[v1] Missing GEMINI_API_KEY environment variable");
        return NextResponse.json(
            { error: "Brak klucza API. Skonfiguruj GEMINI_API_KEY w zmiennych środowiskowych." },
            { status: 500 },
        );
    }

    const body = await request.json()
    console.log("[v1] Request body:", body)

    const { description } = body

    if (!description || typeof description !== "string") {
      console.log("[v1] Invalid description")
      return NextResponse.json({ error: "Opis projektu jest wymagany" }, { status: 400 })
    }

    const prompt = `
Jesteś ekspertem od wyceny projektów webowych. Przeanalizuj poniższy opis projektu i zwróć JSON z następującymi polami:

1. "estimate": obiekt z "min" i "max" (liczby w PLN)
2. "extracted": obiekt z polami:
   - "type": krótki opis typu strony (np. "Landing Page", "E-commerce", "Blog")
   - "design": poziom złożoności designu (np. "Prosty", "Średni", "Zaawansowany")
   - "features": krótka lista głównych funkcji (np. "Formularz, Blog, CMS")
3. "aiAnalysis": krótka rekomendacja (1-2 zdania)

Opis projektu:
${description}

WAŻNE: Zwróć TYLKO poprawny JSON, bez markdown, bez dodatkowego tekstu, bez \`\`\`json. Tylko czysty JSON.
`

    console.log("[v1] Calling Gemini AI...")

    let responseText: string | null = null
    
    // Gemini 2.0 Flash Experimental - najnowszy model
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash-exp" 
    }); 

    try {
      const result = await model.generateContent(prompt);
      responseText = result.response.text();
      console.log("[v1] Successfully received response from Gemini");
    } catch (aiError) {
      console.error("[v1] Gemini API error:", aiError);
      throw new Error("Nie udało się uzyskać odpowiedzi z API Gemini.");
    }

    if (!responseText || responseText.trim().length === 0) {
      console.log("[v1] Empty response")
      throw new Error("Pusta odpowiedź z API Gemini")
    }

    console.log("[v1] Processing response text, length:", responseText.length)

    // Czyścimy tekst odpowiedzi:
    let cleanedText = responseText.trim()
    cleanedText = cleanedText.replace(/```json\s*/g, "").replace(/```\s*/g, "")
    cleanedText = cleanedText.substring(cleanedText.indexOf('{'), cleanedText.lastIndexOf('}') + 1);

    console.log("[v1] Parsing JSON...")

    let analysisResult: any
    try {
      analysisResult = JSON.parse(cleanedText); 
      console.log("[v1] Successfully parsed JSON")
    } catch (parseError) {
      console.error("[v1] JSON parse error:", parseError)
      console.log("[v1] Raw text:", cleanedText); 
      throw new Error("Nieprawidłowy format JSON w odpowiedzi AI: " + (parseError as Error).message);
    }

    console.log("[v1] Returning successful response")
    return NextResponse.json(analysisResult, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("[v1] Error in liveAnalyze:", error instanceof Error ? error.message : "Unknown error")
    const errorMessage = error instanceof Error ? error.message : "Wystąpił błąd podczas analizy"
    return NextResponse.json(
      { error: errorMessage },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}