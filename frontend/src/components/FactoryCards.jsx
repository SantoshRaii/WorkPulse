const FactoryCards = ({ data }) => {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div>
        <h3>Total Productive Minutes</h3>
        <p>{data.total_productive_minutes}</p>
      </div>

      <div>
        <h3>Total Units Produced</h3>
        <p>{data.total_units_produced}</p>
      </div>

      <div>
        <h3>Average Utilization %</h3>
        <p>{data.average_utilization_percent}</p>
      </div>
    </div>
  );
};

export default FactoryCards;
