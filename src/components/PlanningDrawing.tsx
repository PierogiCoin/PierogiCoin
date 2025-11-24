"use client"
import type React from "react"
import { useRef } from "react"
// Usunięto importy useLayoutEffect i gsap, ponieważ biblioteka GSAP
// nie jest dostępna, co powodowało błąd kompilacji.
// Rysunek będzie wyświetlany statycznie.

// --- Typy i Domyślne Dane ---
type DrawingElement = {
  id: string
  type: "rect" | "path"
  label: string
  labelX?: number
  labelY?: number
  [key: string]: any
}
type DrawingData = { title: string; elements: readonly DrawingElement[] }

// Twoje dane
const defaultDrawingData: DrawingData = {
  title: "Architektura Projektu",
  elements: [
    // Dostosowano labelY dla lepszego odstępu
    { id: "frame", type: "rect", x: 5, y: 5, width: 90, height: 50, rx: 2, label: "Główny Kontener", labelX: 50, labelY: 58 }, 
    { id: "sidebar", type: "path", d: "M 30 5 L 30 55", label: "Nawigacja", labelX: 17, labelY: 30 },
    { id: "header", type: "rect", x: 35, y: 10, width: 55, height: 10, label: "Nagłówek", labelX: 62, labelY: 16 },
    { id: "content", type: "rect", x: 35, y: 25, width: 25, height: 25, label: "Główna Treść", labelX: 47, labelY: 38 },
    { id: "image", type: "rect", x: 65, y: 25, width: 25, height: 25, label: "Media", labelX: 77, labelY: 38 },
  ],
}

interface PlanningDrawingProps {
  data?: DrawingData | null
}

// POPRAWKA: Zmieniono eksport z 'export const' na 'export default'
// Aby uniknąć błędów związanych z pomieszanymi importami w plikach nadrzędnych.
const PlanningDrawing: React.FC<PlanningDrawingProps> = ({ data = defaultDrawingData }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { title, elements } = data || {}

  if (!title || !elements) {
    return <div className="text-center text-gray-400">Brak danych do wyświetlenia</div>
  }
  
  // Dynamiczne ustawienie kolorów w zależności od motywu (jasny/ciemny)
  // Kolory te będą zmieniane za pomocą stylów CSS, które dodam poniżej w <style>
  const strokeColor = "var(--stroke-color)" // Będzie gray-400 w light, gray-300 w dark
  const labelColor = "var(--label-color)" // Będzie gray-700 w light, gray-200 w dark


  return (
    // Zmieniono kontener, aby wypełniał całą dostępną przestrzeń
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      
      {/* Dynamiczne style dla motywu (dark/light) */}
      <style jsx>{`
        /* Domyślny (jasny) motyw */
        .drawing-container {
          --stroke-color: #9CA3AF; /* gray-400 */
          --label-color: #374151; /* gray-700 */
        }
        
        /* Ciemny motyw */
        .dark .drawing-container {
          --stroke-color: #D1D5DB; /* gray-300 */
          --label-color: #E5E7EB; /* gray-200 */
        }
      `}</style>
      
      {/* Kolor tytułu dostosowany do ciemnego tła terminala */}
      <h4 className="text-lg font-semibold text-gray-300 mb-4">{title}</h4> 
      <svg ref={svgRef} viewBox="0 0 100 60" className="w-full h-full max-w-lg drawing-container">
        {elements.map((el) => (
          <g key={el.id}>
            {el.type === "rect" && (
              <rect
                className="drawing-path"
                x={el.x}
                y={el.y}
                width={el.width}
                height={el.height}
                rx={el.rx || 0}
                fill="none"
                // Używamy zmiennych CSS
                stroke={strokeColor} 
                strokeWidth="0.5" // Zwiększona grubość dla lepszej widoczności
                strokeDasharray={el.id === 'frame' ? '1 0' : '0.5 0.5'} // Linia przerywana dla elementów wewnętrznych
              />
            )}
            {el.type === "path" && (
              <path
                className="drawing-path"
                d={el.d}
                fill="none"
                stroke={strokeColor}
                strokeWidth="0.5"
                strokeDasharray="0.5 0.5" // Linia przerywana
              />
            )}
            <text
              className="drawing-label"
              x={el.labelX || (el.x ? el.x + 2 : 0)}
              y={el.labelY || (el.y ? el.y - 2 : 0)}
              // Używamy zmiennych CSS
              fill={labelColor} 
              fontSize="3" // Zwiększony rozmiar
              textAnchor={el.id === 'frame' ? 'middle' : 'start'} // Wyśrodkowanie dla głównego kontenera
              fontFamily="sans-serif" // Bardziej czytelna czcionka
            >
              {el.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default PlanningDrawing;