import Input from "@/UI/Input";
import { BellOutlined, DownOutlined } from "@ant-design/icons";

function Bar() {
   return (
      <div className="flex items-center justify-between px-6 py-3 mt-8 mx-20 rounded-4xl h-15 bg-background">
         <Input />
         {/* // is this a correct approach? // moved to UI folder */}
         {/* { switch to ant component in the next iteration} */}
         <div className="flex items-center w-44 gap-2 justify-between">
            <BellOutlined style={{ fontSize: "1.7rem" }} />
            <div className="flex items-center flex-1 gap-3 justify-between">
               <img src="src/assets/user.png" alt="avatar" className="size-8" />
               <div className="flex flex-col text-[8px] flex-1 justify-center">
                  <p className="text-[10px]">Workspace</p>
                  <div className="flex gap-1 items-center">
                     <p className="text-[12px]">Ahmed Tawfik</p>
                     <DownOutlined />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Bar;
