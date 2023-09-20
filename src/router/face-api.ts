import { Router } from "express";
import { detect } from "../controller/face-api.controller";
import { upload } from "../multer/upload";
import passport from "passport";
import { auth } from "../middlewares/auth";

const router = Router();

router.use(auth);
router.post('/detect', upload.single('image') , detect);


export default router ; 

