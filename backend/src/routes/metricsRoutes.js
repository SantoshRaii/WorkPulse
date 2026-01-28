import express from "express";
import { workerMetrics, workstationMetrics, factoryMetrics } from "../controllers/metricsController.js";

const router = express.Router();

router.get("/workers", workerMetrics);
router.get("/workstations", workstationMetrics);
router.get("/factory", factoryMetrics);

export default router;
