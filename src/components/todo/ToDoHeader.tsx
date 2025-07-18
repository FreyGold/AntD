import ViewSelector from "@/components/todo/ViewSelector";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

function ToDoHeader() {
   return (
      <div className="flex items-center justify-between mt-2 rounded-4xl h-15">
         <div className="flex justify-between w-full">
            <ViewSelector />
            <div className="w-24">
               <Button
                  icon={<PlusOutlined />}
                  variant="outlined"
                  color="primary"
                  block>
                  {/* block will make the button fit to the parent */}
                  Add Task
               </Button>
            </div>
         </div>
      </div>
   );
}

export default ToDoHeader;
