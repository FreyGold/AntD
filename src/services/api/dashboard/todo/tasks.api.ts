import type { ITask } from "@/services/types/ITask";
import axios from "axios";

axios.defaults.baseURL =
   "https://json-server-vercel-template-omega.vercel.app/";
// "https://5ntn5kvl-3000.uks1.devtunnels.ms/";

export const getTasks = async (): Promise<ITask[]> => {
   const res = await axios.get("/tasks");
   return res.data;
};

export const getTask = async (id: string): Promise<ITask> => {
   const res = await axios.get(`/tasks/${id}`);
   return res.data;
};

export const createTask = async (task: ITask) => {
   const res = await axios.post("/tasks", task);
   console.log(res.data);
   return res.data;
};

// use patch because put replaces the whole task
export const updateTask = async (task: Partial<ITask>, id: string) => {
   const res = await axios.patch(`/tasks/${id}`, task);
   return res.data;
};

export const deleteTask = async (id: string) => {
   const res = await axios.delete(`/tasks/${id}`);
   return res.data;
};
