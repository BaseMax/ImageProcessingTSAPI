import { Router } from "express";
import { profile } from "../controller/user.controller";
import { auth } from "../middlewares/auth";

const router = Router()


router.use(auth);
router.get('/me' , profile);


export default router ; 