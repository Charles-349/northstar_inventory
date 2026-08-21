import { Request, Response } from "express";

import { warehouseSyncService } from "../services/warehouse-sync.service";

export const syncInventory = async (
  _req: Request,
  res: Response
) => {
  const result = await warehouseSyncService.syncInventory();

  res.status(200).json(result);
};