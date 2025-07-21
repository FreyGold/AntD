import { Plus, ChevronRight } from "lucide-react";
import TableRow from "./TableRow";
import { DroppableArea } from "@/components/shared/DND";

import type { ITask } from "@/services/types/ITask";

const TodoList = ({
   tasks,
   activeId,
   columnType: columnId,
}: {
   tasks: ITask[];
   activeId: string | null;
   columnType: string;
}) => {
   return (
      <div className="flex-1 min-w-full max-w-5xl bg-card border border-border rounded-lg shadow-sm">
         <div className="flex items-center gap-2 px-4 py-3 border-b border-border w-full bg-[var(--c-background-dark)] h-10">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-foreground">To-Do</h2>
            <span className="bg-background text-secondary-foreground rounded-full text-xs px-2 py-0.5 h-5 flex items-center">
               {tasks.length}
            </span>
         </div>

         <div className="divide-y divide-border">
            {tasks.map((todo) => (
               <DroppableArea id={todo.id} key={todo.id} type={columnId}>
                  <div>
                     <TableRow
                        todo={todo}
                        activeId={activeId}
                        columnId={columnId}
                     />
                  </div>
               </DroppableArea>
            ))}
         </div>

         <div className="px-4 py-3 border-t border-border ml-3 h-10 flex items-center">
            {/* //TODO: change to antD button */}
            <button className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 text-sm h-8 px-2 rounded-md transition-colors flex items-center gap-2 ">
               <Plus className="w-4 h-4 mr-1" />
               Add Task
            </button>
         </div>
      </div>
   );
};

export default TodoList;
