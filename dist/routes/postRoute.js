"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const cacheMiddleware_1 = __importDefault(require("../middleware/cacheMiddleware"));
const router = express_1.default.Router();
router.use(authMiddleware_1.verifyToken);
router.post("/posts", cacheMiddleware_1.default, postController_1.createPostController);
exports.default = router;
