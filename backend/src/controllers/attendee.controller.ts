import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { attendees } from "../db/schema";

export const getAttendeeByQrCode = async (
  req: Request,
  res: Response
) => {
  const qrCode = String(req.params.qrCode);

  const result = await db
    .select()
    .from(attendees)
    .where(eq(attendees.qrCode, qrCode));

  if (!result.length) {
    return res.status(404).json({
      message: "Attendee not found",
    });
  }

  return res.json(result[0]);
};