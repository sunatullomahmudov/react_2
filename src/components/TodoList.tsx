import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { CircularProgress } from "@mui/material";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

import { todoStore } from "../store/todoStore";

import TodoCard from "./TodoCard";
import SearchTodo from "./SearchTodo";

const TodoList = observer(() => {
  useEffect(() => {
    todoStore.getTodos();
  }, []);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            My Todos
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your daily tasks
          </p>
        </div>

        <SearchTodo />
      </div>

      {todoStore.loading ? (
        <div className="flex h-72 items-center justify-center">
          <CircularProgress />
        </div>
      ) : todoStore.filteredTodos.length === 0 ? (
        <div className="flex h-72 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
            <InboxRoundedIcon fontSize="large" />
          </div>

          <h3 className="font-semibold text-gray-800">
            No todos found
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Add a new todo to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {todoStore.filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
            />
          ))}
        </div>
      )}
    </section>
  );
});

export default TodoList;