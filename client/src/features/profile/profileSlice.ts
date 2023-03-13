import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import {
  handleUpdateProfile,
  handleDeleteProfile,
  handleGetProfile,
} from "../profile/profileService";

export interface UserInterface {
  name?: string | null;
  email: string | null;
  image?: string | null;
  day?: string;
  password?: string;
  token?: string;
}

interface InitialStateInterface {
  profile: UserInterface | null;
  status?: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error?: string | null;
}

const initialState: InitialStateInterface = {
  profile: null,
  isLoading: false,
  status: "idle",
  error: "",
};

export const userProfile = createAsyncThunk<
  UserInterface,
  undefined,
  { state: RootState }
>("user/profile", async (_, thunkAPI) => {
  try {
    const res = await handleGetProfile(thunkAPI.getState().auth.user?.token!);
    return res;
  } catch (error) {
    return error;
  }
});

export const updateProfile = createAsyncThunk<
  UserInterface,
  UserInterface,
  { state: RootState }
>("/user/update", async (user, thunkAPI) => {
  try {
    return await handleUpdateProfile(
      user,
      thunkAPI.getState().auth.user?.token!
    );
  } catch (err: any) {
    return err.response.data.error;
  }
});

export const deleteProfile = createAsyncThunk<
  string,
  undefined,
  { state: RootState }
>("user/delete", async (_, thunkAPI) => {
  try {
    const res = await handleDeleteProfile(
      thunkAPI.getState().auth.user?.token!
    );
    return res;
  } catch (error) {
    return error;
  }
});

export const authSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userProfile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(userProfile.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = null;
      })
      .addCase(deleteProfile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;