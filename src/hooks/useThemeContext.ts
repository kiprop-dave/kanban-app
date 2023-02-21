import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

export const useThemeContext = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return theme;
};

export default useThemeContext;
