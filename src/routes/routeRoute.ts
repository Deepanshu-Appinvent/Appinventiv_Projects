import Router from "koa-router";
import { validateAddRoute } from "../middleware/joi_validation";
import { routeController } from "../controllers/routeController";
import { errorHandler } from "../middleware/errorHandler";

import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();
router.use(errorHandler);

router.post(
  "/admin/addroute",
  authenticateAdmin,
  validateAddRoute,
  routeController.addRoute
);
router.get("/admin/routelist", authenticateAdmin, routeController.routeList);
router.get(
  "/admin/routes/:routeId",
  authenticateAdmin,
  routeController.routeDetails
);

export default router;
