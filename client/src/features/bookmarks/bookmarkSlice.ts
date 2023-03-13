import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  handleAddBookmark,
  handleAddLink,
  handleDropBookmark,
  handleGetBookmarks,
  handleUpdateBookmark,
  handleSingleBookmark,
} from "./bookmarkService";

export interface LinksInterface {
  name: string | null;
  link: string | null;
  date: string | null;
}

interface colorInterface {
  label: string;
  color: string;
}

export interface Bookmark {
  _id?: string;
  title?: string | null;
  description?: string | null;
  banner?: string | null;
  labels?: colorInterface[];
  links?: LinksInterface[];
}

export interface BookmarkStateInterface {
  bookmarks: Bookmark[];
  bookmark: Bookmark[];
  status?: "idle" | "pending" | "succeeded" | "failed";
  fetching?: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error?: string | null;
}

const initialState: BookmarkStateInterface = {
  bookmarks: [],
  bookmark: [],
  status: "idle",
  fetching: "idle",
  isLoading: false,
  error: null,
};

export const getBookmarks = createAsyncThunk<
  Bookmark[],
  undefined,
  { state: RootState }
>("/bookmarks/get", async (_, thunkAPI) => {
  try {
    return await handleGetBookmarks(thunkAPI.getState().auth.user?.token!);
  } catch (error) {
    return error;
  }
});

export const addBookmark = createAsyncThunk<
  Bookmark,
  Bookmark,
  { state: RootState }
>("/bookmarks/add", async (bookmark: Bookmark, thunkAPI) => {
  try {
    return await handleAddBookmark(
      bookmark,
      thunkAPI.getState().auth.user?.token!
    );
  } catch (error) {
    return error;
  }
});

export const dropBookmark = createAsyncThunk<
  Bookmark,
  string,
  { state: RootState }
>("user/bookmark/drop", async (id, thunkAPI) => {
  try {
    return await handleDropBookmark(id, thunkAPI.getState().auth.user?.token!);
  } catch (error) {
    return error;
  }
});

export const updateBookmark = createAsyncThunk<
  Bookmark,
  Bookmark,
  { state: RootState }
>("/bookmark/update", async (bookmark, thunkAPI) => {
  try {
    return await handleUpdateBookmark(
      bookmark,
      thunkAPI.getState().auth.user?.token!
    );
  } catch (error) {
    return error;
  }
});

export const singleBookmark = createAsyncThunk<
  Bookmark[],
  string,
  { state: RootState }
>("/bookmark", async (id, thunkAPI) => {
  try {
    return await handleSingleBookmark(
      id,
      thunkAPI.getState().auth.user?.token!
    );
  } catch (error) {
    return error;
  }
});

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      // state.fetching = "idle";
      state.error = null;
      state.isLoading = false;
      state.bookmark = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBookmarks.pending, (state) => {
        if (state.bookmarks.length === 0) {
          state.fetching = "pending";
          state.status = "pending";
        }
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.fetching = "succeeded";
        state.status = "succeeded";
        state.bookmarks = [...action.payload];
      })
      .addCase(getBookmarks.rejected, (state) => {
        state.status = "failed";
        state.fetching = "failed";
      })
      .addCase(singleBookmark.pending, (state) => {
        if (state.bookmark.length !== 0) {
          state.status = "pending";
        }
      })
      .addCase(singleBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.bookmark.length === 0) {
          state.bookmark = [...action.payload];
        }
      })
      .addCase(singleBookmark.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookmarks.push(action.payload);
      })
      .addCase(addBookmark.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(dropBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dropBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookmarks = state.bookmarks.filter(
          (bm) => bm._id !== action.payload._id
        );
      })
      .addCase(dropBookmark.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookmark = [action.payload];
      })
      .addCase(updateBookmark.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
