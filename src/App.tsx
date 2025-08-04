import "@/assets/styles/global.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ToDo from "./pages/ToDo";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutCard from "./components/LogoutCard";

const router = createBrowserRouter([
   {
      path: "/",
      element: (
         <ProtectedRoute>
            <MainLayout />
         </ProtectedRoute>
      ),
      children: [
         { index: true, element: <Navigate to="/dashboard" replace /> },
         {
            path: "dashboard",
            element: <Dashboard />,
            children: [
               { path: "todo", element: <ToDo /> },
               { path: "settings", element: <LogoutCard /> },
            ],
         },
      ],
   },
   { path: "/login", element: <Auth /> },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
