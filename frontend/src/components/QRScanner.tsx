import { Scanner } from "@yudiel/react-qr-scanner";

interface Props {
  onScan: (value: string) => void;
}

export default function QRScanner({
  onScan,
}: Props) {
  return (
    <div className="rounded-lg overflow-hidden border">
      <Scanner
        onScan={(results) => {
          if (
            results &&
            results.length > 0
          ) {
            onScan(
              results[0].rawValue
            );
          }
        }}
      />
    </div>
  );
}