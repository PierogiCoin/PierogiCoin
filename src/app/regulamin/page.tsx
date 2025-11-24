'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

export default function RegulaminPage() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#0B1121] text-slate-900 dark:text-slate-100">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-500 mb-8 transition-colors">
            <ArrowLeft size={20} />
            Powrót do strony głównej
          </Link>

          <h1 className="text-4xl font-bold mb-8">Regulamin Świadczenia Usług</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§1. Postanowienia ogólne</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>
                Niniejszy Regulamin określa zasady świadczenia usług przez Arkadiusza Łyczkowskiego 
                prowadzącego działalność gospodarczą pod nazwą Lykkreacja.
              </li>
              <li>
                Usługi świadczone są na terytorium Polski oraz zdalnie dla klientów z całego świata.
              </li>
              <li>
                Akceptacja Regulaminu jest dobrowolna, ale konieczna do korzystania z usług.
              </li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§2. Definicje</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Usługodawca</strong> – Arkadiusz Łyczkowski, Lykkreacja</li>
              <li><strong>Klient</strong> – osoba fizyczna, prawna lub jednostka organizacyjna korzystająca z usług</li>
              <li><strong>Usługa</strong> – tworzenie stron internetowych, aplikacji webowych, sklepów e-commerce, audyty UX/UI, SEO</li>
              <li><strong>Strona</strong> – witryna internetowa dostępna pod adresem lykkreacji.pl</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§3. Zakres usług</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Usługodawca świadczy usługi w zakresie:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Tworzenia stron internetowych</li>
                  <li>Projektowania i wdrażania sklepów e-commerce</li>
                  <li>Budowy aplikacji webowych</li>
                  <li>Audytów UX/UI</li>
                  <li>Pozycjonowania SEO</li>
                  <li>Konsultacji technicznych</li>
                </ul>
              </li>
              <li>Szczegółowy zakres każdej usługi określany jest indywidualnie w ofercie handlowej.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§4. Warunki współpracy</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Współpraca rozpoczyna się po akceptacji oferty przez Klienta.</li>
              <li>Klient zobowiązany jest do przekazania wszystkich niezbędnych materiałów i informacji.</li>
              <li>Terminy realizacji są ustalane indywidualnie i podawane w ofercie.</li>
              <li>Wszelkie zmiany w projekcie wymagają pisemnego potwierdzenia i mogą wpłynąć na termin realizacji.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§5. Płatności</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Ceny usług są ustalane indywidualnie w ofercie handlowej.</li>
              <li>Płatność odbywa się na podstawie faktury VAT.</li>
              <li>Standardowy termin płatności wynosi 7 dni od daty wystawienia faktury.</li>
              <li>W przypadku projektów długoterminowych możliwy jest podział płatności na raty.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§6. Prawa autorskie</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Prawa autorskie do wykonanych prac przechodzą na Klienta po pełnej zapłacie.</li>
              <li>Usługodawca zachowuje prawo do wykorzystania wykonanych prac w portfolio.</li>
              <li>Klient nie może odsprzedawać wykonanych prac bez zgody Usługodawcy.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§7. Odpowiedzialność</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Usługodawca dołoży wszelkich starań, aby usługi były wykonane profesjonalnie i terminowo.</li>
              <li>Usługodawca nie ponosi odpowiedzialności za opóźnienia spowodowane przez Klienta.</li>
              <li>Reklamacje należy zgłaszać w ciągu 7 dni od zakończenia projektu.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§8. Rozwiązanie umowy</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Każda ze stron może rozwiązać umowę za 7-dniowym wypowiedzeniem.</li>
              <li>W przypadku rozwiązania umowy przez Klienta, należna jest płatność za wykonaną część prac.</li>
              <li>Usługodawca może rozwiązać umowę ze skutkiem natychmiastowym w przypadku braku płatności.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§9. Postanowienia końcowe</h2>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Regulamin wchodzi w życie z dniem publikacji na stronie.</li>
              <li>Usługodawca zastrzega sobie prawo do zmian w Regulaminie.</li>
              <li>W sprawach nieuregulowanych w Regulaminie mają zastosowanie przepisy prawa polskiego.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">§10. Kontakt</h2>
            <p className="mb-4">
              W sprawach związanych z Regulaminem prosimy o kontakt:
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
