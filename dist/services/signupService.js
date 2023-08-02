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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup_service = void 0;
const user_1 = __importDefault(require("../database/models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function signup_service(name, username, email, password, bio, profilePicture) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            yield user_1.default.create({
                email: email,
                password: hashedPassword,
                name: name,
                username: username,
                bio: bio,
                profilePicture: profilePicture,
            });
        }
        catch (error) {
            console.log(error);
            throw new Error("An error occurred during signup");
        }
    });
}
exports.signup_service = signup_service;
module.exports = {
    signup_service,
};
// import bcrypt from 'bcrypt';
// import  User from '../database/models/user';
// export class SignupService {
//   async createUser(username: string, password: string) {
//     try {
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         throw new Error('Username already exists');
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({
//         name: {
//           username,
//           firstName: '',
//           lastName: '',
//         },
//         email: '', // You may add email field if it's included in the signup request
//         password: hashedPassword,
//       });
//       const savedUser = await newUser.save();
//       return savedUser;
//     } catch (error) {
//       throw new Error();
//     }
//   }
// }
