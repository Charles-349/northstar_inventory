import { Router } from "express";

import { checkIn } from "../controllers/checkin.controller";

const router = Router();

router.post("/", checkIn);

export default router;