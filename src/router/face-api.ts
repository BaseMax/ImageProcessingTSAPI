import { Router } from "express";
import { detect } from "../controller/face-api.controller";
import { upload } from "../multer/upload";
import passport from "passport";

const router = Router();

router.use(passport.authenticate('jwt' , {session:false}));
router.post('/detect', upload.single('image') , detect);


export default router ; 

