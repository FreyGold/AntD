import { type ReactNode } from "react";
import { DarkLightProvider } from "./DarkLightProvider";
import AntDProvider from "./AntDProvider";
import { ColorsProvider } from "./ColorsProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { SearchProvider } from "./SearchProvider";
// import other providers here as needed

export const UiProvider = ({ children }: { children: ReactNode }) => {
   return (
      <DarkLightProvider>
         <ColorsProvider>
            <AntDProvider>
               <ReactQueryProvider>
                  <SearchProvider>{children}</SearchProvider>
               </ReactQueryProvider>
            </AntDProvider>
         </ColorsProvider>
      </DarkLightProvider>
   );
};
