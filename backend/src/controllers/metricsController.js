import { getWorkerMetrics,getWorkstationMetrics, getFactoryMetrics } from "../services/metricsService.js";

export const workerMetrics = async (req, res) => {
  try {
    const data = await getWorkerMetrics();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch worker metrics" });
  }
};

export const workstationMetrics = async (req, res) => {
  try {
    const data = await getWorkstationMetrics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workstation metrics" });
  }
};

export const factoryMetrics = async (req, res) => {
  try {
    const data = await getFactoryMetrics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch factory metrics" });
  }
};

