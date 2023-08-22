import Router from "koa-router";
import { validateAddBus } from "../middleware/joi_validation";
import { addBus, assignBus, assignedBusDetails, assignRoute, busList, busDetails } from "../controllers/busController";

import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();

router.post("/admin/addbus",authenticateAdmin, validateAddBus, addBus);
router.post("/admin/assignbus", assignBus);
router.post("/admin/assignroute", assignRoute);
router.get("/admin/buslist", authenticateAdmin, busList);
router.get("/admin/buses/:busId", authenticateAdmin, busDetails);
router.get("/driver/driverbus/:driverId", assignedBusDetails);

export default router;
