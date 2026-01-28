# AI-Powered Worker Productivity Dashboard

A full-stack web application that ingests AI-generated CCTV events, stores them in a database, computes productivity metrics, and displays them in a web dashboard for a manufacturing factory.

---

## 📌 Problem Statement

Manufacturing factories use AI-powered cameras to monitor worker activities.  
This system consumes structured events from those cameras and converts them into meaningful productivity insights at:

- Worker level  
- Workstation level  
- Factory level  

---

## 🏗 Architecture

AI Cameras  
→ Backend API (Node.js + Express)  
→ SQLite Database (Prisma ORM)  
→ Metrics Engine  
→ React Frontend Dashboard  

The backend exposes REST APIs for ingesting events and retrieving computed metrics.  
The frontend consumes these APIs and displays results.

---

## 🛠 Tech Stack

### Backend
- Node.js  
- Express.js  
- Prisma ORM  
- SQLite  

### Frontend
- React (Vite)  
- Axios  

---

## 📂 Database Schema

### Worker
- id (string)
- name (string)

### Workstation
- id (string)
- name (string)

### Event
- id (number)
- timestamp (datetime)
- worker_id (string)
- workstation_id (string)
- event_type (working | idle | absent | product_count)
- confidence (float, optional)
- count (integer, for product_count)

---

## 📊 Metric Definitions

### Worker-Level Metrics
- Working minutes  
- Idle minutes  
- Absent minutes  
- Utilization %  
- Total units produced  

Utilization %  
```

(working_minutes / total_minutes) * 100

```

### Workstation-Level Metrics
- Working minutes  
- Idle minutes  
- Absent minutes  
- Utilization %  
- Total units produced  

### Factory-Level Metrics
- Total productive minutes  
- Total units produced  
- Average utilization across workers  

---

## ⏱ Time Calculation Logic

Events are sorted by timestamp.  
For every consecutive pair of events:

```

time_difference = next_event.timestamp - current_event.timestamp

```

This time difference is assigned to the **current event type**.

Example:

```

10:00 working
10:15 idle

```

15 minutes counted as working.

---

## 🧮 Production Aggregation

For every event with:

```

event_type = "product_count"

```

The `count` value is added to total production.

---

## 🔌 API Endpoints

### Seed Workers & Workstations
```

POST /api/seed

```

### Ingest Single Event
```

POST /api/events

```

### Generate Dummy Events
```

POST /api/events/seed

```

### Worker Metrics
```

GET /api/metrics/workers

```

### Workstation Metrics
```

GET /api/metrics/workstations

```

### Factory Metrics
```

GET /api/metrics/factory

```

---

## ▶ Running Locally

### Backend

```

cd backend
npm install
npx prisma migrate dev
npm run dev

```

Backend runs on:

```

http://localhost:4000

```

---

### Frontend

```

cd frontend
npm install
npm run dev

```

Frontend runs on:

```

http://localhost:5173

```

---

## 🔁 Handling Intermittent Connectivity

- All events are persisted immediately.
- Clients can safely retry sending events.
- Database acts as source of truth.

---

## 🧹 Handling Duplicate Events

- Can enforce unique constraint on:
```

(timestamp, worker_id, workstation_id, event_type)

```

---

## ⏳ Handling Out-of-Order Events

- Events are sorted by timestamp before metric computation.

---

## 🧬 Model Versioning

- Add `model_version` field in Event table.
- Every event tagged with model version.

---

## 📉 Detecting Model Drift

- Monitor average confidence score.
- Track sudden drops in utilization or production.
- Compare distributions over time.

---

## 🔄 Triggering Retraining

- If confidence falls below threshold.
- If drift detected.
- If new factory layout introduced.

---

## 📈 Scaling Strategy

### 5 Cameras
- Single backend instance.

### 100+ Cameras
- Message queue (Kafka/RabbitMQ).
- Multiple backend workers.
- Horizontal scaling.

### Multi-Site
- Each site publishes to central event pipeline.
- Site-level and global aggregation.

---

## ⚖ Assumptions

- Events represent state changes.
- Time between two events belongs to previous state.
- Product events directly represent units produced.

---

## 🔮 Future Improvements

- Date range filters  
- Authentication & roles  
- Real-time streaming with WebSockets  
- Charts & graphs  
- Caching layer  

---

## 👨‍💻 Author

Santosh Rai
```

---

