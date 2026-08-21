export interface WarehouseInventoryItem {
  sku: string;
  productName: string;
  quantity: number;
  warehouse: string;
}

export class WarehouseProvider {
  async getInventory(): Promise<WarehouseInventoryItem[]> {
    
    return [
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
    ];
  }
}

export const warehouseProvider = new WarehouseProvider();