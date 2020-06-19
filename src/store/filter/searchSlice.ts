import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    set(state, action: PayloadAction<string>) {
      return action.payload;
    },
    clear() {
      return "";
    },
  },
});

export const search = searchSlice.actions;
export default searchSlice;
