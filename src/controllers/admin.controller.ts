import { Context } from "koa";
import {adminService
} from "../services/adminService";

export class adminController {
  static async signUp(ctx: Context): Promise<any> {
    const { username, password, email, phoneNumber } = ctx.request.body as {
      username: string;
      password: string;
      email: string;
      phoneNumber: string;
    };
    const admin = await adminService.signUpService(username, password, email, phoneNumber);
    ctx.status = admin.status;
    ctx.body = admin.body;
  }

  static async genLogin(ctx: Context): Promise<any> {
    const { email, choice } = ctx.request.body as {
      email: string;
      choice: string;
    };
    const gen = await adminService.genloginservice(email, choice);
    ctx.status = gen.status;
    ctx.body = gen.body;
  }
  static async login(ctx: Context): Promise<any> {
    const { username, password, otp } = ctx.request.body as {
      username: string;
      password: string;
      otp: string;
    };
    const clientIP = ctx.request.ip;
    const admin = await adminService.loginService(username, password, clientIP, otp);
    ctx.status = admin.status;
    ctx.body = admin.body;
  }

  static async generateOtp(ctx: Context) {
    const { email } = ctx.request.body as {
      email: string;
    };
    const user = await adminService.generate_otp(email);
    if (!user) {
      ctx.body = "Invalid Credentials";
    } else {
      ctx.status = 201;
      ctx.body = {
        message: "OTP Generated and send on defined Email",
        user: user.email,
      };
    }
  }

  static async checkOtp(ctx: Context) {
    const { email, otp, newpassword } = ctx.request.body as {
      email: string;
      otp: string;
      newpassword: string;
    };
    const user = await adminService.check_otp(email, otp, newpassword);

    if (!user) {
      ctx.body = "Invalid OTP or Email";
    } else {
      ctx.status = 201;
      ctx.body = {
        message: "OTP Correct",
        user: user.email,
        newpassword,
      };
    }
  }

  static async driverList(ctx: Context) {
    const adminID = ctx.state.adminId;
    const driverList = await adminService.getDriverList(adminID);
    ctx.body = { message: "Drivers list fetched successfully", driverList };
  }

  static async logOut(ctx: Context) {
    const adminID = ctx.params;
    const logOut = await adminService.logoutService(adminID.adminId);
    ctx.status = logOut.status;
    ctx.body = logOut.body;
  }
}
