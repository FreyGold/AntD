import axios, {
   AxiosError,
   type AxiosInstance,
   type AxiosResponse,
} from "axios";
import { createContext, useContext, useEffect, type ReactNode } from "react";

// axios instance
const axiosInstance = axios.create({
   baseURL: "https://some-domain.com/api/",
});

const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

export default function AxiosProvider({
   children,
   instance = axiosInstance,
   ...props
}: {
   children: ReactNode;
   instance?: AxiosInstance;
}) {
   return (
      <AxiosContext.Provider value={instance} {...props}>
         {children}
      </AxiosContext.Provider>
   );
}

export function useAxios() {
   const instance = useContext(AxiosContext);
   if (instance === undefined) {
      throw new Error("useAxios must be used within a AxiosProvider");
   }
   return instance;
}

export const useResponseInterceptor = function (
   success = (r: AxiosResponse) => r,
   error = (e: AxiosError) => Promise.reject(e),
   deps = []
) {
   const axiosInstance = useAxios();

   useEffect(() => {
      const responseInterceptor = axiosInstance.interceptors.response.use(
         success,
         error
      );
      return () => {
         axiosInstance.interceptors.response.eject(responseInterceptor); // to avoid making more than one interceptor when deps change
      };
   }, [...deps]);
};
