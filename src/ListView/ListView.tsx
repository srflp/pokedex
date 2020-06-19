import React from "react";
import TypeFilter from "./TypeFilter";
import Search from "./Search";
import PokemonBrowser from "./PokemonBrowser/PokemonBrowser";

const ListView: React.FC = () => {
  return (
    <>
      <TypeFilter />
      <Search />
      <PokemonBrowser />
    </>
  );
};

export default ListView;
