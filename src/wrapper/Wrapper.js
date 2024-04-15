"use client";
import Toaster from "@/common/Toaster";
import theme from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { createContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { apolloClient } from "@/graphql/index";
import { ApolloProvider } from "@apollo/client";

export const AddToCartContext = createContext();
export const ThemeContext = createContext();

const Wrapper = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [themeMode, setThemeMode] = useState("light");
  const currentTheme = theme(themeMode);

  useEffect(() => {
    const themeData = localStorage.getItem("theme");
    if (themeData) {
      setThemeMode(themeData);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={[themeMode, setThemeMode]}>
      <ThemeProvider theme={currentTheme}>
        <ApolloProvider client={apolloClient}>
          <AddToCartContext.Provider value={[cart, setCart]}>
            <Toaster />
            <Paper>{children}</Paper>
          </AddToCartContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Wrapper;
