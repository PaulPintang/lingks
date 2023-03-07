import axios from "axios";
import { BookmarkInterface } from "./bookmarkSlice";

export const handleGetBookmarks = (token: string) => {};

export const handleAddBookmark = (bookmark: BookmarkInterface) => {
  try {
    const response = axios.post("api/bookmark/add", bookmark);
    return response;
  } catch (error) {
    return error;
  }
};

export const handleUpdateBookmark = () => {};

export const handleDeleteBookmark = () => {};
