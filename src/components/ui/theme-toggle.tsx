"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative h-10 w-10 rounded-lg bg-zinc-100 transition-all hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      aria-label="Toggle theme"
    >
      <Sun className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-0 scale-100 text-zinc-900 transition-all group-hover:rotate-12 dark:rotate-90 dark:scale-0" />
      <Moon className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 text-zinc-100 transition-all group-hover:-rotate-12 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
