import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/user.interface";
import { handleLogin, handleRegister, handleLogout } from "./authService";

interface InitialStateInterface {
  user: UserInterface | null;
  status?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
}

const user = JSON.parse(localStorage.getItem("user")!);

const initialState: InitialStateInterface = {
  user: user ? user : null,
  status: "idle",
  error: "",
};

export const login = createAsyncThunk<
  UserInterface,
  UserInterface,
  { rejectValue: string }
>("/user/login", async (user, thunkAPI) => {
  try {
    return await handleLogin(user);
  } catch (err: any) {
    const message = err.response.data.error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk<
  UserInterface,
  UserInterface,
  { rejectValue: string }
>("/user/register", async (newUser, thunkAPI) => {
  try {
    const user = await handleRegister(newUser);
    return user;
  } catch (err: any) {
    const message = err.response.data.error;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  await handleLogout();
});

export const authSlice = createSlice({
  name: "auth",
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
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
