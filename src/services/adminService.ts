import { Admin } from "../database/models/admin.model";
import { Driver } from "../database/models/driver.Model";
import { Session } from "../database/models/sessionModel";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import fs from "fs";
import AppError from "../middleware/AppError";
import logger from "../logger/logger";
import { adminEntity } from "../entities/adminEntity";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { createClient, SetOptions } from "redis";
import { EmailSender } from "../utils/emailSender";

export class adminService {
  static async signUpService(username: string,password: string,email: string,phoneNumber: string): Promise<any> {
    await adminEntity.findAdminByEmail(email);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    var secret = speakeasy.generateSecret({
      name: username,
    });
    console.log(secret);
    const qrCodeDataURL = await new Promise<any>((resolve, reject) => {
      qrcode.toDataURL(secret.otpauth_url as any, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });
    console.log(qrCodeDataURL);
    const base64Data = qrCodeDataURL.split(";base64,").pop();
    const filePath = `googleQRCode/qrcode-${username}.png`;
    fs.writeFileSync(filePath, base64Data, { encoding: "base64" });
    console.log("PNG file generated:", filePath);

    const newAdmin = await adminEntity.createNewAdmin({username: username,password: hashedPassword,email: email,phoneNumber,secret: secret.ascii});
    const link = `postman:/admin/login`;
    logger.info("Admin signed up successfully");
    return {status: 200,body: { message: "Admin signed up successfully", newAdmin, link },
    };
  }

  static async genloginservice(email: string, choice: string): Promise<any> {
    console.log(choice);
    const user = await adminEntity.findAdminByEmail2(email);
    if (choice === "mail") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      logger.info("Login OTP generated")
      const templatePath = "templates/signInMail.html";
      await EmailSender.sendOTPByEmail(email,otp,"SignIn Request",templatePath);
      const client = createClient();
      client.on("error", (err) => console.log("redis Client Error", err));
      await client.connect();
      const options: SetOptions = { EX: 100 };
      client.set(`AdminLogin:${user.id}`, otp.toString(), options);
      logger.info("OTP sent on mail");
      return { status: 200, body: { message: "OTP sent on your mail" } };
    }
    if (choice === "authenticator") {
      logger.info("Enter code on you authenticator app");
      return {
        status: 200,
        body: { message: "Enter the code on your Authenticator app" },
      };
    } else logger.silly("Make a choice");
    throw new AppError("Please make a choice", 401);
  }

  static async loginService(username: string,password: string,clientIP: string,otp: string): Promise<any> {
    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();

    const admin = await adminEntity.AdminLogin(username);
    var verified = await speakeasy.totp.verify({
      secret: admin.secret,
      encoding: "ascii",
      token: otp,
    });
    logger.info(verified);

    const redisKey: string = `AdminLogin:${admin.id}`;
    const cachedData = await client.get(`${redisKey}`);
    if (verified || cachedData == otp) {
      const passMatch = await bcrypt.compare(password, admin.password);
      if (!passMatch) {
        logger.error("Invalid credentials");
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
    } else logger.error("Authentication failed");
    throw new AppError("Authentication failed", 400);
  }

  static async generate_otp(email: string): Promise<any> {
    const user = await adminEntity.findAdminByEmail2(email);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);
    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();
    const options: SetOptions = { EX: 100 };
    client.set(user.email, otp.toString(), options);

    const templatePath = "templates/passwordResetTemplate.html";
    await EmailSender.sendOTPByEmail(email,otp,"Password Reset Request",templatePath);
    return user;
  }

  static async check_otp(email: string,otp: string,newpassword: string): Promise<any> {
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
        logger.warn("Either Not signed in or Already logged out");
        throw new AppError("Either Not signed in or Already logged out", 401);
      } else {
        adminData.isActive = false;
        await client.set(redisKey, JSON.stringify(adminData));
        await Session.update({ isActive: false }, { where: { adminId } });
        logger.info("Admin logout successfully" );
        return {
          status: 200,
          body: { message: "Admin logout successfully" },
        };
      }
    }
    //else
    //   throw new AppError("Either Not signed in or Already logged out", 401);
  }
}
