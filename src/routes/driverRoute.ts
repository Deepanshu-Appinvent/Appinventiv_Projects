import Router from "koa-router";
import { driverController } from "../controllers/driverController";
import {
  validateSignUpDriver,
  validateLoginDriver,
} from "../middleware/joi_validation";
import { errorHandler } from "../middleware/errorHandler";
const router = new Router();
router.use(errorHandler);

router.post(
  "/driver/adddriver",
  validateSignUpDriver,
  driverController.addDriver
);
router.post("/driver/driverlogin", validateLoginDriver, driverController.login);
router.get("/driver/logout/:driverId", driverController.logOut);

export default router;
