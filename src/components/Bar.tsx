import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

function Bar() {
   return (
      <div className="flex items-center justify-between px-6 py-3 mt-8 mx-20 rounded-4xl h-12 bg-background">
         <Input
            placeholder="test"
            type="text"
            variant="borderless"
            prefix={<SearchOutlined />}
            style={{
               width: "12rem",
               backgroundColor: "var(--c-background-dark)",
               borderRadius: "2rem",
            }}
            // is this a correct approach?
         />
         {/* { switch to ant component in the next iteration} */}
         <div className="flex items-center w-40 justify-between gap-4">
            <BellOutlined style={{ fontSize: "1.7rem" }} />
            <div className="flex items-center space-x-2">
               <img src="src/assets/user.png" alt="avatar" className="size-8" />
               <div className="flex flex-col text-[8px]">
                  <p>Workspace</p>
                  <p>Ahmed Tawfik</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Bar;
