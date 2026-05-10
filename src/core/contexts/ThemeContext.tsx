import { ConfigProvider, theme as antdTheme } from 'antd';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): Theme => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return (localStorage.getItem('theme') as Theme) || 'light';
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    const root = window.document.documentElement;
    root.classList.add('disable-transitions');
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove('disable-transitions');
      });
    });
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const antdThemeConfig = useMemo(
    () => ({
      algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        borderRadius: 8,
        colorPrimary: '#3b82f6',
      },
      components: {
        Table: {
          headerBg: theme === 'dark' ? '#1e2a3a' : '#f1f5f9',
          headerColor: theme === 'dark' ? '#cbd5e1' : '#475569',
          rowHoverBg: theme === 'dark' ? '#1e293b' : '#f8fafc',
          borderColor: theme === 'dark' ? '#1e293b' : '#e2e8f0',
          bodySortBg: theme === 'dark' ? '#1a2535' : '#f8fafc',
        },
        Pagination: {
          itemActiveBg: theme === 'dark' ? '#1d4ed8' : '#3b82f6',
          itemActiveColor: '#ffffff',
        },
        Input: {
          colorBgContainer: theme === 'dark' ? '#0f172a' : '#ffffff',
        },
        Select: {
          colorBgContainer: theme === 'dark' ? '#0f172a' : '#ffffff',
        },
        DatePicker: {
          colorBgContainer: theme === 'dark' ? '#0f172a' : '#ffffff',
        },
      },
    }),
    [theme]
  );

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
