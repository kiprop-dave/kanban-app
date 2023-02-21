import { createContext, useState, useEffect } from "react";

interface ThemeContextProps {
  isLightTheme: boolean;
  toggleTheme: () => void;
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

  return (
    <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
