import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleError,
  handleLogin,
  handleRegister,
  handleLogout,
  handleUserProfile,
  handleUpdateProfile,
} from "./authService";
// import { UserInterface } from "./authService";

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  image: string;
  token: string;
}

interface StateInterface {
  user: UserInterface | null;
  status?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
}

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user")!);

const initialState: StateInterface = {
  user: user ? user : null,
  status: "idle",
  error: "",
};

export const login = createAsyncThunk(
  "/user/login",
  async (user: UserInterface) => {
    try {
      const res = await handleLogin(user);
      await handleUserProfile(res.token);
      return res;
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

export const profile = createAsyncThunk(
  "user/profile",
  async (token: string) => {
    try {
      // return token
      const res = await handleUserProfile(token);
      return res;
    } catch (error) {
      return error;
    }
  }
);

export const update = createAsyncThunk(
  "/user/login",
  async (user: UserInterface) => {
    try {
      return await handleUpdateProfile(user);
    } catch (err: any) {
      return err.response.data.error;
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        const error = handleError(action.payload);

        if (error) {
          state.error = error;
          state.status = "idle";
          return;
        }
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        const error = handleError(action.payload);

        if (error) {
          state.error = error;
          state.status = "idle";
          return;
        }

        state.status = "succeeded";
      })
      .addCase(register.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(profile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(profile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
