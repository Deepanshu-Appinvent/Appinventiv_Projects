import Router from "koa-router";
import { validateAddRoute } from "../middleware/joi_validation";
import {
  addRoute,
  routeList,
  routeDetails,
} from "../controllers/routeController";

import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();

router.post("/admin/addroute", authenticateAdmin, validateAddRoute, addRoute);
router.get("/admin/routelist", authenticateAdmin, routeList);
router.get("/admin/routes/:routeId", authenticateAdmin, routeDetails);

export default router;
