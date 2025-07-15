import "@/assets/styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ToDo from "./pages/dashboard/ToDo";
import Home from "./pages/dashboard/Home";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      children: [
         { index: true, element: <Home /> },
         { path: "/todo", element: <ToDo /> },
      ],
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
