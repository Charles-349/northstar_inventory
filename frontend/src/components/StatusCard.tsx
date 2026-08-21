interface Props {
  status: string;
}

export default function StatusCard({
  status,
}: Props) {
  let bgColor =
    "bg-slate-100 border-slate-300";

  let icon = "📷";

  let title = "Waiting For Scan";

  if (status === "PRINT_PENDING") {
    bgColor =
      "bg-yellow-100 border-yellow-300";

    icon = "🖨️";

    title = "Printing Badge...";
  }

  if (status === "CHECKED_IN") {
    bgColor =
      "bg-green-100 border-green-300";

    icon = "✅";

    title =
      "Checked In Successfully";
  }

  return (
    <div
      className={`mt-8 border rounded-xl p-8 text-center ${bgColor}`}
    >
      <div className="text-6xl mb-4">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3">
        Current Status: {status}
      </p>
    </div>
  );
}