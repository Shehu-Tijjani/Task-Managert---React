import React, { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./Taskform";

function App() {
  // const [tasks, setTasks] = useState([]);

  //  const LOCAL_STORAGE_KEY = 'taskManager.tasks';

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

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            text: !task.completed
              ? `${task.text} ---hurray`
              : task.text.replace(" ---hurray", ""),
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

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <TaskForm onAddTask={addTask} />

      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
            onClick={(e) => toggleComplete(task.id)}
          >
            {task.text} - {task.completed ? "Complete" : "Incomplete"}
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
    </div>
  );
}

export default App;
