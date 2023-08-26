import { Admin } from "../database/models/admin.model";
import { Driver } from "../database/models/driver.Model";
import { Session } from "../database/models/sessionModel";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import fs from "fs";
import AppError from "../middleware/AppError";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { createClient, SetOptions } from "redis";

export class adminService {
  static async signUpService(
    username: string,
    password: string,
    email: string,
    phoneNumber: string
  ): Promise<any> {
    const existingAdmin = await Admin.findOne({ where: { email: email } });
    if (existingAdmin) {
      throw new AppError("Already Signed up", 400);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    var secret = speakeasy.generateSecret({
      name: username
    });
    console.log(secret);
    const qrCodeDataURL = await new Promise<any>((resolve, reject) => {
      qrcode.toDataURL(secret.otpauth_url as any, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    console.log(qrCodeDataURL);
    const base64Data = qrCodeDataURL.split(";base64,").pop();

    const filePath = `googleQRCode/qrcode-${username}.png`;

    fs.writeFileSync(filePath, base64Data, { encoding: "base64" });

    console.log("PNG file generated:", filePath);

    const newAdmin = await Admin.create({
      username: username,
      password: hashedPassword,
      email: email,
      phoneNumber,
      secret:secret.ascii
    });

    const link = `postman:/admin/login`;
    return {
      status: 200,
      body: { message: "Admin signed up successfully", newAdmin, link },
    };
  }

  static async genloginservice(email: string, choice: string): Promise<any> {
    console.log(choice);

    const user = await Admin.findOne({ where: { email } });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (choice === "mail") {
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log(otp);

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
      const htmlTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #3498db;
            color: white;
            padding: 10px;
            text-align: center;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .otp-box {
            background-color: #f2f2f2;
            padding: 10px;
            border-radius: 5px;
            font-size: 18px;
            text-align: center;
            margin-bottom: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sign-In Verification</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You are receiving this email because you are attempting to sign in to your account.</p>
            <div class="otp-box">
              Your Sign-In OTP: <strong>${otp}</strong>
            </div>
            <p>If you did not initiate this sign-in attempt, please ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "SignIn Request",
        html: htmlTemplate,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      const client = createClient();
      client.on("error", (err) => console.log("redis Client Error", err));
      await client.connect();

      const options: SetOptions = { EX: 80 };
      client.set(`AdminLogin:${user.id}`, otp.toString(), options);
      return { status: 200, body: { message: "OTP sent on your mail" } };
    }
    if (choice === "authenticator") {
      return {
        status: 200,
        body: { message: "Enter the code on your Authenticator app" },
      };
    } else throw new AppError("Please make a choice", 401);
  }

  static async loginService(
    username: string,
    password: string,
    clientIP: string,
    otp: string
  ): Promise<any> {
    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();

    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      throw new AppError("Admin not found", 400);
    }
    var verified = await speakeasy.totp.verify({
      //secret: "v,(VpHo0FmOf7.$o07ps4OCg*pVg$f:B",
      secret:admin.secret,
      encoding: "ascii",
      token: otp,
    });
    console.log(verified);

    const redisKey: string = `AdminLogin:${admin.id}`;
    const cachedData = await client.get(`${redisKey}`);
    console.log(cachedData);
    if (verified || cachedData) {
      const passMatch = await bcrypt.compare(password, admin.password);
      if (!passMatch) {
        throw new AppError("Invalid credentials", 400);
      }
      const existingSession = await Session.findOne({
        where: { adminId: admin.id, isActive: true },
      });
      if (existingSession) {
        throw new AppError("Already logged in", 401);
      }
      const token = jwt.sign(
        { userId: admin.id, role: "admin" },
        process.env.SECRETKEY as string,
        {
          expiresIn: "1h",
        }
      );
      const deviceID = uuidv4();

      let payload: any = {
        adminId: admin.id,
        deviceID: deviceID,
        IP_Address: clientIP,
        isActive: true,
      };
      const redisKey = `admin:${payload.adminId}`;
      client.set(redisKey, JSON.stringify(payload));

      const session = await Session.create({
        adminId: admin.id,
        deviceID: deviceID,
        IP_Address: clientIP,
        isActive: true,
      });

      return { status: 200, body: { message: "Login successful", token } };
    } else throw new AppError("Authenication failed", 400);
  }

  static async generate_otp(email: string): Promise<any> {
    const user = await Admin.findOne({ where: { email } });
    if (!user) {
      throw new AppError("Admin not found", 404);
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);

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

    const htmlTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #3498db;
            color: white;
            padding: 10px;
            text-align: center;
          }
          .content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .otp-box {
            background-color: #f2f2f2;
            padding: 10px;
            border-radius: 5px;
            font-size: 18px;
            text-align: center;
            margin-bottom: 15px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You are receiving this email because a request to reset your password has been initiated.</p>
            <div class="otp-box">
              Your Password Reset OTP: <strong>${otp}</strong>
            </div>
            <p>If you did not request a password reset, please ignore this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();

    const options: SetOptions = { EX: 30 };
    client.set(user.email, otp.toString(), options);
    return user;
  }

  static async check_otp(
    email: string,
    otp: string,
    newpassword: string
  ): Promise<any> {
    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();
    if (otp === (await client.get(email))) {
      console.log("OTP verified");
      const user = await Admin.findOne({ where: { email } });
      if (user) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newpassword, saltRounds);
        user.password = hashedPassword;
        await user.save();
      } else {
        throw new AppError("Error updating Password", 402);
      }
      return user;
    } else {
      throw new AppError("Invalid OTP", 401);
    }
  }

  static async getDriverList(adminID: string): Promise<any[]> {
    try {
      // const client= createClient()
      //   client.on("err", (error)=> console.log("rdis error"));
      //   await client.connect()
      const driverList = await Driver.findAll({
        where: { adminID },
        attributes: { exclude: ["password"] },
      });
      return driverList;
    } catch (error) {
      console.log(error);
      throw new AppError("An error occurred while fetching routes list", 400);
    }
  }

  static async logoutService(adminId: string): Promise<any> {
    const redisKey: string = `admin:${adminId}`;
    const client = createClient();
    client.on("err", (err) => console.log("redis err", err));
    await client.connect();
    const cachedData = await client.get(`${redisKey}`);
    if (cachedData) {
      const adminData = JSON.parse(cachedData);
      if (adminData.isActive == false) {
        throw new AppError("Either Not signed in or Already logged out", 401);
      } else {
        adminData.isActive = false;
        await client.set(redisKey, JSON.stringify(adminData));
        await Session.update({ isActive: false }, { where: { adminId } });
        return {
          status: 200,
          body: { message: "Admin logout successfully" },
        };
      }
    }
  }
}
