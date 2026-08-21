import { eq } from "drizzle-orm";

import { db } from "../db";
import { attendees } from "../db/schema";

export class AttendeeService {
  async findByQrCode(qrCode: string) {
    const result = await db
      .select()
      .from(attendees)
      .where(eq(attendees.qrCode, qrCode));

    return result[0] ?? null;
  }

  async updateStatus(
    attendeeId: number,
    status: string
  ) {
    await db
      .update(attendees)
      .set({
        status,
      })
      .where(eq(attendees.id, attendeeId));
  }
}

export const attendeeService = new AttendeeService();