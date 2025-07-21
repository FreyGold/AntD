import ViewSelector from "@/components/todo/ViewSelector";
import ModalButton from "./Modal/Modal";

function ToDoHeader() {
   return (
      <div className="flex items-center justify-between mt-2 mr-6 rounded-4xl h-15">
         <div className="flex justify-between w-full">
            <ViewSelector />
            <div className="w-24">
               <ModalButton variant="outlined" color="primary"></ModalButton>
            </div>
         </div>
      </div>
   );
}

export default ToDoHeader;
