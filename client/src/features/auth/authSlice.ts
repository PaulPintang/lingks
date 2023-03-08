import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleError,
  handleLogin,
  handleRegister,
  handleLogout,
  handleUserProfile,
} from "./authService";
import { UserInterface } from "./authService";

interface UserProfile {
  name: string;
  email: string;
  image: string;
}

interface User extends UserInterface {
  user: UserProfile | null;
  status?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: User = {
  user: null,
  email: "",
  password: "",
  status: "idle",
  error: "",
};

export const login = createAsyncThunk(
  "/user/login",
  async (user: UserInterface) => {
    try {
      // return token
      const token = await handleLogin(user);
      await handleUserProfile(token);
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await handleLogout();
});

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
