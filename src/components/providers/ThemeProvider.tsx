"use client";
import ThemeContextProvider from "@/context/ThemeContext";
import React from "react";

// A client component to wrap everything under the theme context
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};

export default ThemeProvider;
