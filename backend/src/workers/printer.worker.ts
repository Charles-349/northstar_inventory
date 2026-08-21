import amqp from "amqplib";
import axios from "axios";

async function startPrinterWorker() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost"
  );

  const channel = await connection.createChannel();

  const queue = "badge-print-requests";

  await channel.assertQueue(queue, {
    durable: true,
  });

  console.log("🖨️ Printer worker started");

  channel.consume(queue, async (message) => {
    if (!message) return;

    const payload = JSON.parse(
      message.content.toString()
    );

    console.log(
      `Printing badge for ${payload.fullName}`
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    console.log(
      `Badge printed for ${payload.fullName}`
    );

    await axios.post(
  `${process.env.API_BASE_URL}/api/webhooks/print-complete`,
  {
    jobId: payload.jobId,
    attendeeId: payload.attendeeId,
  }
);

    console.log(
      `Webhook sent for ${payload.fullName}`
    );

    channel.ack(message);
  });
}

startPrinterWorker().catch(console.error);