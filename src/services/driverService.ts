import { Driver } from "../database/models/driver.Model";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "redis";
import bcrypt from "bcrypt";

export async function add_driver(
  adminID: number,
  driverName: string,
  password: string,
  DL: string,
  salary: string
): Promise<any> {
  try {
    const existingDriver = await Driver.findOne({
      where: { driverName: driverName },
    });
    if (existingDriver) {
      return { status: 400, body: { message: "Driver already Signed up" } };
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
  } catch (error) {
    console.log("err", error);
    throw new Error("Error while creating a new Driver");
  }
}

export async function driverLogin(
  driverName: string,
  password: string
): Promise<any> {
  try {
    const client = createClient();
    client.on("error", (err) => console.log("redis Client Error", err));
    await client.connect();

    const driver = await Driver.findOne({ where: { driverName } });
    if (!driver) {
      return { status: 404, body: { message: "driver not found" } };
    }
    if (await client.exists(`driver:${driver.id}`)) {
      return { status: 400, body: { message: "Driver already logged in" } };
    }

    const passwordMatch = await bcrypt.compare(password, driver.password);
    if (!passwordMatch) {
      return { status: 401, body: { message: "Invalid credentials" } };
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
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: "Error during Driver login" } };
  }
}

export async function logoutService(driverId: string): Promise<any> {
  const redisKey: string = `driver:${driverId}`;
  const client = createClient();
  client.on("err", (err) => console.log("redis err", err));
  await client.connect();
  try {
    if (await client.exists(redisKey)) {
      await client.del(redisKey);
      return {
        status: 200,
        body: { message: "Driver logout successfully" },
      };
    } else
      return {
        status: 401,
        body: { message: "Either Not signed in or Driver already logged out" },
      };
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while driver logging out");
  }
}
