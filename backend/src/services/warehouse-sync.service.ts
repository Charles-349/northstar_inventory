import { eq } from "drizzle-orm";

import { db } from "../db";
import { inventory } from "../db/schema";
import { warehouseProvider } from "../providers/warehouse.provider";

export interface WarehouseItem {
  sku: string;
  productName: string;
  quantity: number;
  warehouse: string;
}

export class WarehouseSyncService {
  async fetchWarehouseInventory(): Promise<WarehouseItem[]> {
  
    return [
      {
        sku: "SKU-001",
        productName: "Dell Latitude 5440",
        quantity: 22,
        warehouse: "Nairobi Main Warehouse",
      },
      {
        sku: "SKU-002",
        productName: "Logitech MX Keys",
        quantity: 77,
        warehouse: "Nairobi Main Warehouse",
      },
      {
        sku: "SKU-005",
        productName: "MacBook Air M3",
        quantity: 12,
        warehouse: "Mombasa Warehouse",
      },
    ];
  }

  async syncInventory() {
    const warehouseItems = await warehouseProvider.getInventory();

    let created = 0;
    let updated = 0;

    for (const item of warehouseItems) {
      const existing = await db
        .select()
        .from(inventory)
        .where(eq(inventory.sku, item.sku));

      if (existing.length > 0) {
        await db
          .update(inventory)
          .set({
            productName: item.productName,
            quantity: item.quantity,
            warehouse: item.warehouse,
            lastSyncedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(inventory.sku, item.sku));

        updated++;
      } else {
        await db.insert(inventory).values({
          sku: item.sku,
          productName: item.productName,
          quantity: item.quantity,
          warehouse: item.warehouse,
        });

        created++;
      }
    }

    return {
      success: true,
      created,
      updated,
      total: warehouseItems.length,
    };
  }
}

export const warehouseSyncService = new WarehouseSyncService();