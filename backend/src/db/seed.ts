import "dotenv/config";

import { db } from "./db";
import { inventory } from "./db/schema";

async function seed() {
  console.log("🌱 Seeding database...");

  await db.insert(inventory).values([
    {
      sku: "SKU-001",
      productName: "Dell Latitude 5440",
      quantity: 25,
      warehouse: "Nairobi Main Warehouse",
    },
    {
      sku: "SKU-002",
      productName: "Logitech MX Keys",
      quantity: 80,
      warehouse: "Nairobi Main Warehouse",
    },
    {
      sku: "SKU-003",
      productName: "Samsung 27 Monitor",
      quantity: 15,
      warehouse: "Mombasa Warehouse",
    },
    {
      sku: "SKU-004",
      productName: "HP EliteBook 840",
      quantity: 30,
      warehouse: "Nairobi Main Warehouse",
    },
  ]);

  console.log("✅ Seed completed");

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});