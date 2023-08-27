import Router from "koa-router";
import { validateAddRoute } from "../middleware/joi_validation";
import { routeController } from "../controllers/routeController";
import { errorHandler } from "../middleware/errorHandler";

import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();

router.post("/admin/addroute",authenticateAdmin,validateAddRoute,errorHandler,routeController.addRoute);
router.get("/admin/routelist",authenticateAdmin,errorHandler,routeController.routeList);
router.get("/admin/routes/:routeId",authenticateAdmin,errorHandler,routeController.routeDetails);

export default router;
