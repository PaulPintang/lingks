import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  handleAddBookmark,
  handleAddLink,
  handleDropBookmark,
  handleGetBookmarks,
  handleUpdateBookmark,
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

export interface BookmarkInterface {
  _id?: string;
  title?: string | null;
  description?: string | null;
  banner?: string | null;
  labels?: colorInterface[];
  links?: LinksInterface[];
}

export interface StateInterface {
  bookmarks: BookmarkInterface[];
  status?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: StateInterface = {
  bookmarks: [],
};

export const getBookmarks = createAsyncThunk<
  BookmarkInterface[],
  undefined,
  { state: RootState }
>("/bookmarks/get", async (_, thunkAPI) => {
  try {
    return await handleGetBookmarks(thunkAPI.getState().user.user?.token!);
  } catch (error) {
    return error;
  }
});

export const addBookmark = createAsyncThunk<
  BookmarkInterface,
  BookmarkInterface,
  { state: RootState }
>("/bookmarks/add", async (bookmark: BookmarkInterface, thunkAPI) => {
  try {
    return await handleAddBookmark(
      bookmark,
      thunkAPI.getState().user.user?.token!
    );
  } catch (error) {
    return error;
  }
});

export const dropBookmark = createAsyncThunk<
  BookmarkInterface,
  string,
  { state: RootState }
>("user/bookmark/drop", async (id, thunkAPI) => {
  try {
    return await handleDropBookmark(id, thunkAPI.getState().user.user?.token!);
  } catch (error) {
    return error;
  }
});

export const updateBookmark = createAsyncThunk<
  BookmarkInterface,
  BookmarkInterface,
  { state: RootState }
>("/bookmark/update", async (bookmark, thunkAPI) => {
  try {
    return await handleUpdateBookmark(
      bookmark,
      thunkAPI.getState().user.user?.token!
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
        state.bookmarks = [...action.payload];
      })
      .addCase(getBookmarks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addBookmark.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarks.push(action.payload);
      })
      .addCase(addBookmark.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(dropBookmark.pending, (state) => {
        state.status = "pending";
      })
      .addCase(dropBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookmarks = state.bookmarks.filter(
          (bm) => bm._id !== action.payload._id
        );
      })
      .addCase(dropBookmark.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateBookmark.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateBookmark.fulfilled, (state, action) => {
        // ! need to refactor, remove the fetch and update only the state bookmark
        state.status = "succeeded";
        // const updated = state.bookmarks.map((bm) =>
        //   bm._id === action.payload._id ? action.payload : bm
        // );
        // state.bookmarks = [...updated];
      })
      .addCase(updateBookmark.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
