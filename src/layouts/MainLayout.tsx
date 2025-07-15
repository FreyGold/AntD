import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";

function MainLayout() {
   return (
      <div className="w-screen h-screen bg-auto flex justify-center items-center bg-background">
         <div className="w-[90%] h-[90%] flex justify-between items-center bg-border text-primary rounded-4xl">
            <Sidebar />
            <Outlet />
         </div>
      </div>
   );
}

export default MainLayout;
