import Router from "koa-router";
import { validateAddBus } from "../middleware/joi_validation";
import { busController } from "../controllers/busController";
import { errorHandler } from "../middleware/errorHandler";
import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();
router.use(errorHandler);

router.post(
  "/admin/addbus",
  authenticateAdmin,
  validateAddBus,
  busController.addBus
);
router.post("/admin/assignbus", busController.assignBus);
router.post("/admin/assignroute", busController.assignRoute);
router.get("/admin/buslist", authenticateAdmin, busController.busList);
router.get("/admin/buses/:busId", authenticateAdmin, busController.busDetails);
router.get("/driver/driverbus/:driverId", busController.assignedBusDetails);

export default router;
