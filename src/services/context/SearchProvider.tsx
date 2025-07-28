import React, {
   createContext,
   useContext,
   useState,
   type ReactNode,
} from "react";

interface SearchContextType {
   search: string;
   setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
   const [search, setSearch] = useState("");

   const contextValue: SearchContextType = {
      search,
      setSearch,
   };

   return (
      <SearchContext.Provider value={contextValue}>
         {children}
      </SearchContext.Provider>
   );
}

export function useSearch() {
   const context = useContext(SearchContext);

   if (context === undefined) {
      throw new Error("useSearch must be used within a SearchProvider");
   }

   return context;
}
