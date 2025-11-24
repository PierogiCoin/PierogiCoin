import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Łączy klasy Tailwind CSS bez konfliktów.
 * 
 * Ta funkcja pomocnicza, inspirowana `shadcn/ui`, jest niezwykle potężna.
 * Pozwala na warunkowe łączenie klas, a `tailwind-merge` inteligentnie
 * rozwiązuje konflikty (np. `p-2` i `p-4` razem -> zostaje tylko `p-4`).
 * 
 * @param {...ClassValue[]} inputs - Dowolna liczba stringów, obiektów lub tablic z klasami.
 * @returns {string} Połączony i zoptymalizowany string klas.
 * 
 * @example
 * cn("p-4 font-bold", { "bg-red-500": hasError }, "text-white");
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formatuje liczbę jako cenę w PLN.
 * 
 * @param {number} price - Cena jako liczba.
 * @returns {string} Sformatowana cena, np. "1,250.00 zł".
 * 
 * @example
 * formatPrice(1250); // => "1 250,00 zł"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);
}

/**
 * Tworzy bezwzględny adres URL na podstawie ścieżki.
 * Kluczowe dla SEO, Open Graph i generowania linków w e-mailach.
 * 
 * @param {string} path - Ścieżka, np. "/portfolio/projekt-1".
 * @returns {string} Pełny adres URL, np. "https://twojadomena.pl/portfolio/projekt-1".
 */
export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
}