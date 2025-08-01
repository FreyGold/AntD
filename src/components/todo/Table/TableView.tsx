import TodoList from "./Table";
import { useMemo, useState } from "react";
import {
   DndContext,
   DragOverlay,
   MouseSensor,
   TouchSensor,
   useSensor,
   useSensors,
   type DragEndEvent,
   type DragStartEvent,
} from "@dnd-kit/core";
import { useGetTasks, useUpdateTask } from "@/services/hooks/tasks-react-query";
import { useGetColumns } from "@/services/hooks/columns-react-query";
import {
   restrictToVerticalAxis,
   restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { useUpdateColumn } from "@/services/hooks/columns-react-query";
import TableRow from "./TableRow";
import { useSearch } from "@/services/context/SearchProvider";

function TableView() {
   const { data: rawTasks, isLoading, isError, error } = useGetTasks();
   const { data: columns } = useGetColumns();
   const { search } = useSearch();

   // NOTE: this was implemented to solve the problem of an overlay getting created over the checkbox
   const sensors = useSensors(
      useSensor(MouseSensor, {
         activationConstraint: {
            distance: 10,
            delay: 250,
         },
      }),
      useSensor(TouchSensor, {
         activationConstraint: {
            delay: 250,
            tolerance: 5,
         },
      })
   );

   const tasks = useMemo(() => {
      if (!rawTasks) {
         return [];
      }
      if (!search) {
         return rawTasks;
      }
      return rawTasks.filter(
         (task) =>
            task.title?.toLowerCase().includes(search.toLowerCase()) ||
            task.description?.toLowerCase().includes(search.toLowerCase())
      );
   }, [rawTasks, search]);

   const { mutate: mutateColumn } = useUpdateColumn();
   const { mutate: mutateTask } = useUpdateTask();

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
   const taskType = (
      type: string
   ): "todo" | "progress" | "done" | undefined => {
      switch (type) {
         case "1":
            return "todo";
         case "2":
            return "progress";
         case "3":
            return "done";
      }
   };
   const handleDragEnd = (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;

      if (!over || active.id === over.id) {
         return;
      }

      if (!columns) {
         return;
      }

      if (!over.data.current || !active.data.current) {
         return;
      }
      const activeTaskOrder =
         columns[+active.data.current.type - 1].tasksIdsOrder;
      const overTaskOrder = columns[+over.data.current.type - 1].tasksIdsOrder;

      const activeIndex = activeTaskOrder.indexOf(active.id as string);
      const overIndex = overTaskOrder.indexOf(over.id as string);

      const newActiveTaskOrder = Array.from(activeTaskOrder);
      const newOverTaskOrder = Array.from(overTaskOrder);

      if (active.data.current.type === over.data.current.type) {
         const [activeMovedItem] = newActiveTaskOrder.splice(activeIndex, 1);
         newActiveTaskOrder.splice(overIndex, 0, activeMovedItem);

         mutateColumn({
            id: active.data.current.type,
            column: { tasksIdsOrder: newActiveTaskOrder },
         });
      } else {
         const [activeMovedItem] = newActiveTaskOrder.splice(activeIndex, 1);
         const [overMovedItem] = newOverTaskOrder.splice(overIndex, 1);

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
         // FIXME: bug where when i change the place of a task i don't change it's type
         mutateTask({
            id: String(active.id),
            task: { type: taskType(over.data.current.type) },
         });
         mutateTask({
            id: String(over.id),
            task: { type: taskType(active.data.current.type) },
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
         <div className="flex items-center justify-between p-4 mt-1 rounded-sm h-8 bg-background text-xs pr-15">
            <p>To Do Name</p>
            <div className="flex space-x-14">
               <p>Asignee</p>
               <p>Due Date</p>
               <p>Priority</p>
            </div>
         </div>
         <DndContext
            sensors={sensors}
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
