import { configureStore } from "@reduxjs/toolkit";
import listReducer from './redux/slices/listSlice';

export const store = configureStore({
  reducer: {
    lists: listReducer,
  },
});