import { createSelector } from "reselect";
import { RootState } from "../../configureStore";
import { Pokemon } from "./listSlice";
import { TypesWithPokemonNames } from "./typesWithPokemonNames";

const pokemonSelector = (state: RootState) => state.pokemon.list;
const selectedTypesSelector = (state: RootState) => state.filter.selectedTypes;
const typesWithPokemonNamesSelector = (state: RootState) =>
  state.pokemon.typesWithPokemonNames;
const searchSelector = (state: RootState) => state.filter.searchTerm;

const getFilteredPokemons = (
  pokemons: Pokemon[],
  selectedTypes: string[],
  typesWithPokemonNames: TypesWithPokemonNames,
  search: string
) => {
  if (selectedTypes.length > 0) {
    const pokemonNames = [] as string[];
    for (const selectedType of selectedTypes) {
      if (typesWithPokemonNames.hasOwnProperty(selectedType)) {
        for (const { name } of typesWithPokemonNames[selectedType]) {
          if (!pokemonNames.includes(name)) {
            pokemonNames.push(name);
          }
        }
      }
    }
    pokemons = pokemons.filter((pokemon) =>
      pokemonNames.includes(pokemon.name)
    );
  }
  if (search) {
    pokemons = pokemons
      .filter((pokemon) => pokemon.name.includes(search))
      // sort lexicographically
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      // sort by the index of found substring in the word
      .sort((a, b) => a.name.indexOf(search) - b.name.indexOf(search));
  }
  return pokemons;
};

export default createSelector(
  pokemonSelector,
  selectedTypesSelector,
  typesWithPokemonNamesSelector,
  searchSelector,
  getFilteredPokemons
);
