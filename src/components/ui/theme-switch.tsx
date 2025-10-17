import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const THEME_STORAGE_KEY = "app-theme";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: string) => {
    const html = document.documentElement;
    if (newTheme === "dark") {
      html.setAttribute("data-theme", "dark");
    } else {
      html.removeAttribute("data-theme");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className=" z-50 w-10 h-10 rounded-full backdrop-blur-md bg-white/15 dark:bg-black/15 border border-white/25 dark:border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/25 dark:hover:bg-black/25 group"
      aria-label="Toggle theme"
    >
      <div className="w-7 h-7 rounded-full backdrop-blur-sm bg-white/30 dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/40 dark:group-hover:bg-white/20">
        {theme === "light" ? (
          <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-slate-300 transition-transform duration-300" />
        )}
      </div>
    </button>
  );
}
