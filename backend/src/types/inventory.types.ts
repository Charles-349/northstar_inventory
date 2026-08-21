export interface InventoryItem {
  id: number;
  sku: string;
  productName: string;
  quantity: number;
  warehouse: string;
  createdAt: Date;
  updatedAt: Date;
  lastSyncedAt: Date;
}