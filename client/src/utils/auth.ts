import axios from "axios";
import { User } from "../pages/Register";

export const handleLogin = async (
  user: User,
  setProcessing: (val: boolean) => void,
  setError: (val: string) => void
) => {
  try {
    const res = await axios.post("/api/user/login", user);
    localStorage.setItem("token", res.data.token);
    localStorage.removeItem("email");
    return res.data.token;
  } catch (err: any) {
    const err_msg = err.response.data.error;
    setError(err_msg);
    setProcessing(err && false);
  }
};

export const createUser = async (
  newUser: User,
  setProcessing: (val: boolean) => void,
  setError: (val: string) => void
) => {
  try {
    const res = await axios.post("/api/user", newUser);
    const user = res.data.user;
    localStorage.setItem("email", newUser.email);
    return user;
  } catch (err: any) {
    const err_msg = err.response.data.error;
    setError(err_msg);

    setProcessing(err && false);
  }
};

export const handleOTP = async (
  email: object,
  setProcessing: (val: boolean) => void,
  setError: (val: string) => void
) => {
  try {
    const res = await axios.post("/api/user/recover", email);
    return res.status;
  } catch (err: any) {
    const err_msg = err.response.data.error;
    setError(err_msg);
    setProcessing(err && false);
  }
};

export const handleChangePass = async (
  data: User,
  setError: (val: string) => void
) => {
  try {
    const res = await axios.put("/api/user/reset", {
      email: data.email,
      password: data.password,
    });
    return res;
  } catch (error: any) {
    setError(error.response.data.error);
    console.log(error.response.data.error);
  }
};

export const userLoggedIn = async (token: string) => {
  try {
    const user = await axios.get("/api/user/me", {
      headers: {
        "auth-token": token,
      },
    });
    return user.data;
  } catch (error) {
    console.log(error);
  }
};
