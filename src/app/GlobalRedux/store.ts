"use client";

import { configureStore } from "@reduxjs/toolkit";
import countReducer from "../GlobalRedux/Features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: countReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
