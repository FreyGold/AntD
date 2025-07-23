import type { ITask } from "@/services/types/ITask";
import KanbanCard from "./KanbanCard";
import { MoreHorizontal, Plus } from "lucide-react";
import ModalButton from "../Modal/ModalButton";

function Kanban({ tasks }: { tasks: ITask[] }) {
   const TableLabel = () => {
      switch (tasks.at(0)?.type) {
         case "todo":
            return "To-Do";
         case "progress":
            return "In Progress";
         case "done":
            return "Done";
      }
   };
   const columnTypeId = () => {
      switch (tasks.at(0)?.type) {
         case "todo":
            return "1";
         case "progress":
            return "2";
         case "done":
            return "3";
      }
   };
   return (
      <div className="">
         <div className="flex justify-between items-center">
            <div className="flex items-center mt-2 gap-2">
               <div className="text-2xl font-bold">{TableLabel()}</div>
               <span className="bg-background text-secondary-foreground rounded-full text-xs px-2 py-0.5 h-5 mt-1 flex items-center">
                  {tasks.length}
               </span>
            </div>
            <div className="flex gap-3 mr-6 text-text/60">
               <ModalButton
                  color="var(--c-text)"
                  type="kanban"
                  columnId={columnTypeId()}
               />
               <MoreHorizontal />
            </div>
         </div>
         <div className="grid-span-1 mt-6 flex flex-col gap-4">
            {tasks.map((task) => (
               <KanbanCard todo={task} key={task.id} />
            ))}
         </div>
      </div>
   );
}
export default Kanban;
