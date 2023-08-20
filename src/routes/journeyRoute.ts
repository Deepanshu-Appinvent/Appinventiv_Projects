import Router from "koa-router";
import { authenticateAdmin } from "../middleware/jwtAdmin";
const router = new Router();
import {
  startJourney,
  endJourney,
  markStoppage,getJourneyDetails
} from "../controllers/journeyController";

router.post("/driver/startJourney", startJourney);
router.post("/driver/endJourney", endJourney);
router.post("/driver/markStoppage", markStoppage);
router.post("/driver/journey", getJourneyDetails);


export default router;
