import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 rounded-full w-12 h-12 bg-background/30 backdrop-blur-md border border-border/50 shadow-2xl hover:bg-accent hover:text-accent-foreground transition-all overflow-hidden"
      aria-label="Toggle Theme"
    >
      <Sun
        className={`absolute h-6 w-6 text-orange-500 transition-all duration-500 ease-in-out
          ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }
        `}
      />
      <Moon
        className={`absolute h-6 w-6 text-blue-500 transition-all duration-500 ease-in-out
          ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }
        `}
      />
    </Button>
  );
}
