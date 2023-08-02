"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'deep';
function generateToken(payload) {
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1000s' });
    return token;
}
exports.generateToken = generateToken;
function verifyToken(req, res, next) {
    try {
        const token = req.header('Authorization');
        if (!token) {
            throw new Error('Authorization token not found');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        console.log(decoded);
        req.body.userId = decoded === null || decoded === void 0 ? void 0 : decoded.userId;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}
exports.verifyToken = verifyToken;
