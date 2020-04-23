import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PageState {
  current: number;
  total: number;
}

export interface PageAction extends Action<string> {}

export const initialState: PageState = {
  current: 1,
  total: 1,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    first(state) {
      state.current = 1;
    },
    next(state) {
      state.current += 1;
    },
    prev(state) {
      state.current -= 1;
    },
    last(state) {
      state.current = state.total;
    },
    setCurrent(state, action: PayloadAction<number>) {
      if (action.payload < 1) {
        state.current = 1;
      } else if (action.payload > state.total) {
        state.current = state.total;
      } else {
        state.current = action.payload;
      }
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
  },
});

export const page = pageSlice.actions;
export default pageSlice.reducer;
