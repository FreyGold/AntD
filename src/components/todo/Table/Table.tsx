import React, { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import TableRow from "./TableRow";
import { DroppableArea } from "@/services/hooks/dnd";
import {
   DndContext,
   DragOverlay,
   type DragEndEvent,
   type DragStartEvent,
} from "@dnd-kit/core";
import {
   restrictToVerticalAxis,
   restrictToWindowEdges,
} from "@dnd-kit/modifiers";

interface TodoItem {
   id: string;
   title: string;
   completed: boolean;
   hasChildren?: boolean;
   isExpanded?: boolean;
   hasDragHandle?: boolean;
   tags?: string[];
   tagColors?: Record<string, string>;
   attachments?: number;
   comments?: number;
   assignee?: {
      name: string;
      avatar?: string;
      initials: string;
   };
   date?: string;
   priority?: "high" | "medium" | "low";
   hasCalendar?: boolean;
   hasUsers?: boolean;
   hasLock?: boolean;
}

const mockTodos: TodoItem[] = [
   {
      id: "1",
      title: "Instructions for using this template",
      completed: true,
      hasChildren: true,
      tags: ["Project", "Published"],
      tagColors: {
         Project: "bg-red-100 text-red-700 border-red-200",
         Published: "bg-green-100 text-green-700 border-green-200",
      },
      attachments: 3,
      assignee: { name: "User 1", initials: "U1" },
      date: "12 Apr '23",
      hasLock: true,
      hasCalendar: true,
   },
   {
      id: "2",
      title: "Redesign and launch updated mobile app",
      completed: false,
      hasChildren: true,
      tags: ["UX Design"],
      tagColors: {
         "UX Design": "bg-orange-100 text-orange-700 border-orange-200",
      },
      comments: 2,
      assignee: { name: "User 2", initials: "U2" },
      date: "14 Apr '23",
      priority: "high",
      hasCalendar: true,
   },
   {
      id: "3",
      title: "Onboarding tour for new users with engagement",
      completed: true,
      hasDragHandle: true,
      comments: 4,
      assignee: { name: "User 3", initials: "U3" },
      date: "16 Apr '23",
      priority: "high",
      hasLock: true,
   },
   {
      id: "4",
      title: "Coordinate new employee offsite",
      completed: true,
      hasChildren: true,
      tags: ["UX Integration", "On-going"],
      tagColors: {
         "UX Integration": "bg-purple-100 text-purple-700 border-purple-200",
         "On-going": "bg-cyan-100 text-cyan-700 border-cyan-200",
      },
      attachments: 1,
      comments: 6,
      hasUsers: true,
      hasCalendar: true,
   },
   {
      id: "5",
      title: "Instructions for using this template",
      completed: false,
      hasChildren: true,
      attachments: 6,
      comments: 12,
      assignee: { name: "User 4", initials: "U4" },
      date: "17 Apr '23",
      hasLock: true,
      hasCalendar: true,
   },
];

const TodoList: React.FC = () => {
   const [items, setItems] = useState(mockTodos);
   const [activeId, setActiveId] = useState<string | null>(null);

   //TODO: I tried to but got hopeless, add animation to the dropped on element too, and hide the element getting dragged
   const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
         setItems((currentItems) => {
            const oldIndex = currentItems.findIndex(
               (item) => item.id === active.id
            );
            const newIndex = currentItems.findIndex(
               (item) => item.id === over.id
            );

            const newItems = [...currentItems];
            [newItems[oldIndex], newItems[newIndex]] = [
               newItems[newIndex],
               newItems[oldIndex],
            ];
            return newItems;
         });
      }
      setActiveId(null);
   };
   const handleDragStart = (event: DragStartEvent) => {
      setActiveId(event.active.id as string);
   };
   return (
      <div className="flex-1 min-w-full max-w-5xl bg-card border border-border rounded-lg shadow-sm">
         {/* Header */}
         <div className="flex items-center gap-2 px-4 py-3 border-b border-border w-full bg-[var(--c-background-dark)] h-10">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-foreground">To-Do</h2>
            <span className="bg-background text-secondary-foreground rounded-full text-xs px-2 py-0.5 h-5 flex items-center">
               {mockTodos.length}
            </span>
         </div>

         {/* Todo Items */}
         <div className="divide-y divide-border">
            <DndContext
               onDragEnd={handleDragEnd}
               onDragStart={handleDragStart}
               modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}>
               {items.map((todo) => (
                  <DroppableArea id={todo.id} key={todo.id}>
                     <div>
                        <TableRow todo={todo} />
                     </div>
                  </DroppableArea>
               ))}
               <DragOverlay>
                  {activeId ? (
                     <TableRow
                        key={activeId}
                        todo={items.find((item) => item.id === activeId)!}
                     />
                  ) : null}
               </DragOverlay>
            </DndContext>
         </div>

         {/* Add Task Button */}

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
