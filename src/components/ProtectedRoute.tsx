import { useAuth0 } from "@auth0/auth0-react";
import { Spin } from "antd";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
   const { isAuthenticated, isLoading } = useAuth0();

   if (isLoading)
      return (
         <div>
            <Spin size="large" fullscreen />
         </div>
      );

   if (isAuthenticated) {
      return children;
   } else {
      return <Navigate to="/login" />;
   }
}

export default ProtectedRoute;
