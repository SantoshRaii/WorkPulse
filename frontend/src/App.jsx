import { useEffect, useState } from "react";
import axios from "axios";
import FactoryCards from "./components/FactoryCards";
import WorkerTable from "./components/WorkerTable";
import StationTable from "./components/StationTable";

const API = import.meta.env.VITE_API_URL + "/api/metrics";

function App() {
  const [factory, setFactory] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    axios.get(`${API}/factory`).then(res => setFactory(res.data));
    axios.get(`${API}/workers`).then(res => setWorkers(res.data));
    axios.get(`${API}/workstations`).then(res => setStations(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Worker Productivity Dashboard</h1>

      {factory && <FactoryCards data={factory} />}

      <h2>Workers</h2>
      <WorkerTable data={workers} />

      <h2>Workstations</h2>
      <StationTable data={stations} />
    </div>
  );
}

export default App;
