'use client';

import {Moon, Sun} from 'lucide-react';
import {useEffect, useState} from 'react';

type Theme = 'light' | 'dark';

const themeStorageKey = 'qiubithub-theme';

function readCurrentTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'light';
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function applyTheme(nextTheme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', nextTheme === 'dark');
  root.dataset.theme = nextTheme;

  try {
    window.localStorage.setItem(themeStorageKey, nextTheme);
  } catch {
    // localStorage can be blocked in hardened browsers.
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(readCurrentTheme());
  }, []);

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="切换颜色模式"
      title="切换颜色模式"
      onClick={() => {
        const nextTheme = isDark ? 'light' : 'dark';
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
    >
      {isDark ? <Sun size={17} aria-hidden /> : <Moon size={17} aria-hidden />}
    </button>
  );
}
