import nodemailer from "nodemailer";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

export class EmailSender {

static transporter = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
    host: process.env.MAILER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
static async sendOTPByEmail(email: string, otp: string,subject:string,templatePath:string) {
  try {
    const htmlTemplate: any = await fs.readFileSync(templatePath, "utf-8");

    const updatedHtmlTemplate = htmlTemplate.replace(
      "{{OTP_PLACEHOLDER}}",
      otp
    );
    const info = await EmailSender.transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject:subject,
      html: updatedHtmlTemplate,
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
static async sendRecipient(email: string, pdfBuffer:any) {
  try {
    const templatePath = "templates/assignDetails.html";
    const htmlTemplate: any = await fs.readFileSync(templatePath, "utf-8");

 
    const info = await EmailSender.transporter.sendMail({
      to: email,
      subject: "Bus alloted to you",
      from: process.env.EMAIL,
      html: htmlTemplate,
      attachments: [{ filename: "Assigning_details.pdf", content: pdfBuffer }],
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
}