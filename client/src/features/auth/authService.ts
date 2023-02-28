import axios from "axios";

export interface UserInterface {
  name?: string;
  email: string;
  password: string;
}

export const handleLogin = async (user: UserInterface) => {
  try {
    const res = await axios.post("/api/user/login", user);
    localStorage.setItem("token", res.data.token);
    localStorage.removeItem("email");
    return res.data.token;
  } catch (err: any) {
    const err_msg = err.response.data.error;
    return err_msg;
  }
};

export const handleRegister = async (newUser: UserInterface) => {
  try {
    const res = await axios.post("/api/user", newUser);
    localStorage.setItem("email", newUser.email);
    return res.data.user;
  } catch (err: any) {
    const err_msg = err.response.data.error;
    return err_msg;
  }
};

export const handleLogout = () => {
  localStorage.removeItem("token");
};

export const handleChangePass = async (
  data: UserInterface,
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
