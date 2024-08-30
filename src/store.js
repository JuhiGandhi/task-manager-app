import { configureStore } from "@reduxjs/toolkit";
import listReducer from './redux/reducers/listSlice';

export const store = configureStore({
  reducer: {
    lists: listReducer,
  },
});