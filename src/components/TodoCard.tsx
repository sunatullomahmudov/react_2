import { observer } from "mobx-react-lite";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

import type { Todo } from "../types/todo";
import { todoStore } from "../store/todoStore";

interface Props {
  todo: Todo;
}

const TodoCard = observer(({ todo }: Props) => {
  const image =
    todo.images?.length > 0
      ? `https://to-dos-api.softclub.tj/images/${todo.images[0].imageName}`
      : "";

  return (
    <Card
      className="group overflow-hidden rounded-3xl! border border-gray-200! shadow-none! transition-all duration-300 hover:-translate-y-1 hover:shadow-xl!"
    >
      {/* IMAGE */}

      <div className="relative h-[210px] overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={todo.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "#e8eaf6",
                color: "#6366f1",
              }}
            >
              {todo.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </div>
        )}

        {/* STATUS */}

        <div className="absolute left-4 top-4">
          <Chip
            icon={
              todo.isCompleted ? (
                <CheckCircleRoundedIcon />
              ) : (
                <RadioButtonUncheckedRoundedIcon />
              )
            }
            label={
              todo.isCompleted
                ? "Completed"
                : "In progress"
            }
            sx={{
              bgcolor: todo.isCompleted
                ? "#dcfce7"
                : "#fff7ed",

              color: todo.isCompleted
                ? "#15803d"
                : "#ea580c",

              fontWeight: 600,

              "& .MuiChip-icon": {
                color: todo.isCompleted
                  ? "#16a34a"
                  : "#f97316",
              },
            }}
          />
        </div>
      </div>

      <CardContent className="p-5!">
        <div className="mb-4">
          <p className="mb-1 text-xs font-medium text-gray-400">
            TODO #{todo.id}
          </p>

          <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
            {todo.name}
          </h2>

          <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
            {todo.description || "No description"}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <Button
            size="small"
            variant={
              todo.isCompleted
                ? "outlined"
                : "contained"
            }
            startIcon={
              todo.isCompleted ? (
                <RadioButtonUncheckedRoundedIcon />
              ) : (
                <CheckCircleRoundedIcon />
              )
            }
            onClick={() =>
              todoStore.toggleTodo(todo)
            }
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            {todo.isCompleted
              ? "Undo"
              : "Complete"}
          </Button>

          <div className="flex gap-1">
            <IconButton
              onClick={() =>
                todoStore.setSelectedTodo(todo)
              }
              sx={{
                color: "#6366f1",
                bgcolor: "#eef2ff",

                "&:hover": {
                  bgcolor: "#e0e7ff",
                },
              }}
            >
              <EditRoundedIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={() =>
                todoStore.deleteTodo(todo.id)
              }
              sx={{
                color: "#ef4444",
                bgcolor: "#fef2f2",

                "&:hover": {
                  bgcolor: "#fee2e2",
                },
              }}
            >
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default TodoCard;