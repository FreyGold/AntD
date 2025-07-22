import { Plus, ChevronRight } from "lucide-react";
import TableRow from "./TableRow";
import { DroppableArea } from "@/components/shared/DND";

import type { ITask } from "@/services/types/ITask";
import { SortableContext } from "@dnd-kit/sortable";
import { Button } from "antd";
import ModalButton from "../Modal/ModalButton";
import { useState } from "react";

const TodoList = ({
   tasks,
   activeId,
   columnType: columnId,
}: {
   tasks: ITask[];
   activeId: string | null;
   columnType: string;
}) => {
   const TableLabel = () => {
      switch (columnId) {
         case "1":
            return "To Do";
         case "2":
            return "In Progress";
         case "3":
            return "Done";
         default:
            return "To Do";
      }
   };
   const [open, setOpen] = useState(true);
   return (
      <div className="flex-1 min-w-full max-w-5xl bg-card border border-border rounded-lg shadow-sm">
         <div
            className="flex items-center gap-2 px-4 py-3 border-b border-border w-full bg-[var(--c-background-dark)] h-10 cursor-pointer"
            onClick={() => setOpen(!open)}>
            <ChevronRight
               className={`w-4 h-4 text-muted-foreground transition-transform ${
                  open ? "rotate-90" : ""
               }`}
            />
            <h2 className="text-sm font-medium text-foreground">
               {TableLabel()}
            </h2>
            <span className="bg-background text-secondary-foreground rounded-full text-xs px-2 py-0.5 h-5 flex items-center">
               {tasks.length}
            </span>
         </div>

         <div
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
               open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}>
            <div className="overflow-hidden">
               <div className="divide-y divide-border">
                  <SortableContext id={columnId} items={tasks}>
                     {tasks.map((todo) => (
                        <TableRow
                           key={todo.id}
                           todo={todo}
                           activeId={activeId}
                           columnId={columnId}
                        />
                     ))}
                  </SortableContext>
               </div>

               <div className="px-4 py-3 border-t border-border ml-3 h-10 flex items-center">
                  <ModalButton columnId={columnId} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default TodoList;
