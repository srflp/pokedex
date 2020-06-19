import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokeAPI } from "../../common/pokeApiTypings";

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  imgUrl: string;
}

const parsePokemon = ({ name, url }: PokeAPI.NamedAPIResource): Pokemon => {
  const id = parseInt(url.split("/").slice(-2)[0]);
  return {
    id,
    name,
    url,
    imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  };
};

const parsePokemons = (rawPokemons: PokeAPI.NamedAPIResource[]): Pokemon[] => {
  return rawPokemons.map(({ name, url }) => {
    return parsePokemon({ name, url });
  });
};

type ApiDataState = Pokemon[];

const initialState: ApiDataState = [];

const listSlice = createSlice({
  name: "pokemon/list",
  initialState,
  reducers: {
    fetchRequested() {},
    fetchReceived(state, action: PayloadAction<PokeAPI.NamedAPIResource[]>) {
      return parsePokemons(action.payload);
    },
  },
});

export const listActions = listSlice.actions;
export default listSlice.reducer;
