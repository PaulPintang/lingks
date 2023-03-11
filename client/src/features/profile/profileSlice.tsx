import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserInterface } from "../auth/authSlice";
import { handleUpdateProfile, handleUserProfile } from "./profileService";

interface ProfileInterface {
  user: UserInterface | null;
  status?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
}

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user")!);

const initialState: ProfileInterface = {
  user: user ? user : null,
  status: "idle",
  error: "",
};

export const profile = createAsyncThunk<
  UserInterface,
  undefined,
  { state: RootState }
>("user/profile", async (_, thunkAPI) => {
  try {
    // return token
    const res = await handleUserProfile(thunkAPI.getState().user.user?.token!);
    return res;
  } catch (error) {
    return error;
  }
});

export const update = createAsyncThunk<
  UserInterface,
  UserInterface,
  { state: RootState }
>("/profile/update", async (user, thunkAPI) => {
  try {
    return await handleUpdateProfile(
      user,
      thunkAPI.getState().user.user?.token!
    );
  } catch (err: any) {
    return err.response.data.error;
  }
});

export const profileSlice = createSlice({
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
      //   .addCase(profile.pending, (state) => {
      //     state.status = "pending";
      //   })
      //   .addCase(profile.fulfilled, (state, action) => {
      //     state.status = "succeeded";
      //     // state.user = action.payload;
      //   })
      //   .addCase(profile.rejected, (state) => {
      //     state.status = "failed";
      //   })
      .addCase(update.pending, (state) => {
        state.status = "pending";
      })
      .addCase(update.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(update.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = profileSlice.actions;

export default profileSlice.reducer;
