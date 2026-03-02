import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/src/context/ThemeContext';
import { Button } from '@/src/components/ui/Button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = root.classList.contains('dark');
    setResolvedTheme(isDark ? 'dark' : 'light');

    const observer = new MutationObserver(() => {
      const updatedIsDark = root.classList.contains('dark');
      setResolvedTheme(updatedIsDark ? 'dark' : 'light');
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      className="w-9 px-0 relative hover:bg-muted/50 transition-colors rounded-full"
    >
      <div className="relative h-[1.2rem] w-[1.2rem] flex items-center justify-center">
        <Sun className={`h-full w-full transition-all duration-500 absolute ${resolvedTheme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
        <Moon className={`h-full w-full transition-all duration-500 absolute ${resolvedTheme === 'light' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
