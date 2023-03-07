import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleAddBookmark, handleGetBookmarks } from "./bookmarkService";

export interface LinksInterface {
  name: string | null;
  link: string | null;
  date: string | null;
}

export interface BookmarkInterface {
  title: string | null;
  description: string | null;
  banner: string | null;
  labels: string[];
  links: LinksInterface[];
  status?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
  token?: string;
}

const initialState: BookmarkInterface = {
  title: "",
  description: "",
  banner: "",
  labels: [],
  links: [
    {
      name: "",
      link: "",
      date: "",
    },
  ],
};

export const getBookmarks = createAsyncThunk(
  "user/bookmarks/get",
  async (token: string) => {
    try {
      const response = handleGetBookmarks(token);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addBookmark = createAsyncThunk(
  "user/bookmarks/add",
  async (bookmark: BookmarkInterface) => {
    try {
      const response = handleAddBookmark(bookmark);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBookmarks.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(getBookmarks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addBookmark.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
      })
      .addCase(addBookmark.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
