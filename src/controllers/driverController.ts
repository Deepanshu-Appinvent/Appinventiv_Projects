import { Context } from "koa";
import {
  add_driver,
  driverLogin,
} from "../services/driverService";

export async function addDriver(ctx: Context): Promise<any> {
  const { adminID, driverName, password, DL, salary } = ctx.request.body as {
    adminID: number;
    driverName: string;
    password: string;
    DL: string;
    salary: string;
  };  try {
    const driver = await add_driver(adminID, driverName, password, DL, salary);
    const link = `postman:/driver/login`;
    ctx.body = { message: "Driver signed up successfully", driver, link };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while adding Driver" };
  }
}

export async function login(ctx: Context): Promise<any> {
  const { driverName, password } = ctx.request.body as {
    driverName: string;
    password: string;
  };
  try {
    const driver = await driverLogin(driverName, password);
    ctx.status = driver.status;
    ctx.body = driver.body;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error during Driver login" };
  }
}


