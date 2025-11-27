import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kalkulator Wyceny Stron WWW & AI - Sprawdź Cenę Online | LykKreacji',
  description:
    'Oblicz koszt strony internetowej, sklepu lub aplikacji w 30 sekund. Porównaj ceny WordPress vs Next.js. Darmowa wycena z wykorzystaniem AI.',
  keywords: [
    'kalkulator stron www',
    'wycena strony internetowej',
    'koszt strony www',
    'cennik stron www',
    'ile kosztuje strona internetowa',
    'wycena sklepu internetowego',
    'koszt aplikacji webowej',
    'Next.js vs WordPress cennik',
  ],
  openGraph: {
    title: 'Kalkulator Wyceny Stron WWW & AI | LykKreacji',
    description: 'Sprawdź ile będzie kosztować Twój projekt. Darmowa wycena online w 30 sekund.',
    type: 'website',
    url: 'https://lykkreacji.pl/kalkulator',
  },
}

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
