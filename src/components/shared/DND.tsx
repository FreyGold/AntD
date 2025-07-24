import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
// import { useSortable } from "@dnd-kit/sortable";
import type { JSX } from "react";

type Props = {
   id: string;
   children: JSX.Element;
   type?: string | null;
};
export function DraggableItem({ id, children, type }: Props) {
   const { attributes, listeners, setNodeRef } = useSortable({
      id,
      data: {
         type,
      },
   });

   return (
      <div ref={setNodeRef} {...listeners} {...attributes}>
         {children}
      </div>
   );
}

export function DroppableArea({ id, children, type }: Props) {
   const { setNodeRef } = useDroppable({
      id,
      data: {
         type,
      },
   });

   return <div ref={setNodeRef}>{children}</div>;
}
