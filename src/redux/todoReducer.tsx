//  Code for todoReducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type for todo payload
export type todoPayload = {
  id: number;
  text: string;
  complete?: boolean;
  dueDate: string;
  createdAt: string;
};
const initialState: {
  todos: todoPayload[];
} = {
  todos: [],
};

// Todo reducer
const todoReducer = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todoPayload>) => {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, complete: !todo.complete }
          : todo
      );
    },
    updateAllTodos: (state, action: PayloadAction<todoPayload[]>) => {
      state.todos = action.payload;
    },
  },
});

// Exporting todo actions
export const Todo = todoReducer.actions;
export default todoReducer.reducer;
