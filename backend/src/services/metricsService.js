import prisma from "../prismaClient.js";

/**
 * Utility: calculate minutes between two timestamps
 */
const diffMinutes = (t1, t2) => {
  return (new Date(t2) - new Date(t1)) / (1000 * 60);
};

/**
 * WORKER LEVEL METRICS
 */
export const getWorkerMetrics = async () => {
  const workers = await prisma.worker.findMany({
    include: { events: true }
  });

  return workers.map(worker => {
    let working = 0;
    let idle = 0;
    let absent = 0;
    let units = 0;

    const events = worker.events.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    for (let i = 0; i < events.length - 1; i++) {
      const current = events[i];
      const next = events[i + 1];
      const minutes = diffMinutes(current.timestamp, next.timestamp);

      if (current.event_type === "working") working += minutes;
      if (current.event_type === "idle") idle += minutes;
      if (current.event_type === "absent") absent += minutes;
      if (current.event_type === "product_count")
        units += current.count || 0;
    }

    const totalTime = working + idle + absent;
    const utilization = totalTime
      ? ((working / totalTime) * 100).toFixed(1)
      : 0;

    return {
      worker_id: worker.id,
      name: worker.name,
      working_minutes: working,
      idle_minutes: idle,
      absent_minutes: absent,
      utilization_percent: utilization,
      units_produced: units
    };
  });
};

/**
 * WORKSTATION LEVEL METRICS
 */
export const getWorkstationMetrics = async () => {
  const stations = await prisma.workstation.findMany({
    include: { events: true }
  });

  return stations.map(station => {
    let working = 0;
    let idle = 0;
    let absent = 0;
    let units = 0;

    const events = station.events.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    for (let i = 0; i < events.length - 1; i++) {
      const current = events[i];
      const next = events[i + 1];
      const minutes = diffMinutes(current.timestamp, next.timestamp);

      if (current.event_type === "working") working += minutes;
      if (current.event_type === "idle") idle += minutes;
      if (current.event_type === "absent") absent += minutes;
      if (current.event_type === "product_count")
        units += current.count || 0;
    }

    const totalTime = working + idle + absent;
    const utilization = totalTime
      ? ((working / totalTime) * 100).toFixed(1)
      : 0;

    return {
      station_id: station.id,
      name: station.name,
      working_minutes: working,
      idle_minutes: idle,
      absent_minutes: absent,
      utilization_percent: utilization,
      units_produced: units
    };
  });
};


/**
 * FACTORY LEVEL METRICS
 */
export const getFactoryMetrics = async () => {
  const workers = await getWorkerMetrics();

  let totalWorking = 0;
  let totalUnits = 0;
  let totalUtilization = 0;

  workers.forEach(w => {
    totalWorking += w.working_minutes;
    totalUnits += w.units_produced;
    totalUtilization += Number(w.utilization_percent);
  });

  return {
    total_productive_minutes: totalWorking,
    total_units_produced: totalUnits,
    average_utilization_percent: (
      totalUtilization / workers.length
    ).toFixed(1)
  };
};

