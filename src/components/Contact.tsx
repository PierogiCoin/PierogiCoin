'use client';

import React, { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Check, AlertCircle, Loader2, Send, Phone, Mail, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Komponent Inputa (Dark Mode) ---
interface InputProps { id: string; name: string; label: string; type?: string; value: string; error?: string; onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; }

const FloatingLabelInput: React.FC<InputProps> = ({ id, name, label, type = "text", value, error, onChange }) => (
    <div className="relative mb-6">
        {type === 'textarea' ? (
            <textarea id={id} name={name} value={value} onChange={onChange} placeholder=" " rows={4}
                className={`block w-full px-4 py-3 bg-white dark:bg-white/5 border rounded-lg text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-0 transition-colors peer resize-none ${error ? "border-red-500 focus:border-red-500" : "border-slate-300 dark:border-white/10 focus:border-cyan-500"}`} 
            />
        ) : (
            <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder=" "
                className={`block w-full px-4 py-3 bg-white dark:bg-white/5 border rounded-lg text-slate-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-0 transition-colors peer ${error ? "border-red-500 focus:border-red-500" : "border-slate-300 dark:border-white/10 focus:border-cyan-500"}`} 
            />
        )}
        
        <label htmlFor={id} className={`absolute left-4 top-3 text-slate-500 dark:text-gray-400 transition-all duration-300 -translate-y-7 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:text-cyan-500 ${error ? "text-red-500" : ""}`}>
            {label}
        </label>
        
        {error && <div className="absolute right-3 top-3 text-red-500"><AlertCircle size={18} /></div>}
        {!error && value.length > 0 && <div className="absolute right-3 top-3 text-green-500"><Check size={18} /></div>}
        {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
);

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    // Animacja wejścia
    useGSAP(() => {
        gsap.fromTo(".contact-item", 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
        );
    }, { scope: containerRef });

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Imię jest wymagane";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Niepoprawny email";
        if (!formData.message.trim()) newErrors.message = "Wiadomość nie może być pusta";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to send');

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
            
            // Reset status po 5 sekundach
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    return (
        <section ref={containerRef} className="py-24 bg-white dark:bg-black relative overflow-hidden">
            {/* Tło */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-900/10 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* LEWA KOLUMNA: Dane kontaktowe */}
                    <div className="space-y-8">
                        <div className="contact-item">
                            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                                Porozmawiajmy o <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Twoim projekcie</span>
                            </h2>
                            <p className="text-slate-600 dark:text-gray-400 text-lg">
                                Masz pomysł? Chcesz wycenić stronę? A może po prostu napić się wirtualnej kawy? Jestem do dyspozycji.
                            </p>
                        </div>

                        <div className="space-y-6 mt-8">
                            {/* TELEFON - Główny CTA */}
                            <a href="tel:+48790629497" className="contact-item group flex items-center gap-6 p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-gray-400 uppercase tracking-wider font-bold">Zadzwoń teraz</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">+48 790 629 497</p>
                                </div>
                            </a>

                            {/* EMAIL */}
                            <a href="mailto:czesc@lykkreacji.pl" className="contact-item group flex items-center gap-6 p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-gray-400 uppercase tracking-wider font-bold">Napisz maila</p>
                                    <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">czesc@lykkreacji.pl</p>
                                </div>
                            </a>
                        </div>

                        {/* Social Media */}
                        <div className="contact-item flex gap-4 pt-4">
                            {[
                                { Icon: Linkedin, href: 'https://www.linkedin.com/company/lykkreacji/?viewAsMember=true' },
                                { Icon: Instagram, href: 'https://www.instagram.com/lyk_kreacji/' },
                                { Icon: Facebook, href: 'https://www.facebook.com/LykKreacji/' }
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/30 transition-all">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* PRAWA KOLUMNA: Formularz */}
                    <div className="contact-item bg-slate-50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Wyślij wiadomość</h3>
                        
                        <form onSubmit={handleSubmit}>
                            <FloatingLabelInput id="name" name="name" label="Twoje Imię" value={formData.name} onChange={handleChange} error={errors.name} />
                            <FloatingLabelInput id="email" name="email" label="Adres E-mail" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                            <FloatingLabelInput id="phone" name="phone" label="Numer telefonu (opcjonalnie)" type="tel" value={formData.phone} onChange={handleChange} />
                            <FloatingLabelInput id="message" name="message" label="O czym chcesz porozmawiać?" type="textarea" value={formData.message} onChange={handleChange} error={errors.message} />

                            <button 
                                type="submit" 
                                disabled={status === 'sending' || status === 'success'}
                                className="w-full py-4 mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                {status === 'sending' ? (
                                    <><Loader2 className="animate-spin" /> Wysyłanie...</>
                                ) : status === 'success' ? (
                                    <><Check /> Wysłano pomyślnie!</>
                                ) : (
                                    <>Wyślij wiadomość <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                            
                            {status === 'error' && <p className="text-red-500 text-center mt-4">Coś poszło nie tak. Spróbuj ponownie lub zadzwoń.</p>}
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}