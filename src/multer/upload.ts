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
  
export const upload = multer({ 
  storage: storage , 
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
    }
  },
});