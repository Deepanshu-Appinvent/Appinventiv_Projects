import express, { Router } from 'express';
import {login} from '../controllers/loginController';
import cacheMiddleware from "../middleware/cacheMiddleware";
import { joi_login} from "../middleware/joi_validation";

const router: Router = express.Router();
router.post('/login', joi_login,cacheMiddleware,login);
export default router;