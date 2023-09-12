import amqp from "amqplib";
import { generateRecipientPDF } from "./PDFGenerator";
import { EmailSender } from "../utils/emailSender";
import * as dotenv from "dotenv";
dotenv.config();
export class MessageQueue {
  static async sendToQueue(queue: string, data: any) {
    const connection = await amqp.connect(process.env.AMQP_HOST as string);
    const channel = await connection.createChannel();
    const queueName = queue;
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
    await channel.close();
    await connection.close();
  }

  static async startWorker() {
    const connection = await amqp.connect(process.env.AMQP_HOST as string);
    const channel = await connection.createChannel();
    const queueName = process.env.QUEUE as string;
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, async (message: any) => {
      const bookingData = JSON.parse(message.content.toString());
      const pdfBuffer = await generateRecipientPDF(bookingData);
      await EmailSender.sendRecipient(bookingData.email, pdfBuffer);
      channel.ack(message);
    });
  }
}