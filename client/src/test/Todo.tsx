import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addTodo } from "./todoSlice";

const Todo = () => {
  const title = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLInputElement | null>(null);

  const todos = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addTodo({
        title: title.current?.value,
        description: description.current?.value,
      })
    );
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="title" ref={title} />
        <input type="text" placeholder="description" ref={description} />
        <button type="submit">Add</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id} className="bg-blue-200 mb-2">
          <p>Title: {todo.title}</p>
          <p>Description: {todo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Todo;
