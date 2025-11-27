import { Metadata } from 'next';
import LocalLandingPage from '@/components/LocalLandingPage';

export const metadata: Metadata = {
    title: "Tworzenie Stron Internetowych Wrocław | Next.js & React Software House",
    description: "Software House Wrocław. Tworzymy szybkie strony w Next.js i sklepy internetowe. Jakość Enterprise, ceny startupowe. Spotkajmy się we Wrocławiu.",
    alternates: {
        canonical: 'https://lykkreacji.pl/strony-internetowe-wroclaw',
    },
    openGraph: {
        title: "Tworzenie Stron Internetowych Wrocław | LykKreacji",
        description: "Profesjonalne strony WWW i aplikacje webowe we Wrocławiu. Technologia Next.js i AI.",
        url: 'https://lykkreacji.pl/strony-internetowe-wroclaw',
        locale: 'pl_PL',
        type: 'website',
    }
};

export default function Page() {
    return (
        <LocalLandingPage
            city="Wrocław"
            title="Tworzenie Stron Internetowych Wrocław"
            description="Szukasz Software House'u we Wrocławiu, który dowiezie projekt na czas i w budżecie? Specjalizujemy się w Next.js i React."
        />
    );
}
