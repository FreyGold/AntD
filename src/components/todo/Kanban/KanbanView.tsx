import Kanban from "./Kanban";
import { useGetColumns } from "@/services/hooks/columns-react-query";
import { useGetTasks } from "@/services/hooks/tasks-react-query";
import { useMemo } from "react";

function KanbanView() {
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
      <div className="grid grid-cols-3 gap-2 space-x-6 mb-6 ">
         <Kanban tasks={orderedColumns.todo} />
         <Kanban tasks={orderedColumns.progress} />
         <Kanban tasks={orderedColumns.done} />
      </div>
   );
}

export default KanbanView;
