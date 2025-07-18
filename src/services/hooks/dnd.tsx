import { useDraggable, useDroppable } from "@dnd-kit/core";
// import { useSortable } from "@dnd-kit/sortable";
import type { JSX } from "react";

type Props = {
   id: string;
   children: JSX.Element;
};
export function DraggableItem({ id, children }: Props) {
   const { attributes, listeners, setNodeRef } = useDraggable({
      id,
   });

   return (
      <div ref={setNodeRef} {...listeners} {...attributes}>
         {children}
      </div>
   );
}

export function DroppableArea({ id, children }: Props) {
   const { setNodeRef } = useDroppable({ id });

   return <div ref={setNodeRef}>{children}</div>;
}
