import express from 'express';
import { getAcceptedReceiversController } from '../controllers/followController';

const router = express.Router();

router.post('/accepted-receivers', getAcceptedReceiversController);

export default router;
