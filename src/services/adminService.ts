import { Admin } from "../database/models/admin.model";
import { Driver } from "../database/models/driver.Model";
import { Session } from "../database/models/sessionModel";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { createClient, SetOptions } from "redis";

export async function signUpService(
  username: string,
  password: string,
  email: string,
  phoneNumber: string
): Promise<any> {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await Admin.create({
      username: username,
      password: hashedPassword,
      email: email,
      phoneNumber,
    });
    return newAdmin;
  } catch (error) {
    throw new Error("Error while creating a new user");
  }
}

export async function loginService(
  username: string,
  password: string,
  clientIP: string
): Promise<any> {
  try {
    console.log(clientIP);
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return { status: 404, body: { message: "Admin not found" } };
    }
    const passMatch = await bcrypt.compare(password, admin.password);
    if (!passMatch) {
      return { status: 401, body: { message: "Invalid credentials" } };
    }
    const token = jwt.sign(
      { userId: admin.id, role: "admin" },
      process.env.SECRETKEY as string,
      {
        expiresIn: "1h",
      }
    );
    const deviceID = uuidv4();

    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();

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
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: "Error during login" } };
  }
}

export async function generate_otp(email: string): Promise<any> {
  try {
    const user = await Admin.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
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
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      text: ` You are receiving this email because you (or someone else) has requested a password reset for your account.\n\n YOUR RESET PASSWORD OTP IS: ${otp}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
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
  } catch (error) {
    console.log(error);
    throw new Error("Generation failed");
  }
}

export async function check_otp(
  email: string,
  otp: string,
  newpassword: string
): Promise<any> {
  try {
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
        throw new Error("Error updating Password");
      }
      return user;
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getDriverList(adminID: string): Promise<any[]> {
  try {
    // const client = createClient()
    // client.on("err", (err)=> console.log("redis err", err));
    // await client.connect();
    const driverList = await Driver.findAll({
      where: { adminID },
      attributes: { exclude: ["password"] },
    });
    return driverList;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching routes list");
  }
}

export async function logoutService(adminId: string): Promise<any> {
  const redisKey: string = `admin:${adminId}`;
  const client = createClient();
  client.on("err", (err) => console.log("redis err", err));
  await client.connect();
  try {
    const cachedData = await client.get(`${redisKey}`);
    if (cachedData) {
      const adminData = JSON.parse(cachedData);
      if (adminData.isActive == false) {
        return {
          status: 401,
          body: { message: "Either Not signed in or Already logged out" },
        };
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
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while logging out");
  }
}
