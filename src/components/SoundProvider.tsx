'use client';

import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';

// Zakładam, że ścieżki do dźwięków są poprawne
// Możemy je załadować leniwie, np. używając hooka
const SOUND_PATHS = {
  transition: '/sounds/transition.mp3',
  shine: '/sounds/shine.mp3',
  sweep: '/sounds/sweep.mp3',
  whoosh: '/sounds/whoosh.mp3',
};

// Definicja typu dla kontekstu
type SoundContextType = {
  // Funkcja do odtwarzania dźwięku
  playSound: (name: keyof typeof SOUND_PATHS) => void;
  // Stan ładowania
  isLoaded: boolean;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Hook dla ułatwienia dostępu do funkcji
export const useSounds = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSounds musi być użyty wewnątrz SoundProvider');
  }
  return context;
};

// Komponent dostawcy, który ładuje dźwięki po pierwszym renderowaniu
interface SoundProviderProps {
  children: ReactNode;
  // Wymagamy flagi, która określa, kiedy można zacząć ładowanie (np. po preloaderze)
  canLoad: boolean; 
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children, canLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRefs = useRef<Record<keyof typeof SOUND_PATHS, HTMLAudioElement>>({} as any);

  useEffect(() => {
    if (!canLoad || isLoaded) return;

    // Funkcja do wczytania wszystkich dźwięków
    const loadSounds = () => {
      const promises = Object.entries(SOUND_PATHS).map(([key, path]) => {
        return new Promise<void>((resolve, reject) => {
          const audio = new Audio(path);
          audio.preload = 'auto'; // Użycie preload 'auto'
          
          audio.oncanplaythrough = () => {
            audioRefs.current[key as keyof typeof SOUND_PATHS] = audio;
            resolve();
          };
          audio.onerror = (e) => {
            console.error(`Nie udało się załadować dźwięku: ${path}`, e);
            reject(e);
          };
          // Wymuszenie wczytania, aby wywołać oncanplaythrough
          audio.load(); 
        });
      });

      Promise.all(promises)
        .then(() => setIsLoaded(true))
        .catch(error => {
          console.error('Błąd podczas ładowania dźwięków:', error);
          // W przypadku błędu wciąż oznaczamy jako załadowane, aby nie blokować aplikacji
          setIsLoaded(true); 
        });
    };

    loadSounds();

  }, [canLoad, isLoaded]); // Uruchomienie tylko, gdy 'canLoad' się zmieni na true

  const playSound = (name: keyof typeof SOUND_PATHS) => {
    if (isLoaded && audioRefs.current[name]) {
      const audio = audioRefs.current[name];
      audio.currentTime = 0; // Zresetuj, jeśli już gra
      audio.play().catch(e => console.error(`Błąd odtwarzania dźwięku ${name}:`, e));
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, isLoaded }}>
      {children}
    </SoundContext.Provider>
  );
};