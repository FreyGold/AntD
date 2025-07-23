import { useGetColumns } from "@/services/hooks/columns-react-query";
import { useGetTasks } from "@/services/hooks/tasks-react-query";
import { useMemo } from "react";
import KanbanCard from "./KanbanCard";

function Kanban() {
   const { data: tasks, isLoading, isError, error } = useGetTasks();
   const { data: columns } = useGetColumns();

   const orderedColumns = useMemo(() => {
      if (!tasks?.length || !columns?.length) {
         return { todo: [], progress: [], done: [] };
      }

      const taskMap = Object.fromEntries(tasks.map((t) => [t.id, t]));

      const todo =
         columns
            .find((c) => c.type === "todo")
            ?.tasksIdsOrder.map((id) => taskMap[id])
            .filter(Boolean) ?? [];

      const progress =
         columns
            .find((c) => c.type === "progress")
            ?.tasksIdsOrder.map((id) => taskMap[id])
            .filter(Boolean) ?? [];

      const done =
         columns
            .find((c) => c.type === "done")
            ?.tasksIdsOrder.map((id) => taskMap[id])
            .filter(Boolean) ?? [];

      return { todo, progress, done };
   }, [tasks, columns]);

   if (isLoading) {
      return <div>Loading tasks...</div>;
   }

   if (isError) {
      return <div>Error fetching tasks: {error.message}</div>;
   }

   if (!tasks) {
      return <div>No tasks found</div>;
   }
   if (!columns) {
      return <div>No tasks found</div>;
   }

   return (
      <div className="grid grid-cols-3 gap-4">
         <div className="grid-span-1 p-4 flex flex-col gap-4">
            {orderedColumns.todo.map((task) => (
               <KanbanCard todo={task} />
            ))}
         </div>{" "}
         <div className="grid-span-1 p-4 flex flex-col gap-4">
            {orderedColumns.progress.map((task) => (
               <KanbanCard todo={task} />
            ))}
         </div>{" "}
         <div className="grid-span-1 p-4 flex flex-col gap-4">
            {orderedColumns.done.map((task) => (
               <KanbanCard todo={task} />
            ))}
         </div>
      </div>
   );
}

export default Kanban;
