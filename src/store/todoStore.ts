import { makeAutoObservable, runInAction } from "mobx";

import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "../api/todoApi";

import type { Todo } from "../types/todo";

class TodoStore {
  todos: Todo[] = [];

  loading = false;

  search = "";

  selectedTodo: Todo | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSearch(value: string) {
    this.search = value;
  }

  setSelectedTodo(todo: Todo | null) {
    this.selectedTodo = todo;
  }

  get filteredTodos() {
    return this.todos.filter((todo) => {
      return (
        todo.name
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        todo.description
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    });
  }

  async getTodos() {
    try {
      this.loading = true;

      const data = await getTodos();

      runInAction(() => {
        this.todos = data;
      });
    } catch (error) {
      console.error("GET TODOS ERROR:", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async addTodo(name: string, description: string) {
    try {
      await addTodo(name, description);

      await this.getTodos();
    } catch (error) {
      console.error("ADD TODO ERROR:", error);
    }
  }

  async editTodo(
    id: number,
    name: string,
    description: string,
    isCompleted: boolean
  ) {
    try {
      await editTodo(
        id,
        name,
        description,
        isCompleted
      );

      this.setSelectedTodo(null);

      await this.getTodos();
    } catch (error) {
      console.error("EDIT TODO ERROR:", error);
    }
  }

  async deleteTodo(id: number) {
    try {
      await deleteTodo(id);

      await this.getTodos();
    } catch (error) {
      console.error("DELETE TODO ERROR:", error);
    }
  }

  async toggleTodo(todo: Todo) {
    await this.editTodo(
      todo.id,
      todo.name,
      todo.description,
      !todo.isCompleted
    );
  }
}

export const todoStore = new TodoStore();