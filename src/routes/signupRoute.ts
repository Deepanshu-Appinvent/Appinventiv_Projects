import express, { Router } from "express";
import { signup } from "../controllers/signupController";
import { joi_signup} from "../middleware/joi_validation";
const router: Router = express.Router();
router.post("/signup",joi_signup,signup);
export default router;
