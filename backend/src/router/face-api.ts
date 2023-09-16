import { Router } from "express";
import { detect } from "../controller/face-api.controller";
import { upload } from "../multer/upload";

const router = Router();

router.post('/detect', upload.single('image') , detect);


export default router ; 

