import Bar from "@/components/Bar";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";

function MainLayout() {
   return (
      <div className="w-screen h-screen bg-auto flex justify-center items-center bg-background text-text font-[Inter]">
         <Sidebar />
         <div className="w-full h-full flex justify-center items-center bg-background-dark text-text rounded-4xl">
            <div className="flex flex-col justify-between flex-1 w-full h-full">
               <Bar />
               <Outlet />
            </div>
         </div>
      </div>
   );
}

export default MainLayout;
