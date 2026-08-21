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
    try {
      await this.connect();

      this.channel.sendToQueue(
        this.queue,
        Buffer.from(JSON.stringify(message)),
        {
          persistent: true,
        }
      );

      console.log("📨 Message published");
    } catch (error) {
      console.error(
        "❌ RabbitMQ publish failed:",
        error
      );

      
      return;
    }
  }
}

export const rabbitMQService = new RabbitMQService();