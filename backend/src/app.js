import express from "express";
import cors from "cors";
import seedRoutes from "./routes/seedRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import metricsRoutes from "./routes/metricsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("AI Productivity Backend Running");
});

app.use("/api/seed", seedRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/metrics", metricsRoutes);

export default app;
