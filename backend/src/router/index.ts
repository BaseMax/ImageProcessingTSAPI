import { Router } from "express";
import faceApiRouter from './face-api';
const router = Router();

router.use('/' , faceApiRouter);

export default router ;