import {
   createContext,
   useContext,
   useMemo,
   useState,
   type ReactNode,
} from "react";
type Theme = "light" | "dark" | "system";

interface ThemeContextType {
   theme: Theme;
   toggleTheme: () => void;
   isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const DarkLightProvider = ({ children }: { children: ReactNode }) => {
   const [theme, setTheme] = useState<Theme>("light");

   const toggleTheme = () => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
   };
   const isDark = useMemo(() => {
      return (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
   }, [theme]);
   return (
      <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
         {children}
      </ThemeContext.Provider>
   );
};

export const useDarkLightContext = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useTheme must be used within a DarkLightProvider");
   }
   return context;
};
