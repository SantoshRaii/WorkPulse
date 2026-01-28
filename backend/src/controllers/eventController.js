import prisma from "../prismaClient.js";

export const ingestEvent = async (req, res) => {
  try {
    const {
      timestamp,
      worker_id,
      workstation_id,
      event_type,
      confidence,
      count
    } = req.body;

    // Basic validation
    if (!timestamp || !worker_id || !workstation_id || !event_type) {
      return res.status(400).json({
        error: "timestamp, worker_id, workstation_id and event_type are required"
      });
    }

    const event = await prisma.event.create({
      data: {
        timestamp: new Date(timestamp),
        worker_id,
        workstation_id,
        event_type,
        confidence,
        count
      }
    });

    res.status(201).json({
      message: "Event ingested successfully",
      event
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to ingest event" });
  }
};

export const seedDummyEvents = async (req, res) => {
  try {
    const workers = ["W1","W2","W3","W4","W5","W6"];
    const stations = ["S1","S2","S3","S4","S5","S6"];
    const eventTypes = ["working", "idle", "absent"];

    const events = [];

    workers.forEach(worker => {
      let currentTime = new Date("2026-01-15T09:00:00Z");

      for (let i = 0; i < 20; i++) {
        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const station = stations[Math.floor(Math.random() * stations.length)];

        events.push({
          timestamp: new Date(currentTime),
          worker_id: worker,
          workstation_id: station,
          event_type: type,
          confidence: Number(Math.random().toFixed(2))
        });

        // every 5th event produce products
        if (i % 5 === 0) {
          events.push({
            timestamp: new Date(currentTime),
            worker_id: worker,
            workstation_id: station,
            event_type: "product_count",
            count: Math.floor(Math.random() * 5) + 1
          });
        }

        currentTime.setMinutes(currentTime.getMinutes() + 15);
      }
    });

    await prisma.event.createMany({
      data: events
    });

    res.json({
      message: "Dummy events generated",
      total: events.length
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed events" });
  }
};
