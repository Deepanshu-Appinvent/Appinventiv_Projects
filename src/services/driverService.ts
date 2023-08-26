import { Driver } from "../database/models/driver.Model";
import jwt from "jsonwebtoken";
import AppError from "../middleware/AppError";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "redis";
import bcrypt from "bcrypt";

export class driverService {
  static async add_driver(
    adminID: number,
    driverName: string,
    password: string,
    DL: string,
    salary: string
  ): Promise<any> {
    const existingDriver = await Driver.findOne({
      where: { driverName: driverName },
    });
    if (existingDriver) {
      throw new AppError("driverAlreadySignedUp", 400);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newDriver = await Driver.create({
      adminID: adminID,
      driverName: driverName,
      password: hashedPassword,
      DL: DL,
      salary: salary,
    });

    const link = `postman:/driver/login`;
    return {
      status: 200,
      body: { message: "Driver signedUp successfully", newDriver, link },
    };
  }

  static async driverLogin(driverName: string, password: string): Promise<any> {
    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();

    const driver = await Driver.findOne({ where: { driverName } });
    if (!driver) {
      throw new AppError("driver not found", 404);
    }
    if (await client.exists(`driver:${driver.id}`)) {
      throw new AppError("Driver already logged in", 400);
    }
    const passwordMatch = await bcrypt.compare(password, driver.password);
    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }
    const token = jwt.sign({ userId: driver.id, role: "driver" }, "dishu", {
      expiresIn: "1h",
    });
    const deviceID = uuidv4();
    let payload: any = {
      driverId: driver.id,
      deviceID: deviceID,
      IP_Address: "127.0.0.1",
      isActive: true,
    };
    const redisKey = `driver:${payload.driverId}`;
    client.set(redisKey, JSON.stringify(payload));
    return { status: 200, body: { message: "Driver Login successful", token } };
  }

  static async logoutService(driverId: string): Promise<any> {
    const redisKey: string = `driver:${driverId}`;
    const client = createClient();
    client.on("err", (err) => console.log("redis err", err));
    await client.connect();
    if (await client.exists(redisKey)) {
      await client.del(redisKey);
      return {
        status: 200,
        body: { message: "Driver logout successfully" },
      };
    } else
      throw new AppError(
        "Either Not signed in or Driver already logged out",
        401
      );
  }
}
