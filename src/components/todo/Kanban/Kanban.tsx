import type { ITask } from "@/services/types/ITask";
import KanbanCard from "./KanbanCard";
import { MoreHorizontal } from "lucide-react";
import ModalButton from "../Modal/ModalButton";
import { useDroppable } from "@dnd-kit/core";
import {
   SortableContext,
   verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../shared/SortableItem";

interface KanbanProps {
   tasks: ITask[];
   catId: string;
   activeId?: string | null;
   overId?: string | null;
}

function Kanban({ tasks, catId, activeId, overId }: KanbanProps) {
   const { setNodeRef: setColumnNodeRef, isOver } = useDroppable({
      id: catId,
   });

   const TableLabel = () => {
      switch (tasks.at(0)?.type || catId) {
         case "todo":
            return "To-Do";
         case "progress":
            return "In Progress";
         case "done":
            return "Done";
         default:
            return catId;
      }
   };

   const columnTypeId = () => {
      switch (tasks.at(0)?.type || catId) {
         case "todo":
            return "1";
         case "progress":
            return "2";
         case "done":
            return "3";
         default:
            return "1";
      }
   };

   const isActiveFromDifferentContainer =
      activeId && !tasks.some((task) => task.id === activeId);
   const isOverTaskInThisContainer =
      overId && tasks.some((task) => task.id === overId);

   const Placeholder = () => (
      <div className="min-h-[200px] bg-background border-2 border-dashed border-primary/50 rounded-2xl flex items-center justify-center opacity-70 transition-all duration-200 w-full animate-placeholder">
         <span className="text-sm text-primary font-medium">Drop here</span>
      </div>
   );

   return (
      <div className="min-h-[300px]" ref={setColumnNodeRef}>
         <div className="flex justify-between items-center">
            <div className="flex items-center mt-2 gap-2">
               <h2 className="text-2xl font-bold">{TableLabel()}</h2>
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
            <SortableContext
               items={tasks.map((task) => task.id)}
               strategy={verticalListSortingStrategy}>
               {tasks.map((task) => (
                  <div key={task.id}>
                     {isActiveFromDifferentContainer && overId === task.id && (
                        <div className="mb-4">
                           <Placeholder />
                        </div>
                     )}
                     <SortableItem id={task.id}>
                        <div
                           className={`transition-opacity duration-200 ${
                              activeId === task.id
                                 ? "opacity-50"
                                 : "opacity-100"
                           }`}>
                           <KanbanCard todo={task} />
                        </div>
                     </SortableItem>
                  </div>
               ))}
               {tasks.length === 0 && (
                  <div className="min-h-[200px] flex items-center justify-center text-text border-2 border-dashed border-border rounded-2xl">
                     {isOver ? <Placeholder /> : "Drop tasks here"}
                  </div>
               )}
               {tasks.length !== 0 &&
                  isActiveFromDifferentContainer &&
                  !isOverTaskInThisContainer && (
                     <div className="min-h-[200px] items-center justify-center w-full">
                        {isOver && <Placeholder />}
                     </div>
                  )}
            </SortableContext>
         </div>
      </div>
   );
}

export default Kanban;
