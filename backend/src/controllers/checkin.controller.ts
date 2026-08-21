import { Request, Response } from "express";

import { checkInService } from "../services/checkin.service";

export const checkIn = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await checkInService.checkIn(
      req.body.qrCode
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Check-in failed",
    });
  }
};