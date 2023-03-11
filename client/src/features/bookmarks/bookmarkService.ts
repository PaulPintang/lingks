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

export const handleAddBookmark = async (
  bookmark: BookmarkInterface,
  token: string
) => {
  try {
    const response = await axios.post("api/bookmark/add", bookmark, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleDropBookmark = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`api/bookmark/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// ? NOT DONE
export const handleAddLink = async (link: any, token: any) => {
  const { id, links } = link;
  try {
    const response = await axios.put(
      `api/bookmark/${id}`,
      { links },
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const handleUpdateBookmark = async (bookmark: any, token: string) => {
  const { id, title, description, banner, labels, links } = bookmark;
  try {
    const response = await axios.put(
      `api/bookmark/${id}`,
      { title, description, banner, labels, links },
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
