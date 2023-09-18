import multer from "multer";
import path from 'path';


const storage = multer.diskStorage({
    destination: 'public/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const newFileName = uniqueSuffix + path.extname(file.originalname);
      cb(null, newFileName);
    },
  });
  
export const upload = multer({ storage: storage});