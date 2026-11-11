import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Save, X } from "lucide-react";

import { todoStore } from "../store/todoStore";

const EditTodo = observer(() => {
  const todo = todoStore.selectedTodo;

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setDescription(todo.description);
    }
  }, [todo]);

  if (!todo) return null;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    await todoStore.editTodo(
      todo.id,
      name,
      description,
      todo.isCompleted
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Edit Todo</h2>
            <p>Update your task information</p>
          </div>

          <button
            className="icon-button"
            onClick={() =>
              todoStore.setSelectedTodo(null)
            }
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="todo-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Name</label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() =>
                todoStore.setSelectedTodo(null)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
            >
              <Save size={18} />

              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditTodo;