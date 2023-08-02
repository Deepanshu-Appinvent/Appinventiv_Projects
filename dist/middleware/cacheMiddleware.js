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
const user_1 = __importDefault(require("../database/models/user"));
const index_1 = __importDefault(require("../index"));
const cacheMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const cachedData = yield index_1.default.get(`user:${user_id}`);
        if (cachedData) {
            console.log(cachedData);
            console.log('Cache hit');
            const user = JSON.parse(cachedData);
            req.body.user = user;
        }
        else {
            console.log('Cache miss');
            const user = yield user_1.default.findOne({ user_id });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            yield index_1.default.set(`user:${user_id}`, JSON.stringify(user), 'EX', 60);
            req.body.user = user;
        }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = cacheMiddleware;
