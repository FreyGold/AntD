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
import {
   Button,
   Checkbox,
   List,
   Popconfirm,
   type CheckboxChangeEvent,
   type PopconfirmProps,
} from "antd";
import {
   useDeleteTask,
   useUpdateTask,
} from "@/services/hooks/tasks-react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteColumnId } from "@/services/hooks/columns-react-query";
import Tags from "../shared/Tags";
import { useState } from "react";

function TableRow({
   todo,
   activeId,
   columnId,
}: {
   todo: ITask;
   activeId?: string | null;
   columnId: string | null;
}) {
   const [subtasksOpen, setSubtasksOpen] = useState(false);
   const { mutate } = useUpdateTask();
   const { mutate: deleteTask } = useDeleteTask();
   const { mutate: deleteColumnId } = useDeleteColumnId();

   const handleSubtaskToggle = (event: CheckboxChangeEvent) => {
      const newSubtasks = todo.subtasks.map((subtask) =>
         subtask.id === event.target.id
            ? { ...subtask, completed: !subtask.completed }
            : subtask
      );

      mutate({
         id: todo.id,
         task: { subtasks: newSubtasks },
      });
   };

   const handleSubtasksToggle = () => {
      console.log(todo);

      setSubtasksOpen(!subtasksOpen);
   };

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
      <div>
         <DraggableItem id={todo.id} type={columnId}>
            <div
               id={todo.id}
               className={`flex items-center gap-2 px-4 py-2.5 hover:bg-muted/30 transition-colors group ${style}`}>
               <div className="w-4 justify-center hidden group-hover:block">
                  <GripHorizontalIcon size="1rem" />
               </div>
               <div className="w-4 flex justify-center">
                  {todo.subtasks && todo.subtasks.length > 0 ? (
                     <button
                        className="text-muted-foreground hover:text-foreground cursor-pointer"
                        onClick={handleSubtasksToggle}>
                        <ChevronRight
                           className={`w-4 h-4 text-muted-foreground transition-transform ${
                              subtasksOpen ? "rotate-90" : ""
                           }`}
                        />
                     </button>
                  ) : (
                     ""
                  )}
               </div>

               <Checkbox
                  checked={todo.completed}
                  onChange={handleCheckboxChange}
                  id={todo.id}
                  className="w-4 h-4 accent-primary"
               />

               <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span
                     className={`text-sm ${
                        todo.completed
                           ? "line-through text-muted-foreground"
                           : "text-foreground"
                     }`}>
                     {todo.title}
                  </span>

                  <div className="flex items-center gap-2 text-muted-foreground mx-2">
                     {todo.attachments && (
                        <div className="flex items-center gap-1">
                           <Paperclip className="w-3.5 h-3.5" />
                           <span className="text-xs">{todo.attachments}</span>
                        </div>
                     )}

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
                              {todo.date as string}
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
         {todo.subtasks && (
            <div
               className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  subtasksOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
               }`}>
               <div className="overflow-hidden">
                  <List
                     style={{
                        padding: "0 3rem",
                        marginBottom: "1rem",
                     }}
                     dataSource={todo.subtasks}
                     renderItem={(item) => (
                        <List.Item
                           style={{
                              padding: "8px",
                           }}>
                           <Checkbox
                              checked={item.completed}
                              style={{
                                 marginRight: "8px",
                              }}
                              onChange={handleSubtaskToggle}
                              id={item.id}
                              className="w-4 h-4 accent-primary"
                           />
                           {item.text}
                        </List.Item>
                     )}
                  />
               </div>
            </div>
         )}
      </div>
   );
}

export default TableRow;
