export default function TaskForm({ taskInput, setTaskInput, addTask }) {
  return (
    <div style={{ marginBottom:"20px" }}>
      <input 
        value={taskInput} 
        onChange={e => setTaskInput(e.target.value)} 
        placeholder="Enter task" 
        style={{ padding:"8px", width:"200px", marginRight:"10px" }}
      />
      <button onClick={addTask} style={{ padding:"8px 16px", cursor:"pointer" }}>Add Task</button>
    </div>
  );
}
