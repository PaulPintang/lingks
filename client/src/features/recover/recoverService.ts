import axios from "axios";
import { UserInterface } from "../auth/authService";

export const handleOTP = async (email: string) => {
  try {
    const res = await axios.post("/api/user/recover", { email: email });
    localStorage.setItem("email", email);
    return res.status;
  } catch (err: any) {
    return err.response.data.error;
  }
};

export const handleVerifyOTP = async (OTP: number) => {
  try {
    const res = await axios.get("/api/user/verify", {
      params: { OTP },
    });
    localStorage.setItem("session", res.data);
    return res.data;
  } catch (err: any) {
    return err.response.data.error;
  }
};

export const handleChangePass = async (data: UserInterface) => {
  try {
    const res = await axios.put("/api/user/reset", {
      email: data.email,
      password: data.password,
    });
    localStorage.removeItem("session");
    return res;
  } catch (err: any) {
    return err.response.data.error;
  }
};