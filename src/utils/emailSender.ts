import nodemailer from "nodemailer";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
export async function sendOTPByEmail(email: string, otp: string) {
  try {
    const info = await transporter.sendMail({
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP is: ${otp}`,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
export async function sendRecipient(email: string, pdfBuffer:any) {
  try {
    const templatePath = "templates/assignDetails.html";
    const htmlTemplate: any = await fs.readFileSync(templatePath, "utf-8");

 
    const info = await transporter.sendMail({
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
