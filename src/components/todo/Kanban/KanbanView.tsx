import Kanban from "./Kanban";
import {
   useGetColumns,
   useUpdateColumn,
} from "@/services/hooks/columns-react-query";
import { useGetTasks, useUpdateTask } from "@/services/hooks/tasks-react-query";
import {
   DndContext,
   type DragEndEvent,
   DragOverlay,
   type DragStartEvent,
   type DragOverEvent,
   useSensor,
   useSensors,
   PointerSensor,
   rectIntersection,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import KanbanCard from "./KanbanCard";
import { useSearch } from "@/services/context/SearchProvider";

function KanbanView() {
   const { data: rawTasks, isLoading, isError, error } = useGetTasks();
   const { data: columns } = useGetColumns();
   const [activeId, setActiveId] = useState<string | null>(null);
   const [overId, setOverId] = useState<string | null>(null);
   const { search } = useSearch();

   const updateTaskMutation = useUpdateTask();
   const updateColumnMutation = useUpdateColumn();

   const sensors = useSensors(
      useSensor(PointerSensor, {
         activationConstraint: {
            distance: 3,
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

   const findContainer = (id: string) => {
      if (["todo", "progress", "done"].includes(id)) {
         return id;
      }

      if (orderedColumns.todo.some((task) => task.id === id)) return "todo";
      if (orderedColumns.progress.some((task) => task.id === id))
         return "progress";
      if (orderedColumns.done.some((task) => task.id === id)) return "done";
      return null;
   };

   const handleDragStart = (event: DragStartEvent) => {
      setActiveId(event.active.id as string);
      console.log("Drag Start: Active ID:", event.active.id);
   };

   const handleDragOver = (event: DragOverEvent) => {
      const { active, over } = event;
      const activeId = active.id as string;
      const overId = over?.id as string;

      setOverId(overId);

      // Add console logs here
      console.log("Drag Over: Active ID:", activeId, "Over ID:", overId);
      console.log(
         "Drag Over: Active Container:",
         findContainer(activeId),
         "Over Container:",
         findContainer(overId)
      );

      if (!overId) return;

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      if (
         !activeContainer ||
         !overContainer ||
         activeContainer === overContainer
      ) {
         return;
      }
   };

   const handleDragEnd = async (event: DragEndEvent) => {
      const { active, over } = event;
      const activeId = active.id as string;
      const overId = over?.id as string;

      console.log("Drag End: Active ID:", activeId, "Over ID:", overId);
      setActiveId(null);
      setOverId(null);

      if (!overId) {
         console.log("Drag End: No overId, returning.");
         return;
      }

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      console.log(
         "Drag End: Active Container:",
         activeContainer,
         "Over Container:",
         overContainer
      );

      if (!activeContainer || !overContainer) {
         console.log(
            "Drag End: Active or Over container not found, returning."
         );
         return;
      }

      const activeColumn = columns?.find((c) => c.type === activeContainer);
      const overColumn = columns?.find((c) => c.type === overContainer);

      if (!activeColumn || !overColumn) {
         console.log(
            "Drag End: Active or Over column data not found, returning."
         );
         return;
      }

      if (activeContainer !== overContainer) {
         console.log(
            `Drag End: Cross-container move from ${activeContainer} to ${overContainer}`
         );
         const activeItems = [...(activeColumn.tasksIdsOrder || [])];
         const overItems = [...(overColumn.tasksIdsOrder || [])];

         const activeIndex = activeItems.indexOf(activeId);
         activeItems.splice(activeIndex, 1);

         let newIndex;
         if (overId === overContainer) {
            newIndex = overItems.length;
            console.log(
               `Drag End: Dropped on empty container ${overContainer}. New index: ${newIndex}`
            );
         } else {
            const overIndex = overItems.indexOf(overId);
            newIndex = overIndex >= 0 ? overIndex : overItems.length;
            console.log(
               `Drag End: Dropped over task ${overId} in ${overContainer}. New index: ${newIndex}`
            );
         }

         overItems.splice(newIndex, 0, activeId);

         try {
            await updateTaskMutation.mutateAsync({
               id: activeId,
               task: { type: overContainer as "todo" | "progress" | "done" },
            });
            await Promise.all([
               updateColumnMutation.mutateAsync({
                  id: activeColumn.id,
                  column: { tasksIdsOrder: activeItems },
               }),
               updateColumnMutation.mutateAsync({
                  id: overColumn.id,
                  column: { tasksIdsOrder: overItems },
               }),
            ]);

            console.log(
               `Moved task ${activeId} from ${activeContainer} to ${overContainer}`
            );
         } catch (error) {
            console.error("Error updating task/columns:", error);
         }
      } else {
         console.log(`Drag End: Reordering within ${activeContainer}`);
         const items = [...(activeColumn.tasksIdsOrder || [])];
         const activeIndex = items.indexOf(activeId);

         let overIndex;
         if (overId === overContainer) {
            overIndex = items.length - 1;
         } else {
            overIndex = items.indexOf(overId);
         }

         if (activeIndex !== overIndex) {
            const [movedItem] = items.splice(activeIndex, 1);
            items.splice(overIndex, 0, movedItem);

            try {
               await updateColumnMutation.mutateAsync({
                  id: activeColumn.id,
                  column: { tasksIdsOrder: items },
               });

               console.log(`Reordered in ${activeContainer}:`, items);
            } catch (error) {
               console.error("Error reordering tasks:", error);
            }
         }
      }
   };

   const activeTask = useMemo(() => {
      if (!activeId) return null;
      return [
         ...orderedColumns.todo,
         ...orderedColumns.progress,
         ...orderedColumns.done,
      ].find((task) => task.id === activeId);
   }, [activeId, orderedColumns]);

   if (isLoading) {
      return <div>Loading tasks...</div>;
   }

   if (isError) {
      return <div>Error fetching tasks: {error.message}</div>;
   }

   if (!tasks || !columns) {
      return <div>No tasks found</div>;
   }

   return (
      <div className="grid grid-cols-3 gap-2 space-x-6 mb-6">
         <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>
            <Kanban
               tasks={orderedColumns.todo}
               catId="todo"
               activeId={activeId}
               overId={overId}
            />
            <Kanban
               tasks={orderedColumns.progress}
               catId="progress"
               activeId={activeId}
               overId={overId}
            />
            <Kanban
               tasks={orderedColumns.done}
               catId="done"
               activeId={activeId}
               overId={overId}
            />

            <DragOverlay>
               {activeTask ? (
                  <div className="opacity-80 animate-pendulum">
                     <KanbanCard todo={activeTask} isOverlay={true} />
                  </div>
               ) : null}
            </DragOverlay>
         </DndContext>
      </div>
   );
}

export default KanbanView;
