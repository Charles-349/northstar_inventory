import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { attendees, printJobs } from "../db/schema";

export const printCompleted = async (
  req: Request,
  res: Response
) => {
  const { jobId, attendeeId } = req.body;

  await db
    .update(printJobs)
    .set({
      status: "COMPLETED",
    })
    .where(eq(printJobs.jobId, jobId));

  await db
    .update(attendees)
    .set({
      status: "CHECKED_IN",
      checkedInAt: new Date(),
    })
    .where(eq(attendees.id, attendeeId));

  return res.status(200).json({
    success: true,
  });
};