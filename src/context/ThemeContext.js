"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children, initialTheme = "light", activeSection }) => {
  const [theme, setTheme] = useState(initialTheme);
  
  // Update theme based on active section
  useEffect(() => {
    const sections = [
      { theme: "light" }, // section 0
      { theme: "dark" },  // section 1
      { theme: "light" }, // section 2
      { theme: "dark" },  // section 3
    ];
    
    if (sections[activeSection]) {
      setTheme(sections[activeSection].theme);
    }
  }, [activeSection]);
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(`${theme}-theme`);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
