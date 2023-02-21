import { createContext, useState, useEffect } from "react";

interface ThemeContextProps {
  isLightTheme: boolean;
  toggleTheme: () => void;
  theme1: string;
  theme2: string;
}

type ChildrenProps = {
  children: React.ReactNode;
};

const ThemeContext = createContext<ThemeContextProps | null>(null);

function ThemeProvider({ children }: ChildrenProps) {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsLightTheme((prev) => !prev);
  };

  const theme1 = isLightTheme ? "lightbg1" : "darkbg1";
  const theme2 = isLightTheme ? "lightbg2" : "darkbg2";

  const values: ThemeContextProps = {
    isLightTheme,
    toggleTheme,
    theme1,
    theme2,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
