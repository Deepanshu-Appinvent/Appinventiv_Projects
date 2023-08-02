import { Request, Response } from "express";
import { signup_service } from "../services/signupService";

export async function signup(req: Request, res: Response) {
  try {
    console.log(req.body);
    const { name, username, email, password, bio, profilePicture } = req.body;

    const user = await signup_service(
      name,
      username,
      email,
      password,
      bio,
      profilePicture
    );

    res.status(201).json({
      message: "Signup successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.send("Unable to signup due to some error!");
  }
}
