'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useDebounce } from './hooks/useDebounce';
import { Lightbulb } from "lucide-react";

// --- Typy ---
type AnalysisResult = {
  estimate: { min: number; max: number };
  aiAnalysis: string;
  extracted: { type: string; design: string; features: string };
};

// --- Główny Komponent ---
const AiCalculator: React.FC = () => {
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Dodajemy komunikat sukcesu
    
    const debouncedDescription = useDebounce(description, 1200);

    const resultRef = useRef<HTMLDivElement>(null);

    // Animacja wejścia wyników
    useGSAP(() => {
        if (result && resultRef.current) {
            gsap.fromTo(resultRef.current.children, 
                { autoAlpha: 0, y: 15 },
                { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
            );
        }
    }, { dependencies: [result] });
    
    // Logika analizy na żywo (już istniała, bez zmian)
    useEffect(() => {
        setSuccessMessage(null); // Czyścimy sukces przy nowej analizie
        if (debouncedDescription.length < 30) {
            setResult(null);
            return;
        }
        const analyze = async () => {
            setIsLoading(true);
            setError(null);
            setResult(null);
            try {
                const response = await fetch("/api/liveAnalyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ description: debouncedDescription }),
                });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || "Nie udało się przeanalizować projektu.");
                }
                const data: AnalysisResult = await response.json();
                setResult(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        analyze();
    }, [debouncedDescription]);

    // --- NOWA FUNKCJA LOGIKI POBIERANIA OFERTY ---
    const handleGenerateOffer = async () => {
        if (!result || !email || !email.includes("@")) {
            setError("Wypełnij poprawnie adres e-mail i poczekaj na wyniki analizy.");
            return;
        }

        setIsGeneratingPdf(true);
        setError(null);
        setSuccessMessage(null);
        
        try {
            const response = await fetch("/api/generateOffer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    description: description,
                    analysis: result, // Przekazujemy pełne wyniki analizy
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Nie udało się wygenerować oferty. Spróbuj ponownie.");
            }
            
            // Zakładamy, że API odpowiada statusem 200/201, a PDF jest wysyłany e-mailem.
            setSuccessMessage(`Pełna oferta została wysłana na adres: ${email}. Sprawdź swoją skrzynkę!`);
            
            // Opcjonalnie: Zerowanie formularza po sukcesie
            // setDescription(""); 
            // setEmail("");

        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsGeneratingPdf(false);
        }
    };
    // ----------------------------------------------

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Lewy Panel */}
            <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Opisz swój pomysł</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Wpisz poniżej, czego potrzebujesz. Nasz asystent AI przeanalizuje Twój opis w czasie rzeczywistym i przygotuje wstępną wycenę.
                </p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={10}
                    className="w-full p-4 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-sm"
                    placeholder="Np. 'Jestem fotografem ślubnym i potrzebuję nowoczesnej strony z portfolio, formularzem kontaktowym i blogiem...'"
                />
            </div>

            {/* Prawy Panel */}
            <div className="w-full lg:w-1/2">
                <div className="sticky top-28 bg-white dark:bg-slate-800/50 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 min-h-[400px]">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-200 dark:border-slate-700 pb-3">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">Analiza na żywo</h4>
                        {isLoading && (
                            <div className="flex items-center gap-2 text-blue-500 dark:text-cyan-400 text-sm">
                                <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-150"></div>
                                <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-300"></div>
                            </div>
                        )}
                    </div>

                    {/* Komunikaty statusowe (Error / Success) */}
                    {error && <div className="text-red-500 text-sm p-3 mb-4 bg-red-500/10 rounded-lg">{error}</div>}
                    {successMessage && <div className="text-green-600 text-sm p-3 mb-4 bg-green-500/10 rounded-lg">{successMessage}</div>}


                    {!result && !isLoading && (
                        <div className="text-center text-slate-500 dark:text-slate-400 py-10">
                            <p>{description.length < 30 ? "Opisz swój projekt (min. 30 znaków), aby rozpocząć analizę..." : "Kontynuuj pisanie, asystent analizuje Twój pomysł..."}</p>
                        </div>
                    )}

                    {result && (
                        <div ref={resultRef}>
                            <div className="text-center mb-6">
                                <p className="text-slate-500 dark:text-slate-400">Szacowany koszt:</p>
                                <p className="text-4xl font-extrabold text-blue-500 dark:text-cyan-400">{result.estimate.min} - {result.estimate.max} PLN</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center text-xs mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <div><p className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px]">Typ Strony</p><p className="text-slate-700 dark:text-slate-300 mt-1">{result.extracted.type}</p></div>
                                <div><p className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px]">Design</p><p className="text-slate-700 dark:text-slate-300 mt-1">{result.extracted.design}</p></div>
                                <div><p className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[10px]">Funkcje</p><p className="text-slate-700 dark:text-slate-300 mt-1">{result.extracted.features}</p></div>
                            </div>
                            <div className="border-t border-blue-500/20 dark:border-cyan-400/20 pt-4 mb-6">
                                <h5 className="text-sm font-bold text-blue-500 dark:text-cyan-400 mb-2 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> Rekomendacja AI</h5>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{result.aiAnalysis}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="Twój e-mail do wysłania oferty" 
                                    className="w-full p-3 text-sm bg-slate-100 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    required 
                                />
                                <button 
                                    onClick={handleGenerateOffer} 
                                    disabled={isGeneratingPdf || !email.includes("@") || isLoading} // Dodajemy sprawdzenie isLoading
                                    className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isGeneratingPdf && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                    {isGeneratingPdf ? "Przygotowuję PDF..." : "Pobierz Pełną Ofertę"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AiCalculator;