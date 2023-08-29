import { Context } from "koa";
import { driverService } from "../services/driverService";

export class driverController {
  static async addDriver(ctx: Context): Promise<any> {
    const { adminID, driverName, password,email, DL, salary } = ctx.request.body as {
      adminID: number;
      driverName: string;
      password: string;
      email:string
      DL: string;
      salary: string;
    };
    const driver = await driverService.add_driver(
      adminID,
      driverName,
      password,
      email,
      DL,
      salary
    );
    ctx.status = driver.status;
    ctx.body = driver.body;
  }

  static async login(ctx: Context): Promise<any> {
    const { driverName, password } = ctx.request.body as {
      driverName: string;
      password: string;
    };
    const driver = await driverService.driverLogin(driverName, password);
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
