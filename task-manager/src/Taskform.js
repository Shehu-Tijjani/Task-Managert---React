import React, { useState } from "react";

function TaskForm({ onAddTask }) {
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskInput.trim()) {
      onAddTask(taskInput);
      setTaskInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Enter a new task"
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
