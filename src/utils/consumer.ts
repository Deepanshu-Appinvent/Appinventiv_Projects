import amqp from "amqplib";
import { generateRecipientPDF } from "./PDFGenerator";
import { EmailSender } from "../utils/emailSender";
import * as dotenv from "dotenv";
dotenv.config();

const startWorker = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queueName = "busAssign_queue";
  await channel.assertQueue(queueName, { durable: true });
  channel.consume(queueName, async (message: any) => {
    const bookingData = JSON.parse(message.content.toString());
    const pdfBuffer = await generateRecipientPDF(bookingData);
    await EmailSender.sendRecipient(bookingData.email, pdfBuffer);
    channel.ack(message);
  });
};
startWorker();
