import { Driver } from "../database/models/driver.Model";
import jwt from "jsonwebtoken";
import AppError from "../middleware/AppError";
import DriverEntity, { driverEntity } from "../entities/driverEntity";
import { v4 as uuidv4 } from "uuid";
import client from "../redis/redis";
import { createClient } from "redis";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import logger from "../logger/logger";
dotenv.config();

export class driverService {
  static async add_driver(adminID: number,driverName: string,password: string,email: string,DL: string,salary: string): Promise<any> {
    await driverEntity.findDriverByName(driverName);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newDriver = await driverEntity.createNewDriver({adminID: adminID,driverName: driverName,password: hashedPassword,email: email,DL: DL,salary: salary});
    const link = `postman:/driver/login`;
    logger.info("Driver signedUp successfully");
    return {status: 200,body: { message: "Driver signedUp successfully", newDriver, link },
    };
  }

  static async driverLogin(driverName: string, password: string): Promise<any> {
    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();
    const driver = await driverEntity.findDriverByName2(driverName);

    if (await client.exists(`driver:${driver.id}`)) {
      logger.error("Driver already logged in");
      throw new AppError("Driver already logged in", 400);
    }
    const passwordMatch = await bcrypt.compare(password, driver.password);
    if (!passwordMatch) {
      logger.info("Invalid credentials");
      throw new AppError("Invalid credentials", 401);
    }
    const token = jwt.sign(
      { userId: driver.id, role: "driver" },
      process.env.SECRETKEY as string,
      {
        expiresIn: "1h",
      }
    );
    const deviceID = uuidv4();
    let payload: any = {
      driverId: driver.id,
      deviceID: deviceID,
      IP_Address: "127.0.0.1",
      isActive: true,
    };
    const redisKey = `driver:${payload.driverId}`;
    client.set(redisKey, JSON.stringify(payload));
    logger.info("Driver Login successful");
    return { status: 200, body: { message: "Driver Login successful", token } };
  }

  static async delDriver(driverName: string): Promise<any> {
    const driver = await driverEntity.findDriverByName2(driverName);
    await driverEntity.removeDriver(driver);
    return {status: 200,body: { message: `Driver ${driverName} removed successfully` },
    };
  }

  static async logoutService(driverId: string): Promise<any> {
    const redisKey: string = `driver:${driverId}`;
    const client = createClient();
    client.on("err", (err) => console.log("redis err", err));
    await client.connect();
    if (await client.exists(redisKey)) {
      await client.del(redisKey);
      return {status: 200,body: { message: "Driver logout successfully" },
      };
    } else
      throw new AppError("Either Not signed in or Driver already logged out",401);
  }
}
