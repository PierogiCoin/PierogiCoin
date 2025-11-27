"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, CheckCircle2, ArrowRight, Layers, Rocket, ExternalLink } from "lucide-react";

interface Question {
    id: number;
    text: string;
    options?: string[];
    type: "choice" | "text";
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "Cześć! Jestem Twoim asystentem AI. Pomogę Ci wycenić projekt. Na początek powiedz, jaki jest główny cel Twojej nowej strony?",
        options: ["Sprzedaż produktów", "Prezentacja firmy/usług", "Blog/Portfolio", "Aplikacja SaaS"],
        type: "choice"
    },
    {
        id: 2,
        text: "Rozumiem. A jak duży ruch przewidujesz w pierwszym roku?",
        options: ["Mały (< 1000/mc)", "Średni (1k - 10k/mc)", "Duży (> 10k/mc)"],
        type: "choice"
    },
    {
        id: 3,
        text: "Czy posiadasz już gotowe materiały (logo, teksty, zdjęcia)?",
        options: ["Tak, mam wszystko", "Częściowo", "Nie, potrzebuję wszystkiego"],
        type: "choice"
    },
    {
        id: 4,
        text: "Czy potrzebujesz integracji z zewnętrznymi systemami (np. płatności, CRM, newsletter)?",
        options: ["Tak, wielu", "Tylko podstawowe", "Nie"],
        type: "choice"
    }
];

export function AICalculator() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<{
        min: number;
        max: number;
        suggestion: string;
        tech: "nextjs" | "wordpress";
    } | null>(null);
    const [showContactForm, setShowContactForm] = useState(false);

    const handleAnswer = (answer: string) => {
        setAnswers(prev => ({ ...prev, [QUESTIONS[step].id]: answer }));
        if (step < QUESTIONS.length - 1) {
            setStep(prev => prev + 1);
        } else {
            analyzeResults();
        }
    };

    const analyzeResults = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            calculateEstimate();
        }, 2500);
    };

    const calculateEstimate = () => {
        let baseMin = 2000;
        let baseMax = 4000;
        let suggestion = "";
        let tech: "nextjs" | "wordpress" = "wordpress";

        const goal = answers[1];
        const traffic = answers[2];
        const integrations = answers[4];

        // Logic to determine Tech Stack
        if (goal === "Aplikacja SaaS" || goal === "Sprzedaż produktów" || traffic === "Duży (> 10k/mc)") {
            tech = "nextjs";
        }

        if (tech === "nextjs") {
            suggestion = "Twój projekt wymaga wydajności i skalowalności. Rekomenduję technologię Next.js (React), która zapewni błyskawiczne ładowanie i bezpieczeństwo.";
            baseMin += 3000;
            baseMax += 5000;
        } else {
            suggestion = "Dla Twoich potrzeb idealnym i ekonomicznym rozwiązaniem będzie WordPress. Pozwoli na łatwą edycję treści i szybkie wdrożenie.";
        }

        if (integrations === "Tak, wielu") {
            baseMin += 2000;
            baseMax += 4000;
        }

        setResult({ min: baseMin, max: baseMax, suggestion, tech });
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
        setResult(null);
        setIsAnalyzing(false);
        setShowContactForm(false);
    };

    const handleAction = () => {
        if (result?.tech === "nextjs") {
            setShowContactForm(true);
        } else {
            window.open("https://wordpress-partner.example.com", "_blank");
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto bg-black/40 border-purple-500/30 backdrop-blur-md text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">AI Assistant</span>
                </div>
                <CardTitle className="text-2xl font-bold">Inteligentna Wycena</CardTitle>
            </CardHeader>

            <CardContent className="min-h-[300px] flex flex-col justify-center">
                <AnimatePresence mode="wait">

                    {/* Question Step */}
                    {!isAnalyzing && !result && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-medium leading-relaxed">
                                {QUESTIONS[step].text}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {QUESTIONS[step].options?.map((option) => (
                                    <Button
                                        key={option}
                                        variant="outline"
                                        onClick={() => handleAnswer(option)}
                                        className="justify-start h-auto py-4 px-6 text-left border-white/10 hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white transition-all"
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-8">
                                <span>Krok {step + 1} z {QUESTIONS.length}</span>
                                <div className="flex gap-1">
                                    {QUESTIONS.map((q, i) => (
                                        <div key={q.id} className={`h-1 w-8 rounded-full ${i <= step ? "bg-purple-500" : "bg-white/10"}`} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Analyzing Step */}
                    {isAnalyzing && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse" />
                                <Loader2 className="w-12 h-12 text-purple-500 animate-spin relative z-10" />
                            </div>
                            <h3 className="text-xl font-medium">Analizuję Twoje odpowiedzi...</h3>
                            <p className="text-gray-400 text-sm">Dobieram najlepsze technologie i szacuję budżet.</p>
                        </motion.div>
                    )}

                    {/* Result Step */}
                    {result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            <div className={`border rounded-xl p-6 ${result.tech === "nextjs" ? "bg-purple-500/10 border-purple-500/20" : "bg-blue-500/10 border-blue-500/20"}`}>
                                <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${result.tech === "nextjs" ? "text-purple-300" : "text-blue-300"}`}>
                                    {result.tech === "nextjs" ? <Rocket className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                                    Rekomendacja: {result.tech === "nextjs" ? "Next.js (Premium)" : "WordPress (Standard)"}
                                </h3>
                                <p className="text-gray-200 leading-relaxed">
                                    {result.suggestion}
                                </p>
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-sm text-gray-400">Szacunkowy budżet</p>
                                <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                    {result.min.toLocaleString()} - {result.max.toLocaleString()} PLN
                                </div>
                            </div>

                            {!showContactForm ? (
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Button onClick={reset} variant="outline" className="flex-1 border-white/10 hover:bg-white/5">
                                        Zacznij od nowa
                                    </Button>
                                    <Button
                                        onClick={handleAction}
                                        className={`flex-1 text-white ${result.tech === "nextjs" ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"}`}
                                    >
                                        {result.tech === "nextjs" ? (
                                            <>Umów konsultację <ArrowRight className="w-4 h-4 ml-2" /></>
                                        ) : (
                                            <>Zobacz ofertę <ExternalLink className="w-4 h-4 ml-2" /></>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 space-y-4 mt-4"
                                >
                                    <h4 className="font-semibold text-purple-300">Wyślij zapytanie ofertowe</h4>
                                    <Input placeholder="Twój email" className="bg-black/50 border-white/10" />
                                    <Input placeholder="Telefon (opcjonalnie)" className="bg-black/50 border-white/10" />
                                    <div className="flex gap-2">
                                        <Button onClick={() => setShowContactForm(false)} variant="ghost" className="flex-1">Anuluj</Button>
                                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Wyślij</Button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
