"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userInsertionController_1 = require("../controllers/userInsertionController");
const router = express_1.default.Router();
const userController = new userInsertionController_1.UserController();
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
exports.default = router;
