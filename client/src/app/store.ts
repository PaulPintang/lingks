import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import recoverReducers from "../features/recover/recoverSlice";

export const store = configureStore({
  reducer: {
    user: authReducers,
    recover: recoverReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
