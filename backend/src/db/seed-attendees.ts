import "dotenv/config";

import { db } from "../db";
import { attendees } from "../db/schema";

async function seed() {
  await db.insert(attendees).values([
    {
      qrCode: "ATT-001",
      fullName: "John Doe",
    },
    {
      qrCode: "ATT-002",
      fullName: "Jane Smith",
    },
    {
      qrCode: "ATT-003",
      fullName: "Alex Johnson",
    },
  ]);

  console.log("Attendees seeded");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });