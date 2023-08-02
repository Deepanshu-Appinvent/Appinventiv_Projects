import express, { Router } from "express";
import signup from "./signupRoute";
import login from "./loginRoute";
const router: Router = express.Router();
router.use("/ig",signup,login);



export default router;
