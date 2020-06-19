import { combineReducers } from "redux";
import listReducer from "./listSlice";
import typesReducer from "./typesSlice";
import typesWithPokemonNamesReducer from "./typesWithPokemonNames";

const pokemonReducer = combineReducers({
  list: listReducer,
  types: typesReducer,
  typesWithPokemonNames: typesWithPokemonNamesReducer,
});

export default pokemonReducer;
