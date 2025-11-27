'use client';

import React from 'react';
import { siteConfig } from '@/data/siteConfig';
import { Check, MapPin, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MagneticButton } from '@/components/ui/MagneticButton';

// Import existing sections to reuse
import Services from '@/components/Services';
import { PortfolioScroll } from '@/components/PortfolioScroll';
import FAQ from '@/components/FAQ/FAQ';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Layout/Footer';

interface LocalLandingPageProps {
    city: string;
    region?: string;
    title: string;
    description: string;
}

export default function LocalLandingPage({
    city,
    region = "Dolny Śląsk",
    title,
    description
}: LocalLandingPageProps) {

    return (
        <main className="min-h-screen bg-white dark:bg-black selection:bg-cyan-500/30">

            {/* 1. LOCAL HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">

                        {/* Location Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold text-sm mb-8">
                            <MapPin size={16} />
                            <span>Działamy w: {city} i okolicach</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-8 leading-tight">
                            Tworzenie Stron <br />
                            Internetowych <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">{city}</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                            {description} Jesteśmy lokalnym software housem, który dostarcza jakość Enterprise w cenach dla MŚP. Spotkajmy się w {city} i omówmy Twój projekt.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <MagneticButton strength={0.6}>
                                <Link
                                    href="#kontakt"
                                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2"
                                >
                                    Darmowa Wycena
                                    <ArrowRight size={20} />
                                </Link>
                            </MagneticButton>

                            <MagneticButton strength={0.3}>
                                <a
                                    href={`tel:${siteConfig.contact.phone}`}
                                    className="px-8 py-4 bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-lg rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center gap-2"
                                >
                                    Zadzwoń: {siteConfig.contact.displayPhone}
                                </a>
                            </MagneticButton>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 dark:text-gray-500 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" />
                                <span>Lokalna Firma</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" />
                                <span>Faktura VAT 23%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-green-500" />
                                <span>Wsparcie 24/7</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. WHY US LOCAL SECTION */}
            <section className="py-20 bg-slate-50 dark:bg-white/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                Dlaczego firma z {city} powinna wybrać <span className="text-cyan-500">LykKreacji</span>?
                            </h2>
                            <div className="space-y-6 text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
                                <p>
                                    W dobie agencji online, które nigdy nie widziały klienta na oczy, my stawiamy na relacje. Jesteśmy stąd – z Dolnego Śląska. Znamy lokalny rynek, konkurencję i specyfikę biznesu w {city}.
                                </p>
                                <p>
                                    Nie jesteśmy anonimowym freelancerem, który zniknie po odebraniu zaliczki. Jesteśmy legalnie działającą firmą (NIP, REGON), wystawiamy faktury VAT i dajemy gwarancję na nasze usługi.
                                </p>
                                <ul className="space-y-3 mt-4">
                                    {[
                                        `Możliwość spotkania twarzą w twarz w ${city}`,
                                        "Umowa i pełne przekazanie praw autorskich",
                                        "Szybki czas reakcji (jesteśmy w tej samej strefie czasowej)",
                                        "Wsparcie techniczne po wdrożeniu"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 flex-shrink-0">
                                                <Check size={14} />
                                            </div>
                                            <span className="text-slate-900 dark:text-white font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-1">
                                <div className="w-full h-full rounded-[20px] bg-slate-900 flex items-center justify-center relative overflow-hidden">
                                    {/* Placeholder for map or local image */}
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                                    <div className="text-center p-8 relative z-10">
                                        <MapPin size={64} className="text-cyan-500 mx-auto mb-4" />
                                        <h3 className="text-2xl font-bold text-white mb-2">{city}</h3>
                                        <p className="text-gray-400">{region}</p>
                                        <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                            <p className="text-sm text-gray-300">Jesteśmy blisko Ciebie.</p>
                                            <p className="text-white font-bold mt-1">Dojazd do klienta: GRATIS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. REUSED SECTIONS */}
            <Services />
            <PortfolioScroll />
            <FAQ />
            <Contact />
            <Footer />

        </main>
    );
}
