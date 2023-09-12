import Router from "koa-router";
import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();
import { errorHandler } from "../middleware/errorHandler";
import { journeyController } from "../controllers/journeyController";
router.use(errorHandler);

router.post("/driver/startJourney", journeyController.startJourney);
router.post("/driver/endJourney", journeyController.endJourney);
router.post("/driver/markStoppage", journeyController.markStoppage);
router.delete("/journey/delete/:journeyID", journeyController.delJourneyController);
router.post("/driver/journey", journeyController.getJourneyDetails);

export default router;
