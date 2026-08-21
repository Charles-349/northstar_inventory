import { useEffect, useState } from "react";

import CheckInForm from "../components/CheckInForm";
import StatusCard from "../components/StatusCard";
import QRScanner from "../components/QRScanner";

import {
  checkInAttendee,
  getAttendeeStatus,
} from "../api/attendeeApi";

export default function CheckInPage() {
  const [status, setStatus] =
    useState("NOT_CHECKED_IN");

  const [message, setMessage] =
    useState("");

  const [qrCode, setQrCode] =
    useState("");

  const [isProcessing, setIsProcessing] =
    useState(false);

  const handleCheckIn = async (
    scannedQrCode: string
  ) => {
    if (
      !scannedQrCode ||
      isProcessing ||
      scannedQrCode === qrCode
    ) {
      return;
    }

    try {
      setIsProcessing(true);

      const response =
        await checkInAttendee(
          scannedQrCode
        );

      setQrCode(scannedQrCode);
      setStatus(response.status);
      setMessage(response.message);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Check-in failed"
      );

      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (
      !qrCode ||
      status !== "PRINT_PENDING"
    ) {
      return;
    }

    const interval = setInterval(
      async () => {
        try {
          const attendee =
            await getAttendeeStatus(
              qrCode
            );

          if (
            attendee.status ===
            "CHECKED_IN"
          ) {
            setStatus(
              attendee.status
            );

            clearInterval(
              interval
            );

            setTimeout(() => {
              setStatus(
                "NOT_CHECKED_IN"
              );
              setMessage("");
              setQrCode("");
              setIsProcessing(
                false
              );
            }, 5000);
          }
        } catch (error) {
          console.error(error);
        }
      },
      2000
    );

    return () =>
      clearInterval(interval);
  }, [qrCode, status]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-slate-900">
            Solstice Events
          </h1>

          <p className="text-slate-500 mt-3">
            Conference Attendee Check-In
          </p>
        </div>

        <CheckInForm
          onSubmit={handleCheckIn}
        />

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Scan QR Code
          </h2>

          <QRScanner
            onScan={(value) => {
              handleCheckIn(value);
            }}
          />
        </div>

        {message && (
          <div className="mt-6 text-center font-medium">
            {message}
          </div>
        )}

        <StatusCard status={status} />
      </div>
    </div>
  );
}