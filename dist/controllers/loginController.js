"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const loginService_1 = require("../services/loginService");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield (0, loginService_1.login_service)(email, password);
            if (!user) {
                res.send("Invalid Credentials");
            }
            else {
                res.status(201).json({
                    message: "Login successful",
                    user,
                });
            }
        }
        catch (error) {
            console.log(error);
            res.send("Unable to login due to some error!");
        }
    });
}
exports.login = login;
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
