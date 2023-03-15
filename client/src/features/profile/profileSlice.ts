import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserInterface } from "../../interfaces/user.interface";

import {
  handleUpdateProfile,
  handleDeleteProfile,
  handleGetProfile,
} from "../profile/profileService";

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
    const res: any = await handleGetProfile(
      thunkAPI.getState().auth.user?.token!
    );
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.status = "idle";
      state.error = null;
      state.profile = null;
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
        state.isLoading = true;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.isLoading = false;

        state.profile = null;
      })
      .addCase(deleteProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetProfileState } = profileSlice.actions;

export default profileSlice.reducer;
