import Router from "koa-router";
import { addDriver, login } from "../controllers/driverController";
import { validateSignUpDriver, validateLoginDriver, } from "../middleware/joi_validation";
const router = new Router();

router.post("/driver/adddriver", validateSignUpDriver, addDriver);
router.post("/driver/driverlogin", validateLoginDriver, login);

export default router;
