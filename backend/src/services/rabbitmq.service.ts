import amqp from "amqplib";

class RabbitMQService {
  private connection: any = null;
  private channel: any = null;

  private readonly queue = "badge-print-requests";

  async connect() {
    if (this.channel) return;

    this.connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost"
    );

    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue(this.queue, {
      durable: true,
    });

    console.log("🐇 RabbitMQ connected");
  }

  async publish(message: unknown) {
    await this.connect();

    this.channel.sendToQueue(
      this.queue,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
      }
    );
  }
}

export const rabbitMQService = new RabbitMQService();