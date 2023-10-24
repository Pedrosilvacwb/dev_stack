import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("Contextos devem ser usaddos dentro de um Provider");
  }

  return context;
};
