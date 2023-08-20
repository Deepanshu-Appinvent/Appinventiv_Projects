import Router from "koa-router";
import {
  validateSignUp,
  validateLogin,
  validateGenerateOtp,
  validateCheckOtp,
} from "../middleware/joi_validation";
import {
  signUp,
  login,
  generateOtp,
  checkOtp,
  driverList,
  logOut,
} from "../controllers/admin.controller";
import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();

router.post("/admin/signup", validateSignUp, signUp);
router.post("/admin/login", validateLogin, login);
router.post("/admin/generateOtp", validateGenerateOtp, generateOtp);
router.post("/admin/checkOtp", validateCheckOtp, checkOtp);
router.get("/admin/driverlist", authenticateAdmin, driverList);
router.get("/logout/:adminId", logOut);

export default router;
