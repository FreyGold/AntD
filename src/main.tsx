import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import MainLayout from "@/layouts/MainLayout";
import App from "@/App";
import { UiProvider } from "./services/context/UiProvider";
import ToDo from "./pages/dashboard/ToDo";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      children: [
         { index: true, element: <App /> },
         { path: "/todo", element: <ToDo /> },
      ],
   },
]);

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <UiProvider>
         <RouterProvider router={router} />
      </UiProvider>
   </StrictMode>
);
