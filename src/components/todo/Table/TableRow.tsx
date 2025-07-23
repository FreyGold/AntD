import {
   Paperclip,
   MessageSquare,
   Calendar,
   Users as UsersAvatar,
   Flag,
   ChevronRight,
   Lock,
   Calendar1,
   GripHorizontalIcon,
} from "lucide-react";
import { DraggableItem } from "@/components/shared/DND";
import type { ITask } from "@/services/types/ITask";
import { Button, Checkbox, Popconfirm, type PopconfirmProps } from "antd";
import {
   useDeleteTask,
   useUpdateTask,
} from "@/services/hooks/tasks-react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteColumnId } from "@/services/hooks/columns-react-query";
import Tags from "../shared/Tags";

function TableRow({
   todo,
   activeId,
   columnId,
}: {
   todo: ITask;
   activeId?: string | null;
   columnId: string | null;
}) {
   const { mutate } = useUpdateTask();
   const { mutate: deleteTask } = useDeleteTask();
   const { mutate: deleteColumnId } = useDeleteColumnId();

   const confirm: PopconfirmProps["onConfirm"] = (e) => {
      deleteTask(todo.id);
      deleteColumnId({ id: todo.id, type: todo.type });
   };

   const cancel: PopconfirmProps["onCancel"] = (e) => {};

   const handleCheckboxChange = (e: any) => {
      console.log("please");
      mutate({ id: todo.id, task: { completed: e.target.checked } });
   };

   const getPriorityColor = (priority?: string) => {
      switch (priority) {
         case "high":
            return "text-red-500";
         case "medium":
            return "text-yellow-500";
         case "low":
            return "text-green-500";
         default:
            return "text-muted-foreground";
      }
   };
   const style = todo.id === activeId ? "opacity-90" : "";
   return (
      <DraggableItem id={todo.id} type={columnId}>
         <div
            id={todo.id}
            className={`flex items-center gap-2 px-4 py-2.5 hover:bg-muted/30 transition-colors group ${style}`}>
            <div className="w-4 justify-center hidden group-hover:block">
               <GripHorizontalIcon size="1rem" />
            </div>
            <div className="w-4 flex justify-center">
               {todo.hasChildren ? (
                  <button className="text-muted-foreground hover:text-foreground">
                     <ChevronRight className="w-3 h-3" />
                  </button>
               ) : (
                  ""
               )}
            </div>

            {/* Checkbox */}
            <Checkbox
               // TODO: use the checked only when you implement the api calls
               checked={todo.completed}
               onChange={handleCheckboxChange}
               id={todo.id}
               className="w-4 h-4 accent-primary"
            />

            {/* Content */}
            <div className="flex-1 min-w-0 flex items-center gap-2">
               <span
                  className={`text-sm ${
                     todo.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                  }`}>
                  {todo.title}
               </span>

               {/* Icons section */}
               <div className="flex items-center gap-2 text-muted-foreground mx-2">
                  {/* Attachments */}
                  {todo.attachments && (
                     <div className="flex items-center gap-1">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span className="text-xs">{todo.attachments}</span>
                     </div>
                  )}

                  {/* Comments */}
                  {todo.comments && (
                     <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="text-xs">{todo.comments}</span>
                     </div>
                  )}

                  {/* Users icon */}
                  {todo.hasUsers && <UsersAvatar className="w-3.5 h-3.5" />}

                  {/* Lock icon */}
                  {todo.hasLock && <Lock className="w-3.5 h-3.5" />}

                  {/* Calendar icon */}
                  {todo.hasCalendar && <Calendar className="w-3.5 h-3.5" />}
               </div>

               {/* Tags */}
               <Tags todo={todo} />
            </div>

            {/* Right side - Table columns */}
            <div className="flex items-center">
               {/* Table Columns */}
               <div className="flex items-center">
                  {/* Assignee Column */}
                  <div className="w-14 flex justify-center border-r border-border pr-4 mr-4">
                     {todo.assignee && (
                        <div className="w-5 h-5 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center">
                           <span className="text-xs font-medium">
                              {todo.assignee.initials}
                           </span>
                        </div>
                     )}
                     {!todo.assignee && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center">
                           <span className="text-xs font-medium">
                              <UsersAvatar size="1.2rem" opacity="0.7" />
                           </span>
                        </div>
                     )}
                  </div>

                  {/* Due Date Column */}
                  <div className="w-33 flex justify-center border-r border-border pr-4 mr-4">
                     {todo.date && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                           {todo.date}
                        </span>
                     )}
                     {!todo.date && (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                           <Calendar1 size="1.2rem" opacity="0.7" />
                        </span>
                     )}
                  </div>

                  {/* Priority Column */}
                  <div className="w-9 flex justify-center border-r border-border pr-4">
                     <Flag
                        className={`w-3.5 h-3.5 ${getPriorityColor(
                           todo.priority
                        )}`}
                     />
                  </div>
                  {/* Empty column */}
                  <div className="ml-3 w-6 flex justify-center opacity-80 scale-90 hover:opacity-100 hover:scale-100">
                     <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <Button
                           ghost
                           icon={<DeleteOutlined />}
                           shape="circle"
                           color="danger"
                           style={{ color: "var(--c-danger)" }}
                           size="small"></Button>
                     </Popconfirm>
                  </div>
               </div>
            </div>
         </div>
      </DraggableItem>
   );
}

export default TableRow;
