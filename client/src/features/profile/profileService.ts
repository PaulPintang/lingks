// import { UserInterface } from "../auth/authSlice";/
import { UserInterface } from "../../interfaces/user.interface";
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
        image,
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

export const handleGetProfile = async (token: string) => {
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

export const handleDeleteProfile = async (token: string) => {
  try {
    const user = await axios.delete("/api/user/delete", {
      headers: {
        "auth-token": token,
      },
    });
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    return user.data;
  } catch (error) {
    console.log(error);
  }
};
