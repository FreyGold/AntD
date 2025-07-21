import type { IColumn } from "@/services/types/IColumn";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const getColumns = async (): Promise<IColumn[]> => {
   const res = await axios.get("/columns");
   return res.data;
};

export const updateColumn = async (column: Partial<IColumn>, id: string) => {
   const res = await axios.patch(`/columns/${id}`, column);
   return res.data;
};
