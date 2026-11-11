import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Plus, X } from "lucide-react";

import { todoStore } from "../store/todoStore";

const AddTodo = observer(() => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    await todoStore.addTodo(name, description);

    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <>
      <button
        className="add-button"
        onClick={() => setOpen(true)}
      >
        <Plus size={19} />
        Add Todo
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div>
                <h2>Create Todo</h2>
                <p>Add a new task to your list</p>
              </div>

              <button
                className="icon-button"
                onClick={() => setOpen(false)}
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
                  placeholder="Enter todo name..."
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  placeholder="Write something about this task..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-button"
                >
                  <Plus size={18} />
                  Create Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
});

export default AddTodo;