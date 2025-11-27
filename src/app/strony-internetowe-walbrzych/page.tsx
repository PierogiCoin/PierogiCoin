import { Metadata } from 'next';
import LocalLandingPage from '@/components/LocalLandingPage';

export const metadata: Metadata = {
    title: "Tworzenie Stron Internetowych Wałbrzych | Sklepy i Wizytówki",
    description: "Strony internetowe Wałbrzych. Nowoczesne projekty, szybkie ładowanie, optymalizacja SEO. Zwiększ sprzedaż w swojej firmie.",
    alternates: {
        canonical: 'https://lykkreacji.pl/strony-internetowe-walbrzych',
    },
    openGraph: {
        title: "Tworzenie Stron Internetowych Wałbrzych | LykKreacji",
        description: "Skuteczne strony WWW dla firm z Wałbrzycha i okolic. Sprawdź nasze realizacje.",
        url: 'https://lykkreacji.pl/strony-internetowe-walbrzych',
        locale: 'pl_PL',
        type: 'website',
    }
};

export default function Page() {
    return (
        <LocalLandingPage
            city="Wałbrzych"
            title="Tworzenie Stron Internetowych Wałbrzych"
            description="Potrzebujesz nowoczesnej strony internetowej w Wałbrzychu? Pomożemy Ci wyróżnić się na tle konkurencji."
        />
    );
}
