import "@/assets/styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ToDo from "./pages/ToDo";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      children: [
         { index: true, element: <Navigate to="/dashboard" replace /> },
         { path: "/dashboard", element: <Dashboard /> },
         { path: "/todo", element: <ToDo /> },
      ],
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
