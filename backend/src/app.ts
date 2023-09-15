import '@tensorflow/tfjs-node'
const canvas = require('canvas');
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import * as faceapi from 'face-api.js';


const minConfidence = 0.5;
const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
  minConfidence
});

const { Canvas , Image , ImageData } = canvas;
faceapi.env.monkeyPatch({Canvas , Image , ImageData})


const app = express();
const port = process.env.PORT || 3001;


(async()=>{
  const modelPath = path.join(__dirname , '../models')

  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
})()


const storage = multer.diskStorage({
  destination: 'public/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const newFileName = uniqueSuffix + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage});

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(morgan('tiny'))
app.use(helmet())


app.post('/detect', upload.single('image'), async (req, res) => {
  const file = req.file.path

  const image = await canvas.loadImage(file)
  
  try {
    const detections = await faceapi.detectSingleFace(image, faceDetectionOptions).withFaceLandmarks().withFaceExpressions()

    const output = faceapi.createCanvasFromMedia(image);
    faceapi.draw.drawDetections(output , detections.detection);
    faceapi.draw.drawFaceLandmarks(output , detections.landmarks);
    faceapi.draw.drawFaceExpressions(output , detections);

    console.log(output) ;
    const result = (output as any).toBuffer('image/jpeg')


    await fs.writeFileSync(
      path.join(__dirname, '../', `public/output/output_${Date.now()}.jpg`),
      result
    );

    res.send('ok')
  } catch (error) {
    res.send(error)
  }
});
  

app.listen(port , ()=>{
    console.log(process.version);
    console.log(`App runing on port ${port}`)
})


export {app}