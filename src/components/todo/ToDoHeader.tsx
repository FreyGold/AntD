import ModalButton from "./Modal/ModalButton";
import { Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

function ToDoHeader({
   view,
   setView,
}: {
   view: "List" | "Kanban";
   setView: React.Dispatch<React.SetStateAction<"List" | "Kanban">>;
}) {
   return (
      <div className="flex items-center justify-between mt-2 mr-6 rounded-4xl h-15">
         <div className="flex justify-between w-full">
            <Segmented
               value={view}
               onChange={(val) => setView(val as "List" | "Kanban")}
               options={[
                  { value: "List", icon: <BarsOutlined /> },
                  { value: "Kanban", icon: <AppstoreOutlined /> },
               ]}
            />
            <div className="w-24">
               <ModalButton variant="outlined" color="primary" />
            </div>
         </div>
      </div>
   );
}

export default ToDoHeader;
