import { Router } from "express";
import faceApiRouter from './face-api';
import authRouter from './auth';
import userRouter from './user';

const router = Router();

router.use('/face' , faceApiRouter);
router.use('/auth' , authRouter);
router.use('/user' , userRouter);

export default router ;