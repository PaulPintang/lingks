import { UserInterface } from "../auth/authSlice";
import axios from "axios";

export const handleUpdateProfile = async (
  data: UserInterface,
  token: string
) => {
  const { name, email, image } = data;
  try {
    const user = await axios.put(
      "/api/user/update",
      {
        name,
        email,
      },
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    localStorage.setItem("user", JSON.stringify({ ...user.data, token }));
    return user.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleUserProfile = async (token: string) => {
  try {
    const user = await axios.get("/api/user/me", {
      headers: {
        "auth-token": token,
      },
    });
    localStorage.setItem("user", JSON.stringify({ ...user.data, token }));
    return user.data;
  } catch (error) {
    console.log(error);
  }
};
