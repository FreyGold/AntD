import { Outlet } from "react-router";

function MainLayout() {
   return (
      <div className="w-screen h-screen bg-auto flex justify-center items-center bg-[url(src/assets/backgrounds/light.png)]">
         <div className="w-[80%] h-[80%]">
            <Outlet />
         </div>
      </div>
   );
}

export default MainLayout;
