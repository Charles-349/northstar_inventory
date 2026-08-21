import { Router } from "express";

import { syncInventory } from "../controllers/warehouse-sync.controller";

const router = Router();

router.post("/", syncInventory);

export default router;