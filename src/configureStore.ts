import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pageReducer from "./store/page/pageSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  page: pageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
// const dispatch = useDispatch<Dispatch<YourActionType>>()

export default store;
