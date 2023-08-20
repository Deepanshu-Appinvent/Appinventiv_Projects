import { Context, Next } from "koa";
import jwt from "jsonwebtoken";
import { createClient } from "redis";
import * as dotenv from "dotenv";
dotenv.config();

export async function authenticateAdmin(ctx: Context, next: Next) {
  const token = ctx.header.authorization?.split(" ")[1];
  const secreKey = process.env.SECRETKEY as string;
  if (!token) {
    ctx.status = 401;
    ctx.body = { message: "Authentication required" };
    return;
  }
  const client = createClient();
  client.on("err", (err) => console.log("redis err", err));
  await client.connect();

  try {
    const decodedToken: any = jwt.verify(token, secreKey);
    if (decodedToken.role === "admin") {
      ctx.state.adminId = decodedToken.userId;
      const adminId = decodedToken.userId;
      const redisKey: string = `admin:${adminId}`;
      const cachedData = await client.get(`${redisKey}`);
      if (cachedData) {
        const adminData = JSON.parse(cachedData);
        if (adminData.isActive == true) {
          await next();
        } else {
          ctx.body = { message: "Session expired / Admin logged out" };
        }
      } else console.log("error");
    } else {
      ctx.status = 403;
      ctx.body = { message: "Unauthorized" };
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = { message: "Invalid token" };
  }
}
