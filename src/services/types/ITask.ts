export interface ITask {
   id: string;
   title: string;
   completed: boolean;
   type: "todo" | "progress" | "done";
   description: string;
   hasChildren?: boolean;
   imageUrl?: string;
   isExpanded?: boolean;
   hasDragHandle?: boolean;
   tags?: string[];
   tagColors?: Record<string, string>;
   attachments?: number;
   comments?: number;
   assignee: {
      name: string;
      avatar?: string;
      initials?: string;
   };
   date?: string;
   priority?: "high" | "medium" | "low";
   hasCalendar?: boolean;
   hasUsers?: boolean;
   hasLock?: boolean;
}
