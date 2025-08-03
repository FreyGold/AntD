import LoginButton from "@/components/shared/LoginButton";
import LogoutButton from "@/components/shared/LogoutButton";
import Profile from "@/components/shared/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { Spin } from "antd";
import { Outlet } from "react-router";

function Dashboard() {
   const { isAuthenticated } = useAuth0();

   if (!isAuthenticated) {
      return (
         <div>
            <Spin size="large" fullscreen />
         </div>
      );
   }
   return <Outlet />;
}

export default Dashboard;
