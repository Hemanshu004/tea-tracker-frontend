import { useEffect, useState } from "react";
import axios from "axios";

const AdminPortal = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [roommate, setRoommate] = useState("Hemanshu");
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if(!taskInput || !roommate) return;
    await axios.post("http://localhost:5000/tasks", { task: taskInput, roommate }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTaskInput("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  return (
    <div className="admin-portal">
      <h2>Admin Portal</h2>
      <div>
        <select value={roommate} onChange={e => setRoommate(e.target.value)}>
          <option>Hemanshu</option>
          <option>Shailendra</option>
          <option>Nirmal</option>
          <option>Roommate4</option>
        </select>
        <input 
          type="text" 
          placeholder="Enter task" 
          value={taskInput} 
          onChange={e => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <table className="task-table">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Roommate</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td>{new Date(t.timestamp).toLocaleString()}</td>
              <td>{t.roommate}</td>
              <td>{t.task}</td>
              <td><button onClick={() => deleteTask(t._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPortal;
