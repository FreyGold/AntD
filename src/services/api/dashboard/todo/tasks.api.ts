import type { ITask } from "@/services/types/ITask";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

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
   return res.data;
};

export const updateTask = async (task: Partial<ITask>, id: string) => {
   const res = await axios.put(`/tasks/${id}`, task);
   return res.data;
};

export const deleteTask = async (id: string) => {
   const res = await axios.delete(`/tasks/${id}`);
   return res.data;
};
