import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, handleLogin, handleRegister } from "./authService";

export interface UserInterface {
  name?: string;
  email: string;
  password: string;
  status?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: UserInterface = {
  email: "",
  password: "",
  status: "idle",
  error: "",
};

export const login = createAsyncThunk(
  "/user/login",
  async (user: UserInterface) => {
    try {
      const token = await handleLogin(user);
      return token;
    } catch (err: any) {
      return err.response.data.error;
    }
  }
);

export const register = createAsyncThunk(
  "/user/register",
  async (newUser: UserInterface) => {
    try {
      const user = await handleRegister(newUser);
      return user;
    } catch (err: any) {
      return err.response.data.error;
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const error = handleError(action.payload);

        if (error) {
          state.error = error;
        } else {
          state.error = null;
          localStorage.setItem("token", action.payload);
        }
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
