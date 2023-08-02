"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joi_login = exports.joi_signup = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpSchema = joi_1.default.object({
    username: joi_1.default.string().min(3).max(20).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    name: joi_1.default.string().required(),
    bio: joi_1.default.string(),
    profilePicture: joi_1.default.string(),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required()
});
// const followSchema = Joi.object({
//     senderId: Joi.string().required(),
//     receiverId: Joi.string().required(),
//     status: Joi.string().required(),
//     created_at: Joi.date().default(Date.now),
//     updated_at: Joi.date().default(Date.now),
// });
const joi_signup = (req, res, next) => {
    const { error } = signUpSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.joi_signup = joi_signup;
const joi_login = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};
exports.joi_login = joi_login;
// export const joi_follow = (req: Request, res: Response, next: NextFunction) => {
//     const { error } = followSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ error: error.details[0].message });
//     }
//     next();
// };
