import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/authSlice";
import todoReducers from "../test/todoSlice";

export const store = configureStore({
  reducer: {
    user: authReducers,
    todo: todoReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
