import axios from "axios";
import { UserInterface } from "./authSlice";

interface Props extends UserInterface {
  password: string;
}

export const handleLogin = async (user: UserInterface) => {
  const res = await axios.post("/api/user/login", user);
  localStorage.removeItem("email");
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

export const handleRegister = async (newUser: UserInterface) => {
  const res = await axios.post("/api/user", newUser);
  localStorage.setItem("email", res.data.email);
  return res.data.user;
};

export const handleLogout = () => {
  localStorage.removeItem("user");
};

export const handleChangePass = async (
  data: Props,
  setError: (val: string) => void
) => {
  const res = await axios.put("/api/user/reset", {
    email: data.email,
    password: data.password,
  });
  return res;
};

export const handleError = (response: string) => {
  if (JSON.stringify(response).toLowerCase().includes("name")) {
    console.log("name error");
    return response;
  }

  if (JSON.stringify(response).toLowerCase().includes("email")) {
    console.log("email error");
    return response;
  }

  if (JSON.stringify(response).toLowerCase().includes("password")) {
    console.log("password error");
    return response;
  }
};
