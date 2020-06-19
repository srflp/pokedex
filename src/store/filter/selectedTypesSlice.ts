import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const selectedTypesSlice = createSlice({
  name: "selectedTypes",
  initialState: [] as string[],
  reducers: {
    toggle(state, action: PayloadAction<string>) {
      if (state.includes(action.payload)) {
        return state.filter((type) => type !== action.payload);
      } else {
        return [...state, action.payload];
      }
    },
    clear() {
      return [];
    },
  },
});

export const selectedTypesActions = selectedTypesSlice.actions;
export default selectedTypesSlice;
