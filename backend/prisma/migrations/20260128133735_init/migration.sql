-- CreateTable
CREATE TABLE "Worker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Workstation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL,
    "event_type" TEXT NOT NULL,
    "confidence" REAL,
    "count" INTEGER,
    "worker_id" TEXT NOT NULL,
    "workstation_id" TEXT NOT NULL,
    CONSTRAINT "Event_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "Worker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Event_workstation_id_fkey" FOREIGN KEY ("workstation_id") REFERENCES "Workstation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Event_worker_id_timestamp_idx" ON "Event"("worker_id", "timestamp");

-- CreateIndex
CREATE INDEX "Event_workstation_id_timestamp_idx" ON "Event"("workstation_id", "timestamp");
