import { eq } from "drizzle-orm";

import { db } from "../db";
import { inventory } from "../db/schema";

export class InventoryService {
  async getAllInventory() {
    return db.select().from(inventory);
  }

  async getInventoryBySku(sku: string) {
    const result = await db
      .select()
      .from(inventory)
      .where(eq(inventory.sku, sku));

    return result[0] ?? null;
  }
}

export const inventoryService = new InventoryService();