export default function TaskTable({ tasks, roommates, deleteTask, role }) {

  // Create a map: timestamp -> tasks for each roommate
  const tableData = {};

  tasks.forEach(t => {
    const time = new Date(t.timestamp).toLocaleString();
    if(!tableData[time]) tableData[time] = {};
    tableData[time][t.roommate] = t.task;
    tableData[time][`id_${t.roommate}`] = t._id;
  });

  const times = Object.keys(tableData).sort((a,b)=>new Date(a)-new Date(b));

  return (
    <table style={{ width:"100%", borderCollapse:"collapse" }}>
      <thead>
        <tr>
          <th style={{ border:"1px solid white", padding:"8px" }}>Date/Time</th>
          {roommates.map(r=> <th key={r} style={{ border:"1px solid white", padding:"8px" }}>{r}</th> )}
        </tr>
      </thead>
      <tbody>
        {times.map(time=> (
          <tr key={time}>
            <td style={{ border:"1px solid white", padding:"8px" }}>{time}</td>
            {roommates.map(r=> (
              <td key={r} style={{ border:"1px solid white", padding:"8px", textAlign:"center" }}>
                {tableData[time][r] || "-"}
                {role==="admin" && tableData[time][`id_${r}`] && 
                  <button 
                    onClick={()=>deleteTask(tableData[time][`id_${r}`])} 
                    style={{ marginLeft:"5px", cursor:"pointer" }}
                  >❌</button>
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
