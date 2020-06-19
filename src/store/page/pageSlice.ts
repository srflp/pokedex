import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  current: number;
  perPage: number;
}

export interface PageAction extends Action<string> {}

export const initialState: PageState = {
  current: 1,
  perPage: 60,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    next(state) {
      state.current += 1;
    },
    prev(state) {
      state.current -= 1;
    },
    setCurrent(state, action: PayloadAction<number>) {
      state.current = action.payload;
    },
  },
});

export const page = pageSlice.actions;
export default pageSlice.reducer;
