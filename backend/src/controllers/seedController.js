import prisma from "../prismaClient.js";

export const seedData = async (req, res) => {
  try {
    // Clear old data
    await prisma.event.deleteMany();
    await prisma.worker.deleteMany();
    await prisma.workstation.deleteMany();

    // Workers
    const workers = [
      { id: "W1", name: "Amit" },
      { id: "W2", name: "Neha" },
      { id: "W3", name: "Ravi" },
      { id: "W4", name: "Pooja" },
      { id: "W5", name: "Karan" },
      { id: "W6", name: "Simran" }
    ];

    // Stations
    const stations = [
      { id: "S1", name: "Assembly" },
      { id: "S2", name: "Packaging" },
      { id: "S3", name: "Welding" },
      { id: "S4", name: "Inspection" },
      { id: "S5", name: "Painting" },
      { id: "S6", name: "Dispatch" }
    ];

    await prisma.worker.createMany({ data: workers });
    await prisma.workstation.createMany({ data: stations });

    res.json({
      message: "Seeded workers and workstations successfully"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Seeding failed" });
  }
};
