import express from "express";
import cors from "cors";

import healthRoutes from "./health.routes";
import inventoryRoutes from "./routes/inventory.router";
import syncRoutes from "./routes/warehouse-sync.route";
import { errorHandler } from "./middleware/error.middleware";
import checkinRoutes from "./routes/checkin.route";
import webhookRoutes from "./routes/webhook.routes";
import attendeeRoutes from "./routes/attendee.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  })
);
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/check-in", checkinRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/attendees", attendeeRoutes);

app.use(errorHandler);

export default app;