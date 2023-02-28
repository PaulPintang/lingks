import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleOTP, handleVerifyOTP } from "./recoverService";

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

const recoverSlice = createSlice({
  name: "recoverSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.status = "pending";
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        // payload return response status 200
        if (action.payload === 200) {
          state.status = "succeeded";
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
        console.log(action.payload);
        // payload return TRUE
        state.isVerified = action.payload;
      })
      .addCase(verifyOTP.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = recoverSlice.actions;
export default recoverSlice.reducer;
