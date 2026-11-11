import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

import AddTodo from "./AddTodo";

const Header = () => {
  return (
    <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <TaskAltRoundedIcon />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Todo Manager
          </h1>

          <p className="text-sm text-gray-500">
            Stay organized and productive.
          </p>
        </div>
      </div>

      <AddTodo />
    </header>
  );
};

export default Header;