import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { UiProvider } from "./services/context/UiProvider";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <Auth0Provider
         domain={import.meta.env.VITE_AUTH0_DOMAIN}
         clientId={import.meta.env.VITE_AUTH0_CLIENTID}
         authorizationParams={{
            redirect_uri: `${window.location.origin}/dashboard`,
         }}>
         <UiProvider>
            <App />
         </UiProvider>
      </Auth0Provider>
   </StrictMode>
);
