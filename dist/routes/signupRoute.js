"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signupController_1 = require("../controllers/signupController");
const joi_validation_1 = require("../middleware/joi_validation");
const router = express_1.default.Router();
router.post("/signup", joi_validation_1.joi_signup, signupController_1.signup);
exports.default = router;
