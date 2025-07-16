import Input from "@/UI/Input";
import { BellOutlined } from "@ant-design/icons";

function Bar() {
   return (
      <div className="flex items-center justify-between px-6 py-3 mt-8 mx-20 rounded-4xl h-15 bg-background">
         <Input />
         {/* // is this a correct approach? // moved to UI folder */}
         {/* { switch to ant component in the next iteration} */}
         <div className="flex items-center w-40 gap-2">
            <BellOutlined style={{ fontSize: "1.7rem" }} />
            <div className="flex items-center flex-1 gap-3">
               <img src="src/assets/user.png" alt="avatar" className="size-8" />
               <div className="flex flex-col text-[8px] flex-1 justify-center">
                  <p className="text-[8px]">Workspace</p>
                  <p className="text-[10px]">Ahmed Tawfik</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Bar;
