const WorkerTable = ({ data }) => {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Name</th>
          <th>Working Min</th>
          <th>Idle Min</th>
          <th>Absent Min</th>
          <th>Utilization %</th>
          <th>Units</th>
        </tr>
      </thead>
      <tbody>
        {data.map(w => (
          <tr key={w.worker_id}>
            <td>{w.name}</td>
            <td>{w.working_minutes}</td>
            <td>{w.idle_minutes}</td>
            <td>{w.absent_minutes}</td>
            <td>{w.utilization_percent}</td>
            <td>{w.units_produced}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkerTable;
