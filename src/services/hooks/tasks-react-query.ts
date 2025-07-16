import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
   getTasks,
   getTask,
   createTask,
   updateTask,
   deleteTask,
} from "@/services/api/dashboard/todo/tasks.api";
import type { ITask } from "@/services/types/ITask";

export const useGetTasks = (options = {}) => {
   return useQuery<ITask[]>({
      queryKey: ["tasks"],
      queryFn: getTasks,
      staleTime: 1000 * 60 * 5,
      ...options,
   });
};

export const useGetTask = (id: string, options = {}) => {
   return useQuery<ITask>({
      queryKey: ["task", id],
      queryFn: () => getTask(id),
      staleTime: 1000 * 60 * 5,
      enabled: !!id,
      ...options,
   });
};

export const useCreateTask = () => {
   const queryClient = useQueryClient();
   return useMutation<ITask, Error, ITask>({
      mutationFn: (task) => createTask(task),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
   });
};

export const useUpdateTask = () => {
   const queryClient = useQueryClient();
   return useMutation<ITask, Error, { id: string; task: Partial<ITask> }>({
      mutationFn: ({ id, task }) => updateTask(task, id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
   });
};

export const useDeleteTask = () => {
   const queryClient = useQueryClient();
   return useMutation<unknown, Error, string>({
      mutationFn: deleteTask,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
   });
};
