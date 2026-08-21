import { randomUUID } from "crypto";

import { db } from "../db";
import { printJobs } from "../db/schema";

import { attendeeService } from "./attendee.service";
import { rabbitMQService } from "./rabbitmq.service";

export class CheckInService {
  async checkIn(qrCode: string) {
    const attendee =
      await attendeeService.findByQrCode(qrCode);

    if (!attendee) {
      throw new Error("Attendee not found");
    }

    if (
      attendee.status === "PRINT_PENDING" ||
      attendee.status === "CHECKED_IN"
    ) {
      throw new Error("Attendee already processed");
    }

    const jobId = randomUUID();

    await db.insert(printJobs).values({
      attendeeId: attendee.id,
      jobId,
      status: "PENDING",
    });

    await attendeeService.updateStatus(
      attendee.id,
      "PRINT_PENDING"
    );

    await rabbitMQService.publish({
      jobId,
      attendeeId: attendee.id,
      qrCode: attendee.qrCode,
      fullName: attendee.fullName,
    });

    return {
      message: "Print request submitted",
      status: "PRINT_PENDING",
      jobId,
    };
  }
}

export const checkInService =
  new CheckInService();