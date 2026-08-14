"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("vs-auto-mart-theme");
    if (savedTheme === "light") {
      setIsLight(true);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    setIsLight((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("vs-auto-mart-theme", "light");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("vs-auto-mart-theme", "dark");
      }
      return next;
    });
  };

  if (!mounted) return <div className="h-10 w-10" />;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-graphite-900/40 border border-brass-500/20 text-brass-400 backdrop-blur-md transition-all hover:scale-110 hover:bg-graphite-800"
    >
      {isLight ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )}
    </button>
  );
}
