import { Context } from "koa";
import { AddDriver, LoginDriver, DelDriver } from "../utils/interface/Interface";
import { driverService } from "../services/driverService";

export class driverController {
  static async addDriver(ctx: Context): Promise<any> {
    const { adminID, driverName, password,email, DL, salary } = ctx.request.body as AddDriver
    const driver = await driverService.add_driver(adminID,driverName,password,email,DL,salary);
    ctx.status = driver.status;
    ctx.body = driver.body;
  }

  static async login(ctx: Context): Promise<any> {
    const { driverName, password } = ctx.request.body as LoginDriver
    const driver = await driverService.driverLogin(driverName, password);
    ctx.status = driver.status;
    ctx.body = driver.body;
  }

  static async delDriverController(ctx: Context): Promise<any> {
    const { driverName } = ctx.request.body as DelDriver
    const driver = await driverService.delDriver(driverName);
    ctx.status = driver.status;
    ctx.body = driver.body;
  }
  
  static async logOut(ctx: Context) {
    const driverID = ctx.params;
    const logOut = await driverService.logoutService(driverID.driverId);
    ctx.status = logOut.status;
    ctx.body = logOut.body;
  }
}
