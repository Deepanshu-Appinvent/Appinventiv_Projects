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
exports.signup = void 0;
const signupService_1 = require("../services/signupService");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { name, username, email, password, bio, profilePicture } = req.body;
            const user = yield (0, signupService_1.signup_service)(name, username, email, password, bio, profilePicture);
            res.status(201).json({
                message: "Signup successful",
                user,
            });
        }
        catch (error) {
            console.log(error);
            res.send("Unable to signup due to some error!");
        }
    });
}
exports.signup = signup;
