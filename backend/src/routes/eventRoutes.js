import express from "express";
import { ingestEvent, seedDummyEvents } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", ingestEvent);
router.post("/seed", seedDummyEvents);
export default router;
