import type { ITask } from "@/services/types/ITask";
import { Calendar1, MoreHorizontal } from "lucide-react";
import Tags from "../shared/Tags";
import { useDraggable } from "@dnd-kit/core";
import EditTaskModalButton from "../Modal/EditTaskModalButtons";

function KanbanCard({ todo, isOverlay }: { todo: ITask; isOverlay?: boolean }) {
   const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
      id: todo.id,
   });
   const subtasks = todo.subtasks || [];
   const completedSubtasksCount = subtasks.filter(
      (subtask) => subtask.completed
   ).length;
   const totalSubtasksCount = subtasks.length;
   return (
      <div
         className="flex flex-col gap-4 rounded-2xl bg-background p-6"
         ref={setNodeRef}
         {...attributes}
         {...listeners}>
         <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{todo.title}</h3>
            <EditTaskModalButton
               task={todo}
               icon={<MoreHorizontal className="text-text/60" />}
            />
         </div>
         {!isDragging && !isOverlay && todo.imageUrl && (
            <img
               src={todo.imageUrl}
               alt="img"
               className="rounded-2xl max-h-[300px] w-full object-center object-cover"
            />
         )}
         <p className="p-2 text-sm font-light line-clamp-4">
            {todo.description}
         </p>
         <div className="flex justify-between">
            <div className="flex gap-2">
               <Tags todo={todo} />
            </div>
            {todo.assignee && (
               <div className="w-6 h-6 rounded-full bg-primary/20 text-primary-dark flex items-center justify-center">
                  <span className="text-xs font-medium">
                     {todo.assignee.initials}
                  </span>
               </div>
            )}
         </div>
         <div className="border-t-2 border-t-background-dark pt-4 w-full"></div>
         <div className="flex justify-between items-center">
            <div className="">
               {subtasks.length > 0 &&
                  `${completedSubtasksCount} / ${totalSubtasksCount}`}
            </div>
            <div className="">
               {todo.date && (
                  <div className="flex items-center gap-2">
                     <Calendar1 size="1.2rem" opacity="0.7" />
                     <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {todo.date as string}
                     </span>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default KanbanCard;
