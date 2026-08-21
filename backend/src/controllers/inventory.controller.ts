import { Request, Response } from "express";
import { inventoryService } from "../services/inventory.service";

type InventoryParams = {
  sku: string;
};

export const getAllInventory = async (
  _req: Request,
  res: Response
) => {
  const items = await inventoryService.getAllInventory();

  res.status(200).json(items);
};

export const getInventoryBySku = async (
  req: Request<InventoryParams>,
  res: Response
) => {
  const item = await inventoryService.getInventoryBySku(
    req.params.sku
  );

  if (!item) {
    return res.status(404).json({
      message: "Inventory item not found",
    });
  }

  return res.status(200).json(item);
};