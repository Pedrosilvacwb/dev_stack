"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";

interface ThemeContextValue {
  mode: "light" | "dark" | "system";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark" | "system">>;
}

export const ThemeContext = createContext({} as ThemeContextValue);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark" | "system">("light");

  const handleToggleTheme = useCallback(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    handleToggleTheme();
  }, [mode, handleToggleTheme]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
