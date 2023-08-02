import express, { Router } from "express";
import { createPostController } from "../controllers/postController";
import { verifyToken } from "../middleware/authMiddleware";
import cacheMiddleware from "../middleware/cacheMiddleware";

const router: Router = express.Router();

router.use(verifyToken)

router.post("/posts", cacheMiddleware, createPostController);

export default router;
