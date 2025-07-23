import type { ITask } from "@/services/types/ITask";

function Tags({ todo }: { todo: ITask }) {
   return todo.tags?.map((tag) => (
      <span
         key={tag}
         className={`text-xs px-2 py-0.5 h-5 border rounded-md inline-flex items-center ${
            todo.tagColors?.[tag] ||
            "bg-secondary text-secondary-foreground border-border"
         }`}>
         {tag}
      </span>
   ));
}

export default Tags;
