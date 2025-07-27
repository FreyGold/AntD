import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({
   children,
   id,
}: {
   children: React.ReactNode;
   id: string;
}) {
   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
   } = useSortable({
      id: id,
      transition: {
         duration: 250,
         easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   return (
      <div
         ref={setNodeRef}
         style={style}
         {...attributes}
         {...listeners}
         className={isDragging ? "opacity-50 h-[200px]" : ""}>
         {children}
      </div>
   );
}

export default SortableItem;
