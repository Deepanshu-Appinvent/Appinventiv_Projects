"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signupRoute_1 = __importDefault(require("./signupRoute"));
const loginRoute_1 = __importDefault(require("./loginRoute"));
const router = express_1.default.Router();
router.use("/ig", signupRoute_1.default, loginRoute_1.default);
exports.default = router;
