import { createContext, useContext, useState, useEffect } from 'react';
import type { ThemeId } from './themes';
import { DEFAULT_THEME } from './themes';

const STORAGE_KEY = 'autodeck-theme';

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as ThemeId) ?? DEFAULT_THEME;
  });

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    localStorage.setItem(STORAGE_KEY, id);
    document.documentElement.dataset.theme = id;
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
