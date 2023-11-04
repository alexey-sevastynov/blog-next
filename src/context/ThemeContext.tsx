"use client";

import { useState, createContext } from "react";

export interface ThemeContextData {
  mode: string;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("dark");
  const toggle = () => setMode((prev) => (prev === "dark" ? "light" : "dark"));
  0;

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
