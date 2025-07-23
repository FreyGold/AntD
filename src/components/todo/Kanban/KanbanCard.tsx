import type { ITask } from "@/services/types/ITask";
import { Calendar1, MoreHorizontal } from "lucide-react";
import Tags from "../shared/Tags";

function KanbanCard({ todo }: { todo: ITask }) {
   return (
      <div className="flex flex-col gap-4 rounded-2xl bg-background p-6">
         <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">{todo.title}</p>
            <MoreHorizontal />
         </div>
         {todo.imageUrl && (
            <div className="rounded-2xl">
               <img src={todo.imageUrl} alt="Sukuna vs Kashimo" />
            </div>
         )}
         <div className="p-2 text-sm font-light ">{todo.description}</div>
         <div className="flex justify-between">
            <div className="flex gap-2">
               <Tags todo={todo} />
            </div>
            {todo.assignee && (
               <div className="w-6 h-6 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center">
                  <span className="text-xs font-medium">
                     {todo.assignee.initials}
                  </span>
               </div>
            )}
         </div>
         <div className="border-t-2 border-t-background-dark pt-4 w-full"></div>
         {/* ASK: how to make this border span the whole card */}
         <div className="flex justify-between items-center">
            <div className="">2/5</div>
            {/* //TODO: subtasks */}
            <div className="">
               {todo.date && (
                  <div className="flex items-center gap-2">
                     <Calendar1 size="1.2rem" opacity="0.7" />
                     <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {todo.date}
                     </span>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default KanbanCard;
