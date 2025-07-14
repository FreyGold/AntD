import { useDarkLightContext } from "@/services/context/DarkLightProvider";

export default function ThemeToggleButton() {
   const { theme, toggleTheme } = useDarkLightContext();

   return (
      <button onClick={toggleTheme}>
         Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
   );
}
