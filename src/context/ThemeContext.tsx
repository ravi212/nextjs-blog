"use client"
import React, { createContext, useState } from "react";
export const ThemeContext = createContext({} as ThemeContextProps);

import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// A Context provider for theme
const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  // fucntion to switch theme to light or dark
  const switchThemeTo = (theme: string) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchThemeTo }}>
      <body
        className={`${theme} ${inter.className} ${poppins.className} flex-1 anim min-h-screen bg-background`}
      >
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
