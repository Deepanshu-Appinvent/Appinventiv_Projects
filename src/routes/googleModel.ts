import Router from 'koa-router';
import { getDistance,getWeather } from '../controllers/googleController';

const router = new Router();

router.post('/distance', getDistance);
router.post('/get-weather', getWeather);


export default router;
