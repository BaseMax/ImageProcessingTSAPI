import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import * as faceApi from 'face-api.js';
import multer from 'multer';

const app = express();
const port = process.env.PORT || 3001;


(async()=>{
  await faceApi.nets.tinyFaceDetector.loadFromDisk(path.join(__dirname , '../models'));
  await faceApi.nets.faceLandmark68TinyNet.loadFromDisk(path.join(__dirname , '../models'));
  await faceApi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname , '../models'));
})()


const storage = multer.diskStorage({
  destination: 'public/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Change the filename to something unique, for example, add a timestamp
    const newFileName = uniqueSuffix + path.extname(file.originalname);
    cb(null, newFileName);
  },
});
multer.memoryStorage()
const upload = multer({ storage: storage , });

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(morgan('tiny'))
app.use(helmet())



app.post('/detect-emotion', upload.single('image'), async (req, res) => {
    try {
      const filePath = req.file.filename;    
      const image = await loadImage('http://localhost:3001/'+filePath);

      // Detect faces in the image
      const detections = await faceApi.detectAllFaces(image).withFaceExpressions();
  
      const emotions = detections.map(detection => {
        const { expressions } = detection;
        const sortedEmotions = Object.keys(expressions).sort((a, b) => expressions[b] - expressions[a]);
        const dominantEmotion = sortedEmotions[0];
  
        return {
          emotion: dominantEmotion,
        };
      });
  
      // Send the emotion detection results back to the client
      res.json({ success: true, emotions });
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: 'Emotion detection failed.' });
    }
  });
  

app.listen(port , ()=>{
    console.log(process.version);
    console.log(`App runing on port ${port}`)
})


export {app}