import React from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchState {
  term: string;
}
interface SearchContext {
  search: SearchState;
  setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
}

const SearchContext = React.createContext({} as SearchContext);

export const SearchProvider: React.FC = ({ children }) => {
  const [search, setSearch] = React.useState({ term: "" });

  const contextValue = React.useMemo(() => {
    return { search, setSearch };
  }, [search, setSearch]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const { search, setSearch } = React.useContext(SearchContext);
  const debouncedSearch = useDebounce(search, 200);
  return { search: debouncedSearch, setSearch };
};

export default useSearch;
