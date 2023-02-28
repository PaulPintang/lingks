import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleChangePass, handleOTP, handleVerifyOTP } from "./recoverService";
import { UserInterface } from "../auth/authService";
interface OTPInterface {
  email: string;
  status: "idle" | "pending" | "succeeded" | "failed";
  isVerified: boolean;
  error: string | null;
}

const initialState: OTPInterface = {
  email: "",
  status: "idle",
  isVerified: false,
  error: null,
};

export const sendOTP = createAsyncThunk(
  "/user/sendOTP",
  async (email: string) => {
    try {
      const status = await handleOTP(email);
      return status;
    } catch (error) {
      return error;
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "/user/verifyOTP",
  async (OTP: number) => {
    try {
      const res = await handleVerifyOTP(OTP);
      return res;
    } catch (err: any) {
      return err.response.data.error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/user/resetPassword",
  async (data: UserInterface) => {
    try {
      const res = await handleChangePass(data);
      return res;
    } catch (err: any) {
      return err.response.data.error;
    }
  }
);

const recoverSlice = createSlice({
  name: "recoverSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.status = "pending";
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        // payload return response status 200
        if (action.payload === 200) {
          state.status = "succeeded";
        } else {
          // payload return catch error
          state.error = action.payload;
          state.status = "idle";
        }
      })
      .addCase(sendOTP.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = "pending";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.status = "succeeded";
        // payload return TRUE
        if (action.payload) {
          state.isVerified = action.payload;
        } else {
          state.error = "Invalid OTP";
          state.status = "idle";
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "pending";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { reset } = recoverSlice.actions;
export default recoverSlice.reducer;
