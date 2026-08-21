import { useState } from "react";

interface Props {
  onSubmit: (qrCode: string) => void;
}

export default function CheckInForm({
  onSubmit,
}: Props) {
  const [qrCode, setQrCode] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!qrCode.trim()) return;

    onSubmit(qrCode);

    setQrCode("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4"
    >
      <input
        type="text"
        placeholder="Scan attendee QR code"
        value={qrCode}
        onChange={(e) =>
          setQrCode(e.target.value)
        }
        className="flex-1 border border-slate-300 rounded-lg px-4 py-4 text-lg"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700"
      >
        Check In
      </button>
    </form>
  );
}