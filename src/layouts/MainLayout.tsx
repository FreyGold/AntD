import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";

function MainLayout() {
   return (
      <div
         className="w-screen h-screen bg-auto flex justify-center items-center bg-background text-text font-[Inter] overflow-hidden "
         role="region"
         aria-label="Main Application Area">
         <Sidebar />
         <main className="w-full h-full flex justify-center items-center bg-background-dark text-text rounded-4xl">
            <div className="flex flex-col justify-between flex-1 max-w-[95%] h-full overflow-auto no-scrollbar">
               <SearchBar />
               <div className="flex-1">
                  <Outlet />
               </div>
            </div>
         </main>
      </div>
   );
}

export default MainLayout;
