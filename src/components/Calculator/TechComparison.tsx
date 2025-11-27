"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Zap, Shield, Rocket, Layers } from "lucide-react";
import { motion } from "framer-motion";

export function TechComparison() {
    return (
        <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 space-y-4">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        WordPress czy Next.js?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Wybór technologii ma kluczowe znaczenie dla sukcesu Twojego projektu. Zobacz, czym różnią się te dwa podejścia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* WordPress Card */}
                    <Card className="bg-black/40 border-white/10 backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50" />
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-blue-400">WordPress</span>
                                <Layers className="w-6 h-6 text-blue-500" />
                            </CardTitle>
                            <p className="text-sm text-gray-400">Rozwiązanie budżetowe</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-300">Cena wdrożenia</span>
                                    <span className="text-green-400 font-bold">Niska</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[30%]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-300">Szybkość (Google PageSpeed)</span>
                                    <span className="text-yellow-500 font-bold">Średnia (40-70)</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 w-[50%]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-300">Bezpieczeństwo</span>
                                    <span className="text-red-400 font-bold">Niskie (Wtyczki)</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 w-[40%]" />
                                </div>
                            </div>

                            <ul className="space-y-2 pt-4 border-t border-white/10 mt-4">
                                <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                    Łatwa edycja treści (CMS)
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                    Dużo gotowych motywów
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                                    Wymaga częstych aktualizacji
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-400">
                                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                                    Podatny na ataki hakerskie
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Next.js Card */}
                    <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm relative overflow-hidden group hover:border-purple-500 transition-colors shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Next.js (React)</span>
                                <Rocket className="w-6 h-6 text-purple-500" />
                            </CardTitle>
                            <p className="text-sm text-purple-300">Rozwiązanie Premium</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-300">Cena wdrożenia</span>
                                    <span className="text-gray-400 font-bold">Wyższa</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[80%]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-300">Szybkość (Google PageSpeed)</span>
                                    <span className="text-green-400 font-bold">Ekstremalna (90-100)</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[95%]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-300">Bezpieczeństwo</span>
                                    <span className="text-green-400 font-bold">Maksymalne</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[100%]" />
                                </div>
                            </div>

                            <ul className="space-y-2 pt-4 border-t border-white/10 mt-4">
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-purple-500 mt-0.5" />
                                    Błyskawiczne ładowanie strony
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-purple-500 mt-0.5" />
                                    Lepsze pozycjonowanie (SEO)
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-purple-500 mt-0.5" />
                                    Pełna dowolność designu
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-300">
                                    <Check className="w-4 h-4 text-purple-500 mt-0.5" />
                                    Bezpieczeństwo (brak wtyczek)
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}
