import axios from "axios";
import type { Todo } from "../types/todo";

const api = axios.create({
  baseURL: "https://to-dos-api.softclub.tj",
});

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get("/api/to-dos");

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  return [];
};

export const addTodo = async (
  name: string,
  description: string
) => {
  const formData = new FormData();

  formData.append("Name", name);
  formData.append("Description", description);

  const { data } = await api.post("/api/to-dos", formData);

  return data;
};

export const editTodo = async (
  id: number,
  name: string,
  description: string,
  isCompleted: boolean
) => {
  const formData = new FormData();

  formData.append("Id", String(id));
  formData.append("Name", name);
  formData.append("Description", description);
  formData.append("IsCompleted", String(isCompleted));

  const { data } = await api.put("/api/to-dos", formData);

  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await api.delete(`/api/to-dos?id=${id}`);

  return data;
};