import axios from "axios";
// import { UserInterface } from "../auth/authService";
import { UserInterface } from "../../interfaces/user.interface";

export const handleOTP = async (email: string) => {
  try {
    const res = await axios.post("/api/user/recover", { email: email });

    localStorage.setItem("email", email);
    localStorage.setItem("session", res.data);
    return res.data;
  } catch (err: any) {
    return err.response.data.error;
  }
};

export const handleVerifyOTP = async (OTP: number) => {
  try {
    const res = await axios.get("/api/user/verify", {
      params: { OTP },
    });
    return res.data;
  } catch (err: any) {
    return err.response.data.error;
  }
};

export const handleChangePass = async (user: UserInterface) => {
  try {
    const res = await axios.put("/api/user/reset", {
      email: user.email,
      password: user.password,
    });
    localStorage.removeItem("session");
    return res.data.success;
  } catch (err: any) {
    return err.response.data.error;
  }
};
