import type { IColumn } from "@/services/types/IColumn";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const getColumns = async (): Promise<IColumn[]> => {
   const res = await axios.get("/columns");
   return res.data;
};

export const addColumnId = async (id: string, type: string) => {
   const column = await axios.get(`/columns/${type}`);
   const newColumn = [...column.data.tasksIdsOrder, id];
   const res = await axios.patch(`/columns/${type}`, {
      tasksIdsOrder: newColumn,
   });
   return res.data;
};

export const deleteColumnId = async (id: string, type: string) => {
   const column = await axios.get(`/columns/${type}`);
   const newColumn = column.data.tasksIdsOrder.filter(
      (taskId: string) => taskId !== id
   );
   const res = await axios.patch(`/columns/${type}`, {
      tasksIdsOrder: newColumn,
   });
   return res.data;
};

export const updateColumn = async (column: Partial<IColumn>, id: string) => {
   const res = await axios.patch(`/columns/${id}`, column);
   return res.data;
};
