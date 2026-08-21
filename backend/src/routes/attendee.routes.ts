import { Router } from "express";
import { getAttendeeByQrCode } from "../controllers/attendee.controller";

const router = Router();

router.get("/:qrCode", getAttendeeByQrCode);

export default router;