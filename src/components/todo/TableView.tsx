import TodoList from "./Table/Table";
import { useMemo, useState } from "react";
import {
   DndContext,
   DragOverlay,
   type DragEndEvent,
   type DragStartEvent,
} from "@dnd-kit/core";
import { useGetTasks } from "@/services/hooks/tasks-react-query";
import { useGetColumns } from "@/services/hooks/columns-react-query";
import {
   restrictToVerticalAxis,
   restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { useUpdateColumn } from "@/services/hooks/columns-react-query";
import TableRow from "./Table/TableRow";

function TableView() {
   const { data: tasks, isLoading, isError, error } = useGetTasks();
   const {
      data: columns,
      isLoading: colIsLoading,
      isError: colIsError,
      error: colError,
   } = useGetColumns();

   const { mutate: mutateColumn } = useUpdateColumn();

   const [activeId, setActiveId] = useState<string | null>(null);
   const [columnType, setColumnType] = useState<string | null>(null);

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

   const handleDragEnd = (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;

      console.log("1");
      if (!over || active.id === over.id) {
         return;
      }
      console.log("2");

      if (!columns) {
         return;
      }
      console.log("3");

      if (!over.data.current || !active.data.current) {
         console.log(over);
         console.log("----------------");

         console.log(active.data);
         return;
      }
      console.log("4");
      console.log(active.data, over.data);
      const activeTaskOrder =
         columns[+active.data.current.type - 1].tasksIdsOrder;
      const overTaskOrder = columns[+over.data.current.type - 1].tasksIdsOrder;

      const activeIndex = activeTaskOrder.indexOf(active.id as string);
      const overIndex = overTaskOrder.indexOf(over.id as string);

      const newActiveTaskOrder = Array.from(activeTaskOrder);
      const newOverTaskOrder = Array.from(overTaskOrder);

      console.log("-----1", newActiveTaskOrder, newOverTaskOrder);

      console.log("-----3", newActiveTaskOrder, newOverTaskOrder);
      console.log("5");

      if (active.data.current.type === over.data.current.type) {
         const [activeMovedItem] = newActiveTaskOrder.splice(activeIndex, 1);
         newActiveTaskOrder.splice(overIndex, 0, activeMovedItem);
         console.log("-----a", newActiveTaskOrder, newOverTaskOrder);

         mutateColumn({
            id: active.data.current.type,
            column: { tasksIdsOrder: newActiveTaskOrder },
         });
      } else {
         const [activeMovedItem] = newActiveTaskOrder.splice(activeIndex, 1);
         const [overMovedItem] = newOverTaskOrder.splice(overIndex, 1);

         console.log("-----b", newActiveTaskOrder, newOverTaskOrder);

         newOverTaskOrder.splice(overIndex, 0, activeMovedItem);
         newActiveTaskOrder.splice(activeIndex, 0, overMovedItem);
         mutateColumn({
            id: active.data.current.type,
            column: { tasksIdsOrder: newActiveTaskOrder },
         });
         mutateColumn({
            id: over.data.current.type,
            column: { tasksIdsOrder: newOverTaskOrder },
         });
      }
   };

   const handleDragStart = (event: DragStartEvent) => {
      if (event.active.data.current === undefined) return;
      setActiveId(event.active.id as string);
      setColumnType(event.active.data.current.type);
   };

   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-between p-4 mt-1 rounded-sm h-8 bg-background text-xs pr-12">
            <p>To Do Name</p>
            <div className="flex space-x-14">
               <p>Asignee</p>
               <p>Due Date</p>
               <p>Priority</p>
            </div>
         </div>
         <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}>
            <TodoList
               tasks={orderedColumns.todo}
               columnType="1"
               activeId={activeId}
            />
            <TodoList
               tasks={orderedColumns.progress}
               activeId={activeId}
               columnType="2"
            />
            <TodoList
               tasks={orderedColumns.done}
               activeId={activeId}
               columnType="3"
            />
            <DragOverlay>
               {activeId ? (
                  <div className="opacity-30">
                     <TableRow
                        activeId={activeId}
                        columnId={columnType}
                        todo={tasks.find((item) => item.id === activeId)!}
                     />
                  </div>
               ) : null}
            </DragOverlay>
         </DndContext>
      </div>
   );
}

export default TableView;
