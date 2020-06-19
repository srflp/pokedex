import { createSelector } from "reselect";
import { RootState } from "../../configureStore";
import { Pokemon } from "../pokemon/listSlice";

import pokemonSelector from "../pokemon/pokemonSelector";
const perPageSelector = (state: RootState) => state.page.perPage;

const getTotalPages = (pokemons: Pokemon[], perPage: number) => {
  return Math.ceil(pokemons.length / perPage) || 1;
};

export default createSelector(pokemonSelector, perPageSelector, getTotalPages);
