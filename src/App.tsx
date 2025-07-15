import ThemeToggleButton from "./components/ToggleTheme";
import { UiProvider } from "./services/context/UiProvider";

import "@/assets/styles/global.css";

function App() {
   return (
      <UiProvider>
         <div className="w-full h-full flex justify-center items-center bg-background-dark text-primary rounded-4xl">
            <ThemeToggleButton></ThemeToggleButton>
         </div>
      </UiProvider>
   );
}

export default App;
