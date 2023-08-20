import { Driver } from "../database/models/driver.Model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function add_driver(
  adminID: number,
  driverName: string,
  password: string,
  DL: string,
  salary: string
): Promise<any> {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newDriver = await Driver.create({
      adminID: adminID,
      driverName: driverName,
      password: hashedPassword,
      DL: DL,
      salary: salary,
    });
    return newDriver;
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
    const driver = await Driver.findOne({ where: { driverName } });
    if (!driver) {
      return { status: 404, body: { message: "driver not found" } };
    }
    const passwordMatch = await bcrypt.compare(password, driver.password);
    if (!passwordMatch) {
      return { status: 401, body: { message: "Invalid credentials" } };
    }
    const token = jwt.sign({ userId: driver.id, role: "driver" }, "dishu", {
      expiresIn: "1h",
    });
    return { status: 200, body: { message: "Driver Login successful", token } };
  } catch (error) {
    console.log(error);
    return { status: 500, body: { message: "Error during Driver login" } };
  }
}
