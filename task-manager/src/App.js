import React, { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./Taskform";

function App() {
  // const [tasks, setTasks] = useState([]);

  //  const LOCAL_STORAGE_KEY = 'taskManager.tasks';

  const [filter, setFilter] = useState("all");
  // task edits
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const toggleTaskComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "complete") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return task;
  });

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  const saveTaskEdit = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editingText } : task
    );

    setTasks(updatedTasks);
    // default the tracker
    setEditingTaskId(null);
    setEditingText("");
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <div className="filter">
        <span>Filter</span>
        <div className="drop-down">
          <div className="connector"></div>
          <p onClick={() => setFilter("all")}>All</p>
          <p onClick={() => setFilter("complete")}>Complete</p>
          <p onClick={() => setFilter("Incomplete")}>Incomplete</p>
        </div>
      </div>

      <TaskForm onAddTask={addTask} />

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
            // onClick={(e) => toggleTaskComplete(task.id)}
          >
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" ? saveTaskEdit(task.id) : null
                }
                autoFocus
              />
            ) : (
              <p className="text">
                {task.text}- {task.completed ? "Completed" : "Incomplete"}
              </p>
            )}

            <button onClick={(e) => toggleTaskComplete(task.id)}>
              {task.completed ? (
                (console.log(),
                (
                  <svg>
                    <use xlinkHref="sprite.svg#icon-cross"></use>
                  </svg>
                ))
              ) : (
                <svg>
                  <use xlinkHref="sprite.svg#icon-checkmark"></use>
                </svg>
              )}
            </button>

            {editingTaskId === task.id ? (
              <button onClick={() => saveTaskEdit(task.id)}>Save</button>
            ) : (
              <button onClick={() => startEditing(task.id, task.text)}>
                Edit
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="task-stats">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {tasks.filter((task) => task.completed).length}</p>
      </div>

      <button className="clear" onClick={clearTasks}>
        Clear all Tasks
      </button>
    </div>
  );
}

export default App;
