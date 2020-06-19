import { combineReducers } from "@reduxjs/toolkit";
import pageReducer from "./page/pageSlice";
import pokemonReducer from "./pokemon/pokemonReducer";
import filterReducer from "./filter/filterReducer";

const rootReducer = combineReducers({
  page: pageReducer,
  pokemon: pokemonReducer,
  filter: filterReducer,
});

export default rootReducer;
