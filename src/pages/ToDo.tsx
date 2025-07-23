import KanbanView from "@/components/todo/Kanban/KanbanView";
import TableView from "@/components/todo/Table/TableView";
import ToDoHeader from "@/components/todo/ToDoHeader";
import { useState } from "react";

function ToDo() {
   const [view, setView] = useState<"List" | "Kanban">("List");

   return (
      <div>
         <ToDoHeader view={view} setView={setView} />

         {view == "List" && <TableView />}
         {view == "Kanban" && <KanbanView />}
      </div>
   );
}

export default ToDo;
