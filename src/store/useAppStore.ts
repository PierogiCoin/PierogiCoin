// W pliku: store/useAppStore.ts

'use client';

import { create } from 'zustand';
import Lenis from '@studio-freight/lenis'; 

// 1. Zdefiniuj typ dla motywu
type Theme = 'light' | 'dark';

// Definicja ostatecznego, kompletnego stanu całej aplikacji
interface AppState {
  // Stan dla preloadera i nawigacji
  isPreloaderFinished: boolean;
  activeSection: string;
  finishPreloader: () => void;
  setActiveSection: (sectionId: string) => void;

  // --- KLUCZOWE POPRAWKI DLA BŁĘDU TYPOWANIA ---
  // Stan Motywu i Montowania
  theme: Theme; // DODANE
  mounted: boolean; // DODANE
  
  // Akcje Motywu
  toggleTheme: () => void; // DODANE
  setMounted: (mounted: boolean) => void; // DODANE
  // ----------------------------------------------

  // Stan dla "trybu skupienia"
  isFocusMode: boolean;
  currentProjectIndex: number | null;
  focusElement: HTMLElement | null;
  enterFocusMode: (index: number, element: HTMLElement) => void;
  exitFocusMode: () => void;

  // Stan dla niestandardowego kursora
  isHoveringInteractive: boolean;
  setIsHoveringInteractive: (isHovering: boolean) => void;
  
  // Stan dla Lenis
  lenisInstance: Lenis | null;
  setLenisInstance: (instance: Lenis | null) => void;
}

// Implementacja kompletnego store'a
export const useAppStore = create<AppState>((set, get) => ({
  // --- WARTOŚCI POCZĄTKOWE ---
  isPreloaderFinished: false,
  activeSection: 'hero',
  isFocusMode: false,
  currentProjectIndex: null,
  focusElement: null,
  isHoveringInteractive: false,
  lenisInstance: null, 

  // --- WARTOŚCI POCZĄTKOWE DLA MOTYWU ---
  theme: (typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme) || 'dark' : 'dark'),
  mounted: false,
  // ------------------------------------

  // --- METODY (AKCJE) ---
  finishPreloader: () => set({ isPreloaderFinished: true }),
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
  
  // --- METODY DLA MOTYWU ---
  setMounted: (mounted) => set({ mounted }),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        // Opcjonalnie: Ustawienie klasy na elemencie <html>
        document.documentElement.className = newTheme;
    }
    return { theme: newTheme };
  }),
  // ------------------------------------
  
  enterFocusMode: (index, element) => set({
    isFocusMode: true,
    currentProjectIndex: index,
    focusElement: element,
  }),
  exitFocusMode: () => set({
    isFocusMode: false,
    currentProjectIndex: null,
    focusElement: null,
  }),

  setIsHoveringInteractive: (isHovering) => set({ isHoveringInteractive: isHovering }),
  
  setLenisInstance: (instance) => set({ lenisInstance: instance }), 
}));