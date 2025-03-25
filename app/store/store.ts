// app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import auditReducer from "./auditSlice";

export const store = configureStore({
  reducer: {
    audit: auditReducer,
  },
});

// Infer types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
