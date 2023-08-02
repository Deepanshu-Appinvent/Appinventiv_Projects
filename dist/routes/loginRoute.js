"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controllers/loginController");
const cacheMiddleware_1 = __importDefault(require("../middleware/cacheMiddleware"));
const joi_validation_1 = require("../middleware/joi_validation");
const router = express_1.default.Router();
router.post('/login', joi_validation_1.joi_login, cacheMiddleware_1.default, loginController_1.login);
exports.default = router;
