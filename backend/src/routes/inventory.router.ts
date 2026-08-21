import { Router } from "express";

import {
  getAllInventory,
  getInventoryBySku,
} from "../controllers/inventory.controller";

const router = Router();

router.get("/", getAllInventory);

router.get("/:sku", getInventoryBySku);

export default router;