import LoginButton from "@/components/shared/LoginButton";
import LogoutButton from "@/components/shared/LogoutButton";
import Profile from "@/components/shared/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {
   const { isAuthenticated } = useAuth0();

   return (
      <div className="w-full h-full flex justify-center items-center bg-background-dark text-text rounded-4xl">
         <div className="flex flex-col justify-between gap-16 overflow-auto no-scrollbar">
            {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
            <Profile />
         </div>
      </div>
   );
}

export default Dashboard;
