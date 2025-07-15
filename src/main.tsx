import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { UiProvider } from "./services/context/UiProvider";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <UiProvider>
         <App />
      </UiProvider>
   </StrictMode>
);
