import { combineReducers } from "@reduxjs/toolkit";
import selectedTypesSlice from "./selectedTypesSlice";
import searchTermSlice from "./searchSlice";

const filterReducer = combineReducers({
  selectedTypes: selectedTypesSlice.reducer,
  searchTerm: searchTermSlice.reducer,
});

export default filterReducer;
