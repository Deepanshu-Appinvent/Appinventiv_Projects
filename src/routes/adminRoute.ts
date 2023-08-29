import Router from "koa-router";
import {validateSignUp,validateLogin,validateGenerateOtp,validateCheckOtp,} from "../middleware/joi_validation";
import { errorHandler } from "../middleware/errorHandler";
import { adminController } from "../controllers/admin.controller";
import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();
router.use(errorHandler);

router.post("/admin/signup", validateSignUp, adminController.signUp);
router.post("/choice", adminController.genLogin);
router.post("/admin/login", adminController.login);
router.post("/admin/generateOtp",validateGenerateOtp,adminController.generateOtp);
router.post("/admin/checkOtp", validateCheckOtp, adminController.checkOtp);
router.get("/admin/driverlist", authenticateAdmin,errorHandler, adminController.driverList);
router.get("/logout/:adminId", adminController.logOut);

export default router;
