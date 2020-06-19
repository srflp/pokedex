import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokeAPI } from "../../common/pokeApiTypings";

interface TypePokemon {
  name: string;
  slot: number;
}

export interface TypesWithPokemonNames {
  [key: string]: TypePokemon[];
}

const typesWithPokemonNames = createSlice({
  name: "pokemon/typesWithPokemonNames",
  initialState: {} as TypesWithPokemonNames,
  reducers: {
    fetchRequested(state, action: PayloadAction<string>) {},
    fetchReceived(
      state,
      action: PayloadAction<{ type: string; pokemons: PokeAPI.TypePokemon[] }>
    ) {
      state[action.payload.type] = action.payload.pokemons.map(
        (typePokemon) => ({
          name: typePokemon.pokemon.name,
          slot: typePokemon.slot,
        })
      );
    },
  },
});

export const typesWithPokemonNamesActions = typesWithPokemonNames.actions;
export default typesWithPokemonNames.reducer;
