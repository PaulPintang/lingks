import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handleAddBookmark, handleGetBookmarks } from "./bookmarkService";

export interface LinksInterface {
  name: string | null;
  link: string | null;
  date: string | null;
}

export interface BookmarkInterface {
  id?: string;
  title: string | null;
  description: string | null;
  banner: string | null;
  labels: string[];
  links: LinksInterface[];
}

export interface StateInterface {
  bookmarks: BookmarkInterface[];
  status?: "idle" | "pending" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: StateInterface = {
  bookmarks: [],
};

export const getBookmarks = createAsyncThunk("user/bookmarks/get", async () => {
  try {
    return await handleGetBookmarks();
  } catch (error) {
    return error;
  }
});

export const addBookmark = createAsyncThunk(
  "user/bookmarks/add",
  async (bookmark: BookmarkInterface, thunkAPI) => {
    try {
      return await handleAddBookmark(bookmark);
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
        state.bookmarks = [...action.payload];
        console.log(action.payload);
      })
      .addCase(getBookmarks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addBookmark.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("New Bookmark:", action.payload.title);
      })
      .addCase(addBookmark.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
