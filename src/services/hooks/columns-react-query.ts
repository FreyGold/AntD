import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { IColumn } from "../types/IColumn";
import { addColumnId, getColumns, updateColumn } from "../api/dashboard/todo";

export const useGetColumns = (options = {}) => {
   return useQuery<IColumn[]>({
      queryKey: ["columns"],
      queryFn: getColumns,
      staleTime: 1000 * 60 * 5,
      ...options,
   });
};

export const useUpdateColumn = () => {
   const queryClient = useQueryClient();
   return useMutation<IColumn, Error, { id: string; column: Partial<IColumn> }>(
      {
         mutationFn: ({ id, column }) => updateColumn(column, id),
         onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["columns"] }),
      }
   );
};

export const useAddColumnId = () => {
   const queryClient = useQueryClient();
   return useMutation<IColumn, Error, { id: string; type: string }>({
      mutationFn: ({ id, type }) => addColumnId(id, type),
      onError: (err) => console.error("Mutation error", err),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["columns"] }),
   });
};
