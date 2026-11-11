import { observer } from "mobx-react-lite";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";

import { todoStore } from "../store/todoStore";

const Stats = observer(() => {
  const completed =
    todoStore.todos.filter(
      (todo) => todo.isCompleted
    ).length;

  const pending =
    todoStore.todos.length - completed;

  const cards = [
    {
      title: "Total Todos",
      value: todoStore.todos.length,
      icon: <AssignmentRoundedIcon />,
      className:
        "bg-indigo-50 text-indigo-600",
    },

    {
      title: "Completed",
      value: completed,
      icon: <CheckCircleRoundedIcon />,
      className:
        "bg-green-50 text-green-600",
    },

    {
      title: "In Progress",
      value: pending,
      icon: <PendingActionsRoundedIcon />,
      className:
        "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((item) => (
        <div
          key={item.title}
          className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.className}`}
          >
            {item.icon}
          </div>

          <div>
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h3 className="mt-1 text-2xl font-bold text-gray-900">
              {item.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
});

export default Stats;