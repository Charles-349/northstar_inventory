import { QRCodeCanvas } from "qrcode.react";

export default function TestQrPage() {
  const attendees = [
    "ATT-001",
    "ATT-002",
    "ATT-003",
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Solstice Events Test QR Codes
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {attendees.map((code) => (
            <div
              key={code}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
            >
              <QRCodeCanvas
                value={code}
                size={250}
              />

              <h2 className="mt-4 text-xl font-bold">
                {code}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}