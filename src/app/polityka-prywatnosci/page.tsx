'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export default function PolitykaPrywatnosciPage() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#0B1121] text-slate-900 dark:text-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-500 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Powrót do strony głównej
          </Link>

          <h1 className="text-4xl font-bold mb-8">Polityka Prywatności</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Informacje ogólne</h2>
            <p className="mb-4">
              Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
              przekazanych przez Użytkowników w związku z korzystaniem ze strony internetowej lykkreacji.pl.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Administrator danych</h2>
            <p className="mb-4">
              Administratorem danych osobowych jest Arkadiusz Łyczkowski prowadzący działalność gospodarczą 
              pod nazwą Lykkreacja.
            </p>
            <p className="mb-4">
              Kontakt: <a href="mailto:czesc@lykkreacji.pl" className="text-cyan-600 hover:text-cyan-500">czesc@lykkreacji.pl</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Zakres zbieranych danych</h2>
            <p className="mb-4">Zbieramy następujące dane osobowe:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Imię i nazwisko</li>
              <li>Adres e-mail</li>
              <li>Numer telefonu (opcjonalnie)</li>
              <li>Treść wiadomości przesłanej przez formularz kontaktowy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Cel przetwarzania danych</h2>
            <p className="mb-4">Dane osobowe są przetwarzane w celu:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Odpowiedzi na zapytania przesłane przez formularz kontaktowy</li>
              <li>Przygotowania oferty usług</li>
              <li>Realizacji usług</li>
              <li>Marketing bezpośredni (za zgodą)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Podstawa prawna</h2>
            <p className="mb-4">
              Przetwarzanie danych odbywa się na podstawie:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Art. 6 ust. 1 lit. a RODO (zgoda)</li>
              <li>Art. 6 ust. 1 lit. b RODO (wykonanie umowy)</li>
              <li>Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Prawa użytkownika</h2>
            <p className="mb-4">Każdy użytkownik ma prawo do:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania danych</li>
              <li>Usunięcia danych</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
              <li>Cofnięcia zgody w dowolnym momencie</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Pliki cookies</h2>
            <p className="mb-4">
              Strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania, 
              analizy ruchu oraz personalizacji treści.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Rodzaje plików cookies:</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                <strong>Niezbędne</strong> – wymagane do podstawowego działania strony (np. zapamiętywanie zgody na cookies, sesja użytkownika)
              </li>
              <li>
                <strong>Analityczne</strong> – pomagają nam zrozumieć, jak użytkownicy korzystają ze strony (np. Google Analytics)
              </li>
              <li>
                <strong>Marketingowe</strong> – używane do wyświetlania spersonalizowanych reklam
              </li>
            </ul>
            
            <p className="mb-4">
              Możesz zarządzać swoimi preferencjami dotyczącymi plików cookies w ustawieniach 
              w stopce strony (przycisk &quot;Zarządzaj cookies&quot;) lub w ustawieniach swojej przeglądarki.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Kontakt</h2>
            <p className="mb-4">
              W sprawach związanych z ochroną danych osobowych prosimy o kontakt:
            </p>
            <p className="mb-4">
              E-mail: <a href="mailto:czesc@lykkreacji.pl" className="text-cyan-600 hover:text-cyan-500">czesc@lykkreacji.pl</a><br />
              Telefon: <a href="tel:+48790629497" className="text-cyan-600 hover:text-cyan-500">+48 790 629 497</a>
            </p>
          </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
