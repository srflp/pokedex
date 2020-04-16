import React from "react";
import TypeFilter from "./TypeFilter";
import Search from "./Search";
import PokemonBrowser from "./PokemonBrowser/PokemonBrowser";
import { PagesProvider } from "./usePages";
import { SearchProvider } from "./useSearch";

const ListView: React.FC = () => {
  console.log("ListView render");

  return (
    <>
      <TypeFilter />
      <SearchProvider>
        <Search />
        <PagesProvider>
          <PokemonBrowser />
        </PagesProvider>
      </SearchProvider>
    </>
  );
};

export default ListView;
