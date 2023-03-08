import axios from "axios";
import { BookmarkInterface } from "./bookmarkSlice";

const token = localStorage.getItem("token");

const header = {
  headers: {
    "auth-token": token,
  },
};

export const handleGetBookmarks = async () => {
  try {
    const bookmarks = await axios.get("api/bookmark", header);
    return bookmarks.data;
  } catch (error) {
    return error;
  }
};

export const handleAddBookmark = async (bookmark: BookmarkInterface) => {
  try {
    const response = await axios.post("api/bookmark/add", bookmark, header);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleUpdateBookmark = () => {};

export const handleDeleteBookmark = () => {};
