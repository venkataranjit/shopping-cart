import { useState, useEffect } from "react";
import "./todo.scss";
import { v4 as uuidv4 } from "uuid";
import { Bounce, toast, ToastContainer } from "react-toastify";

const toastifySettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

const getTodos = JSON.parse(localStorage.getItem("Todo"));

const Crud = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState("");
  const [isCompletedOnly, setIsCompletedOnly] = useState(false);  
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodos = () => {
    if (editId) {
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditId(null);
      toast.success("Todo Updated Successfully", toastifySettings);
    } else {
      setTodos((prev) => [{ todo, isCompleted: false, id: uuidv4() }, ...prev]);
      toast.success("Todo Added Successfully", toastifySettings);
    }

    setTodo("");
  };

  const editTodo = (e, id) => {
    e.preventDefault();

    const todoToEdit = todos.find((item) => item.id === id);
    if (!todoToEdit) return;
    setTodo(todoToEdit.todo); // 🧠 only string
    setEditId(id); // store id separately
  };

  const deleteTodo = (e, id) => {
    e.preventDefault();
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    toast.error("Todo Deleted Successfully", toastifySettings);
  };

  const completedTodo = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = isCompletedOnly
  ? todos.filter((item) => item.isCompleted)
  : todos;

  useEffect(() => {
    localStorage.setItem("Todo", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setTodos(getTodos || []);
  }, []);

  console.log(todos);

  return (
    <>
      <ToastContainer />
      <div className="container mt-3 todoApp">
        <div className="col-sm-8 mx-auto">
          <div className="card p-4">
            <h4>Todo App</h4>
            <div className="addTodo">
              <input
                type="text"
                className="form-control"
                placeholder="Add Todo"
                name="todo"
                value={todo}
                onChange={handleChange}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={addTodos}
                disabled={todo.trim().length < 3}
              >
                {editId ? "UPDATE" : "Add"}
              </button>
            </div>
            <div className="mt-4">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkNativeSwitch"
                  checked={isCompletedOnly}
                  onChange={() => setIsCompletedOnly(!isCompletedOnly)}
                />
                <label className="form-check-label" htmlFor="checkNativeSwitch">
                  Show Completed Tasks only
                </label>
              </div>
            </div>
            <div className="todos mt-4">
              <h4>Todo App</h4>
              <ul className="list-group">
                {filteredTodos?.length > 0 ? (
                  filteredTodos.map((item) => {
                    return (
                      <li className="list-group-item" key={item.id}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <input
                              className="form-check-input me-1"
                              type="checkbox"
                              
                              id={item.id}
                              checked={item.isCompleted}
                              onChange={() => completedTodo(item.id)}
                            />
                            <label
                              className={`form-check-label stretched-link ${item.isCompleted ? "line-through" : "" } `}
                              htmlFor={item.id}
                            >
                              {item.todo}
                            </label>
                          </div>
                          <div>
                            <span
                              className="badge text-bg-warning"
                              onClick={(e) => editTodo(e, item.id)}
                            >
                              <i className="fa fa-edit"></i>
                            </span>
                            <span
                              className="badge text-bg-danger"
                              onClick={(e) => deleteTodo(e, item.id)}
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="list-group-item">No Todos</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crud;
