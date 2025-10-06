import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeaTrackerApp.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // only once

export default function TeaTrackerApp({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roommates = ["Hemanshu", "Shailendra", "Nirmal", "Subhash"];

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/tasks`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add a task
  const addTask = async () => {
    if (!taskInput.trim()) return;
    try {
      const newTask = { roommate: user.username, task: taskInput };
      const res = await axios.post(`${BACKEND_URL}/api/tasks`, newTask);
      setTasks((prev) => [res.data, ...prev]);
      setTaskInput("");
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task");
    }
  };

  // Delete task (admin only)
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task");
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Roommate Task Tracker</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <section className="task-input">
        <h2>Welcome, {user.username}!</h2>
        <input
          type="text"
          placeholder="Enter task (e.g., Made Tea)"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        {error && <p className="error">{error}</p>}
      </section>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              {roommates.map((r) => (
                <th key={r}>{r}</th>
              ))}
              {user.role === "admin" && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id}>
                <td>{t.createdAt ? new Date(t.createdAt).toLocaleString() : "N/A"}</td>
                {roommates.map((r) => (
                  <td key={r}>{t.roommate === r ? t.task : ""}</td>
                ))}
                {user.role === "admin" && (
                  <td>
                    <button className="delete-btn" onClick={() => deleteTask(t._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
