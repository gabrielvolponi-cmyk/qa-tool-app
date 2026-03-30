import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppStore } from '@store/appStore';
import { createTheme, Theme } from './createTheme';

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useAppStore((s) => s.themeMode);
  const system = useColorScheme();

  const isDark = useMemo(() => {
    if (themeMode === 'system') return system === 'dark';
    return themeMode === 'dark';
  }, [themeMode, system]);

  const theme = useMemo(() => createTheme(isDark), [isDark]);

  const value = useMemo(() => ({ theme, isDark }), [theme, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
