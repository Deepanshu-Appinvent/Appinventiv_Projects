import { google } from "googleapis";
import Koa from "koa";
import { Context } from "koa";
import dotenv from "dotenv";
import AppError from "../middleware/AppError";
import fs from "fs";

import Router from "koa-router";
const router = new Router();

dotenv.config();
const app = new Koa();

export class GoogleController {
  private static oauth2Client: any;

  static initialize() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    try {
      const credsBuffer = fs.readFileSync("creds.json");
      const credsString = credsBuffer.toString();
      this.oauth2Client.setCredentials(JSON.parse(credsString));
    } catch (err) {
      console.log("No creds found");
    }
  }

  static async authGoogle() {
    const url = this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/drive",
      ],
    });
    return url;
  }
  static async redirect(ctx: Context) {
    const { code } = ctx.request.query;
    try {
      await GoogleController.initialize();
      const response = await GoogleController.oauth2Client.getToken(
        code as string
      );
      const tokens = response.tokens;
      console.log("running");

      if (tokens && typeof tokens === "object") {
        fs.writeFileSync("creds.json", JSON.stringify(tokens));
        GoogleController.saveImage();

        ctx.body = "success";
      } else {
        ctx.status = 500;
        ctx.body = "Tokens not received or invalid format";
      }
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = "Real error occurred";
    }
  }

  static async saveImage() {
    if (GoogleController.oauth2Client.isTokenExpiring()) {
      const tokenResponse =
        await GoogleController.oauth2Client.refreshAccessToken();
      const newAccessToken = tokenResponse.tokens.access_token;
      GoogleController.oauth2Client.setCredentials({
        access_token: newAccessToken,
      });
    }
    const drive = google.drive({
      version: "v3",
      auth: GoogleController.oauth2Client,
    });

    try {
      await drive.files.create({
        requestBody: {
          name: "qrCode_Dishu.jpeg",
          mimeType: "image/jpeg",
        },
        media: {
          mimeType: "image/jpeg",
          body: fs.createReadStream("qrcode-Dishu.jpeg"),
        },
      });
      console.log("Image uploaded Successfully");
      return { status: 200, body: { message: "Success" } };
    } catch (error) {
      throw new AppError("error");
    }
  }
  
  static async text(ctx:Context){
    try{
      if (GoogleController.oauth2Client.isTokenExpiring()) {
        const tokenResponse =
          await GoogleController.oauth2Client.refreshAccessToken();
        const newAccessToken = tokenResponse.tokens.access_token;
        GoogleController.oauth2Client.setCredentials({
          access_token: newAccessToken,
        });}
        const sheets=google.sheets({version:'v4',auth:GoogleController.oauth2Client});
        const res=await GoogleController.initialize();

    }catch{
      console.log("Error");
      throw new AppError("error");
    }
  }
}
router.get("/redirect", GoogleController.redirect);

export default router;
