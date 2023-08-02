import { Request, Response } from "express";
import { login_service } from "../services/loginService";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await login_service(email, password);
    if (!user) {
      res.send("Invalid Credentials");
    } else {
      res.status(201).json({
        
        message: "Login successful",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.send("Unable to login due to some error!");
  }
}

// import { Request, Response } from 'express';
// import { login_service } from '../services/loginService';
// import jwt from 'jsonwebtoken';

// export async function login(req: Request, res: Response) {
//   try {
//     const { email, password } = req.body;
//     const user = await login_service(email, password);

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Unable to login due to an error' });
//   }
// }
