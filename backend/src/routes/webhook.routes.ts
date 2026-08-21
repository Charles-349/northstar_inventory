import { Router } from "express";
import { printCompleted } from "../controllers/webhook.controller";

const router = Router();

router.post("/print-complete", printCompleted);

export default router;