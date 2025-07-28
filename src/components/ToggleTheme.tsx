import { useDarkLightContext } from "@/services/context/DarkLightProvider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggleButton() {
   const { theme, toggleTheme } = useDarkLightContext();

   // return (
   //    <button onClick={toggleTheme}>
   //       Switch to {theme === "light" ? "dark" : "light"} mode
   //    </button>
   // );
   return (
      <div
         className="relative flex px-2 h-8 w-16 justify-between bg-background-dark rounded-3xl items-center cursor-pointer transition-colors duration-300"
         onClick={toggleTheme}>
         {/* Ball */}
         <span
            className={`
            absolute top-1/2 -translate-y-1/2 right-1
            h-6 w-6 rounded-full  shadow-md transition-all duration-400
            ${
               theme === "dark"
                  ? "-translate-x-8 bg-black"
                  : "translate-x-0 bg-white"
            }
         `}
            style={{ zIndex: 1 }}
         />
         <div>{theme === "light" && <Sun color="black"></Sun>}</div>
         <div>{theme === "dark" && <Moon color="white"></Moon>}</div>
      </div>
   );
}
