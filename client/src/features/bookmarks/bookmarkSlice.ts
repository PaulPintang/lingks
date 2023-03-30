import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BookmarkInterface } from "../../interfaces/bookmark.interface";
import { RootState } from "../../app/store";
import {
  handleAddBookmark,
  handleDropBookmark,
  handleGetBookmarks,
  handleUpdateBookmark,
  handleSingleBookmark,
} from "./bookmarkService";

export interface BookmarkStateInterface {
  bookmarks: BookmarkInterface[];
  bookmark: BookmarkInterface[];
  status?: "idle" | "pending" | "succeeded" | "failed";
  isLoading: boolean;
  error?: string | null;
}

const initialState: BookmarkStateInterface = {
  bookmarks: [],
  bookmark: [],
  status: "idle",
  isLoading: false,
  error: null,
};

export const getBookmarks = createAsyncThunk<
  BookmarkInterface[],
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
  BookmarkInterface,
  BookmarkInterface,
  { state: RootState }
>("/bookmarks/add", async (bookmark: BookmarkInterface, thunkAPI) => {
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
  BookmarkInterface,
  string,
  { state: RootState }
>("user/bookmark/drop", async (id, thunkAPI) => {
  try {
    return await handleDropBookmark(id, thunkAPI.getState().auth.user?.token!);
    // return deleted id
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
      thunkAPI.getState().auth.user?.token!
    );
  } catch (error) {
    return error;
  }
});

export const singleBookmark = createAsyncThunk<
  BookmarkInterface[],
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
    resetBookmarkState: (state) => {
      state.status = "idle";
      state.error = null;
      state.isLoading = false;
      state.bookmark = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBookmarks.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBookmarks.fulfilled, (state, action) => {
        state.bookmarks = [...action.payload];
        state.status = "succeeded";
      })
      .addCase(getBookmarks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(singleBookmark.pending, (state) => {
        if (state.bookmark.length !== 0) {
          state.status = "pending";
        }
      })
      .addCase(singleBookmark.fulfilled, (state, action) => {
        if (state.bookmark.length === 0) {
          state.bookmark = [...action.payload];
        }
        state.status = "succeeded";
      })
      .addCase(singleBookmark.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
        state.isLoading = false;
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
        state.bookmarks = state.bookmarks.map((bm) => {
          if (bm._id === action.payload._id) {
            const updated = {
              ...bm,
              ...action.payload,
            };
            return updated;
          } else {
            return bm;
          }
        });
        state.bookmark = [action.payload];
        state.isLoading = false;
      })
      .addCase(updateBookmark.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetBookmarkState } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
