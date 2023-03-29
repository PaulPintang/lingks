import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import recoverReducers from "../features/recover/recoverSlice";
import bookmarkReducers from "../features/bookmarks/bookmarkSlice";
import profileReducers from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    profile: profileReducers,
    recover: recoverReducers,
    bookmark: bookmarkReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
