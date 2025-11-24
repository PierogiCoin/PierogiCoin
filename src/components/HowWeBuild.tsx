import React, { useRef, useState } from 'react';
import useOnScreen from './hooks/useOnScreen';
import { DesktopIcon, TabletIcon, MobileIcon } from './icons/GeneralIcons';

const HowWeBuild: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, { threshold: 0.15 });

    // Używamy stanu, aby w przyszłości można było przełączać widok
    const [activeView, setActiveView] = useState('desktop');

    const codeContent = `<!DOCTYPE html>
<html lang="pl">
<head>
    <title>Moja Firma</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>...</nav>
    </header>
    <main>
        <h1>Moja Firma</h1>
        <p>Twoja strona, która sprzedaje</p>
    </main>
</body>
</html>`;

    return (
        <section id="proces" className="py-20 bg-light-gray-light dark:bg-light-gray">
            <div className="container mx-auto px-6">
                <div 
                    ref={sectionRef}
                    className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                >
                    <h2 className="text-4xl font-extrabold text-text-main-light dark:text-white">
                        Zobacz, jak <span className="text-primary">Powstaje</span> Twoja Strona
                    </h2>
                    <p className="text-lg text-text-secondary-light dark:text-text-secondary mt-4 max-w-2xl mx-auto">
                        Od linii kodu do interaktywnego interfejsu. Poznaj magię tworzenia stron internetowych w działaniu.
                    </p>
                </div>

                <div 
                    className={`max-w-6xl mx-auto p-4 md:p-8 bg-secondary-light dark:bg-secondary rounded-2xl shadow-2xl border border-border-light dark:border-border-dark transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    style={{ animationDelay: '0.4s' }}
                >
                    {/* Panel z zakładkami */}
                    <div className="flex justify-center md:justify-start items-center gap-4 mb-4 md:mb-6 text-text-secondary-light dark:text-text-secondary">
                        <button className={`flex items-center gap-2 p-2 font-semibold rounded-md transition-colors ${activeView === 'desktop' ? 'text-primary bg-light-gray-light dark:bg-light-gray' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            <DesktopIcon className="w-5 h-5" /> Desktop
                        </button>
                        <button className={`flex items-center gap-2 p-2 font-semibold rounded-md transition-colors ${activeView === 'tablet' ? 'text-primary bg-light-gray-light dark:bg-light-gray' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            <TabletIcon className="w-5 h-5" /> Tablet
                        </button>
                        <button className={`flex items-center gap-2 p-2 font-semibold rounded-md transition-colors ${activeView === 'mobile' ? 'text-primary bg-light-gray-light dark:bg-light-gray' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            <MobileIcon className="w-5 h-5" /> Mobile
                        </button>
                    </div>

                    {/* Kontener z kodem i podglądem */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-light-gray-light dark:bg-light-gray p-4 md:p-6 rounded-xl">
                        {/* Panel z kodem */}
                        <div className="p-4 bg-gray-800 rounded-lg overflow-auto max-h-[400px] md:max-h-[500px] text-sm md:text-base">
                            <pre className="text-gray-300 font-mono">
                                <code className="text-yellow-400">&lt;!DOCTYPE html&gt;</code>
                                <br />
                                <code className="text-blue-400">&lt;html lang=</code><code className="text-green-400">&quot;pl&quot;</code><code className="text-blue-400">&gt;</code>
                                <br />
                                <code className="text-gray-500">...</code>
                                <br />
                                <code className="text-blue-400">&lt;title&gt;</code><code className="text-white">Moja Firma</code><code className="text-blue-400">&lt;/title&gt;</code>
                                <br />
                                <code className="text-blue-400">&lt;link rel=</code><code className="text-green-400">&quot;stylesheet&quot; href=</code><code className="text-green-400">&quot;style.css&quot;</code><code className="text-blue-400">&gt;</code>
                                <br />
                                <code className="text-gray-500">...</code>
                                <br />
                                {codeContent}
                            </pre>
                        </div>

                        {/* Panel z podglądem */}
                        <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-border-light dark:border-border-dark flex flex-col justify-center items-center text-center">
                            <div className="w-full max-w-sm mx-auto p-6 bg-secondary-light dark:bg-secondary rounded-lg shadow-xl">
                                <h4 className="text-lg font-bold text-text-main-light dark:text-white mb-2">Twoja strona, która sprzedaje</h4>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary">Przykładowy szablon</p>
                                <div className="mt-4 w-full h-8 bg-primary/20 rounded"></div>
                            </div>
                            <div className="mt-6 text-sm text-text-secondary-light dark:text-text-secondary">
                                <p><strong>Dlatego to działa</strong></p>
                                <p className="mt-2">Intuicyjny design, zoptymalizowane pod konwersję.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowWeBuild;
