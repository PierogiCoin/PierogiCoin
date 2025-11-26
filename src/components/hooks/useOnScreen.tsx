import { useState, useEffect, useMemo, RefObject } from 'react';

/**
 * Opcje konfiguracyjne dla IntersectionObserver.
 * Rozszerza standardowe IntersectionObserverInit o opcję `triggerOnce`.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
 */
interface OnScreenOptions extends IntersectionObserverInit {
  /** 
   * Czy observer powinien przestać obserwować element po tym, jak stanie się on widoczny po raz pierwszy.
   * Idealne dla animacji "wejścia", aby oszczędzać zasoby.
   * @default true
   */
  triggerOnce?: boolean;
}

/**
 * Niezwykle wydajny i elastyczny hook React do wykrywania, czy element jest widoczny w viewport'cie.
 * Używa wbudowanego w przeglądarkę API IntersectionObserver dla maksymalnej wydajności.
 * 
 * @param ref Ref do elementu HTML, który ma być obserwowany (stworzony za pomocą `useRef`).
 * @param options Opcje konfiguracyjne dla IntersectionObserver (np. `threshold`, `rootMargin`).
 * @returns `true`, jeśli element jest widoczny zgodnie z podanymi opcjami, w przeciwnym razie `false`.
 * 
 * @example
 * const MyComponent = () => {
 *   const sectionRef = useRef(null);
 *   // Uruchom animację, gdy co najmniej 50% elementu jest widoczne
 *   const isVisible = useOnScreen(sectionRef, { threshold: 0.5 });
 * 
 *   return (
 *     <section ref={sectionRef} className={isVisible ? 'animate-fade-in' : 'opacity-0'}>
 *       Treść sekcji
 *     </section>
 *   );
 * }
 */
const useOnScreen = (
  ref: RefObject<HTMLElement>,
  options?: OnScreenOptions
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  // Używamy useMemo, aby uniknąć niepotrzebnego ponownego tworzenia obiektu opcji
  // przy każdym renderowaniu komponentu nadrzędnego.
  const memoizedOptions = useMemo(() => options, [options]);
  const { triggerOnce = true, ...observerOptions } = memoizedOptions || {};

  useEffect(() => {
    // Pobieramy referencję. Jeśli nie istnieje, nic nie robimy.
    const currentRef = ref.current;
    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jeśli element przecina się z viewportem (jest widoczny)
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Jeśli opcja `triggerOnce` jest włączona, natychmiast przestajemy obserwować.
          // To jest kluczowa optymalizacja wydajności dla animacji "wejścia".
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else {
          // Opcjonalnie: jeśli chcesz, aby stan wracał do `false`, gdy element znika z ekranu.
          // Domyślnie, dla animacji "wejścia", tego nie robimy.
          if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      observerOptions
    );

    observer.observe(currentRef);

    // Funkcja czyszcząca: przestajemy obserwować, gdy komponent jest niszczony (unmount).
    return () => {
      observer.disconnect();
    };
    // Zależymy od zserializowanych opcji, aby uniknąć problemów z porównywaniem obiektów w React 18.
    // To zapewnia, że useEffect uruchomi się ponownie tylko wtedy, gdy wartości w opcjach faktycznie się zmienią.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, JSON.stringify(observerOptions), triggerOnce]);

  return isVisible;
};

// Używamy eksportu domyślnego, ponieważ jest to standard w Twoim projekcie.
export default useOnScreen;
