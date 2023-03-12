import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  handleError,
  handleLogin,
  handleRegister,
  handleLogout,
  // handleUserProfile,
  // handleUpdateProfile,
} from "./authService";

// Get Profile
// import { handleUserProfile } from "../profile/profileService";
// import { profile } from "../profile/profileSlice";
// import { deleteAcc } from "../profile/profileSlice";

import {
  handleUpdateProfile,
  handleDeleteProfile,
} from "../profile/profileService";

export interface UserInterface {
  name?: string | null;
  email: string | null;
  image?: string | null;
  password?: string;
  token?: string;
}

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

export const update = createAsyncThunk<
  UserInterface,
  UserInterface,
  { state: RootState }
>("/user/update", async (user, thunkAPI) => {
  try {
    return await handleUpdateProfile(
      user,
      thunkAPI.getState().user.user?.token!
    );
  } catch (err: any) {
    return err.response.data.error;
  }
});

export const deleteAcc = createAsyncThunk<
  string,
  undefined,
  { state: RootState }
>("user/delete", async (_, thunkAPI) => {
  try {
    const res = await handleDeleteProfile(
      thunkAPI.getState().user.user?.token!
    );
    return res;
  } catch (error) {
    return error;
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
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
        // const error = handleError(action.payload);

        // if (error) {
        //   state.error = error;
        //   state.status = "idle";
        //   return;
        // }
        state.status = "succeeded";
        // console.log("payload", action.payload)
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
      .addCase(update.pending, (state) => {
        state.status = "pending";
      })
      .addCase(update.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...action.payload, token: user.token };
      })
      .addCase(update.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteAcc.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteAcc.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(deleteAcc.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
