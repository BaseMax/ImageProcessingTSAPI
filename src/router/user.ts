import { Router } from "express";
import passport from "passport";
import { profile } from "../controller/user.controller";

const router = Router()


router.use(passport.authenticate('jwt' , {session : false}));
router.get('/me' , profile);


export default router ; 