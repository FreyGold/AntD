import { DndContext } from "@dnd-kit/core";

import { type ReactNode } from "react";
import { DarkLightProvider } from "./DarkLightProvider";
import AntDProvider from "./AntDProvider";
import { ColorsProvider } from "./ColorsProvider";
import { ReactQueryProvider } from "./ReactQueryProvider";
// import other providers here as needed

export const UiProvider = ({ children }: { children: ReactNode }) => {
   return (
      <DarkLightProvider>
         <ColorsProvider>
            <AntDProvider>
               <ReactQueryProvider>
                  <DndContext>{children}</DndContext>
               </ReactQueryProvider>
            </AntDProvider>
         </ColorsProvider>
      </DarkLightProvider>
   );
};
