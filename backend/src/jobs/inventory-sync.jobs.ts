import { warehouseSyncService } from "../services/warehouse-sync.service";

export function startInventorySyncJob() {
  console.log("📦 Inventory sync scheduler started");

  const runSync = async () => {
    try {
      console.log("🔄 Running inventory sync...");

      const result = await warehouseSyncService.syncInventory();

      console.log("✅ Inventory sync completed:", result);
    } catch (error) {
      console.error("❌ Inventory sync failed:", error);
    }
  };

  // Run immediately when server starts
  runSync();

  // Run every 5 minutes
  setInterval(runSync, 5 * 60 * 1000);
}