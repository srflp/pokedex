import React, { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { TypeFilter } from "./TypeFilter";
import { Search } from "./Search";
import { PokemonBrowser } from "./PokemonBrowser/PokemonBrowser";
import { Route } from "../routes";
import {
  fetchPokemonList,
  fetchPokemonNamesByType,
  PokemonListItem,
} from "../api/pokemon";

const PER_PAGE = 60;

const filterPokemons = (
  pokemons: PokemonListItem[],
  selectedTypes: string[],
  pokemonNamesByType: Record<string, string[]>,
  search: string,
): PokemonListItem[] => {
  let result = pokemons;
  if (selectedTypes.length > 0) {
    const allowed = new Set<string>();
    for (const type of selectedTypes) {
      const names = pokemonNamesByType[type];
      if (names) for (const name of names) allowed.add(name);
    }
    result = result.filter((p) => allowed.has(p.name));
  }
  if (search) {
    result = result
      .filter((p) => p.name.includes(search))
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .sort((a, b) => a.name.indexOf(search) - b.name.indexOf(search));
  }
  return result;
};

export const ListView: React.FC = () => {
  const { q, types } = Route.useSearch();

  const { data: pokemons = [] } = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: fetchPokemonList,
  });

  const typeQueries = useQueries({
    queries: types.map((type) => ({
      queryKey: ["pokemon-names-by-type", type],
      queryFn: () => fetchPokemonNamesByType(type),
    })),
  });

  const pokemonNamesByType = useMemo(() => {
    const map: Record<string, string[]> = {};
    types.forEach((type, i) => {
      const data = typeQueries[i]?.data;
      if (data) map[type] = data;
    });
    return map;
  }, [types, typeQueries]);

  const filteredPokemons = useMemo(
    () => filterPokemons(pokemons, types, pokemonNamesByType, q),
    [pokemons, types, pokemonNamesByType, q],
  );

  const totalPages = Math.ceil(filteredPokemons.length / PER_PAGE) || 1;

  return (
    <>
      <TypeFilter />
      <Search />
      <PokemonBrowser
        filteredPokemons={filteredPokemons}
        totalPages={totalPages}
        perPage={PER_PAGE}
      />
    </>
  );
};
