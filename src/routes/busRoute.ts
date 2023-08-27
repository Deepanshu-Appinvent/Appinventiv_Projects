import Router from "koa-router";
import { validateAddBus } from "../middleware/joi_validation";
import { busController } from "../controllers/busController";
import { errorHandler } from "../middleware/errorHandler";
import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();

router.post("/admin/addbus",authenticateAdmin,validateAddBus,busController.addBus);
router.post("/admin/assignbus",errorHandler, busController.assignBus);
router.post("/admin/assignroute", errorHandler,busController.assignRoute);
router.get("/admin/buslist", authenticateAdmin,errorHandler, busController.busList);
router.get("/admin/buses/:busId", authenticateAdmin, errorHandler,busController.busDetails);
router.get("/driver/driverbus/:driverId", errorHandler,busController.assignedBusDetails);

export default router;
