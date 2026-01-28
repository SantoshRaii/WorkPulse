const StationTable = ({ data }) => {
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
        {data.map(s => (
          <tr key={s.station_id}>
            <td>{s.name}</td>
            <td>{s.working_minutes}</td>
            <td>{s.idle_minutes}</td>
            <td>{s.absent_minutes}</td>
            <td>{s.utilization_percent}</td>
            <td>{s.units_produced}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StationTable;
