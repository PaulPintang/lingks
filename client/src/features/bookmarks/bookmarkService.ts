import axios from "axios";
import { BookmarkInterface, LinksInterface } from "./bookmarkSlice";

export const handleGetBookmarks = async (token: string) => {
  try {
    const bookmarks = await axios.get("api/bookmark", {
      headers: {
        "auth-token": token,
      },
    });
    return bookmarks.data;
  } catch (error) {
    return error;
  }
};

export const handleAddBookmark = async (bookmark: BookmarkInterface) => {
  try {
    const response = await axios.post("api/bookmark/add", bookmark, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleDropBookmark = async (id: string) => {
  try {
    const response = await axios.delete(`api/bookmark/${id}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// ? NOT DONE
export const handleAddLink = async (data: any) => {
  try {
    const response = await axios.put(`api/bookmark/${data.id}`, data.links, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    console.log(response);
    // return response.data;
  } catch (error) {
    return error;
  }
};

export const handleUpdateBookmark = async (data: any) => {
  const { id, title, description, banner } = data;
  try {
    const response = await axios.put(
      `api/bookmark/${id}`,
      { title, description, banner }
      // {
      //   headers: {
      //     "auth-token": localStorage.getItem("token"),
      //   },
      // }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
