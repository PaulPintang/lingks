import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id?: number | string;
  title: string | undefined;
  description: string | undefined;
}

const initialState: Todo[] = [
  {
    id: 1,
    title: "Eat",
    description: "eat before sleep",
  },
  {
    id: 2,
    title: "Sleep",
    description: "sleep before coding",
  },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: ({ title, description }: Todo) => {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
          },
        };
      },
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
