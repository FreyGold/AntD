import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

// Create the client instance outside the component
const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         refetchOnMount: false,
         refetchOnReconnect: false,
         staleTime: 60 * 1000, // 1 minute
         retry: 2,
      },
   },
});

export const ReactQueryProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
};
