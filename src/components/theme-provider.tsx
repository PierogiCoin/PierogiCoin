'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
} from 'next-themes'

// OSTATECZNA POPRAWKA: Używamy React.ComponentProps, aby poprawnie pobrać typ propsów.
type CustomThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

// Używamy zdefiniowanego typu.
export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}