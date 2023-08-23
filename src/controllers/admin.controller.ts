import { Context } from "koa";
import {
  signUpService,
  loginService,
  generate_otp,
  check_otp,
  getDriverList,
  logoutService,
} from "../services/adminService";
import { createClient } from 'redis';


export async function signUp(ctx: Context): Promise<any> {
  const { username, password, email, phoneNumber } = ctx.request.body as {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
  };
  try {
    const admin = await signUpService(username, password, email, phoneNumber);
    ctx.status = admin.status;
    ctx.body = admin.body;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while signing up" };
  }
}

export async function login(ctx: Context): Promise<any> {
  const { username, password } = ctx.request.body as {
    username: string;
    password: string;
  };
  try {
    const clientIP = ctx.request.ip;
    const admin = await loginService(username, password, clientIP);
    ctx.status = admin.status;
    ctx.body = admin.body;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error during Admin login" };
  }
}

export async function generateOtp(ctx: Context) {
  try {
    const { email } = ctx.request.body as {
      email: string;
    };
    const user = await generate_otp(email);
    if (!user) {
      ctx.body = "Invalid Credentials";
    } else {
      ctx.status = 201;
      ctx.body = {
        message: "OTP Generated and send on defined Email",
        user: user.email,
      };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Unable to Generate OTP due to an error!";
  }
}

export async function checkOtp(ctx: Context) {
  try {
    const { email, otp, newpassword } = ctx.request.body as {
      email: string;
      otp: string;
      newpassword: string;
    };
    const user = await check_otp(email, otp, newpassword);

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
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Unable to Generate OTP due to an error!";
  }
}

export async function driverList(ctx: Context) {
  try {
    const adminID = ctx.state.adminId;
    const driverList = await getDriverList(adminID);
    ctx.body = { message: "Drivers list fetched successfully", driverList };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while fetching drivers list" };
  }
}

export async function logOut(ctx: Context) {
  try {
    const adminID = ctx.params;
    const logOut = await logoutService(adminID.adminId);
    ctx.status = logOut.status;
    ctx.body = logOut.body;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "An error occurred while logging out" };
  }
}
