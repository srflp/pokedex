import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokeAPI } from "../../common/pokeApiTypings";

const typesSlice = createSlice({
  name: "pokemon/types",
  initialState: [] as string[],
  reducers: {
    fetchRequested() {},
    fetchReceived(state, action: PayloadAction<PokeAPI.NamedAPIResource[]>) {
      return action.payload.reduce((types: string[], type) => {
        if (type.name !== "shadow" && type.name !== "unknown")
          types.push(type.name);
        return types;
      }, []);
    },
  },
});

export const typesActions = typesSlice.actions;
export default typesSlice.reducer;
