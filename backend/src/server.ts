
import "dotenv/config";

import app from "./app";
import { startInventorySyncJob } from "./jobs/inventory-sync.jobs"

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Northstar Inventory API running on http://localhost:${PORT}`
  );

  startInventorySyncJob();
});