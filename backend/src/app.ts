import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-node-gpu";
const canvas = require('canvas');
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import multer from 'multer';
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
  await faceapi.nets.tinyFaceDetector.loadFromDisk(path.join(__dirname , '../models'));
  await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(path.join(__dirname , '../models'));
  await faceapi.nets.faceRecognitionNet.loadFromDisk(path.join(__dirname , '../models'));
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname , '../models'));
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

const upload = multer({ storage: storage});

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(morgan('tiny'))
app.use(helmet())


app.post('/detect', upload.single('image'), async (req, res) => {
  const file = req.file.path

  const image = await canvas.loadImage(file)
  
  try {
    const detections = await faceapi.detectAllFaces(image, faceDetectionOptions)

  

    res.send(detections)
  } catch (error) {
    res.send(error)
  }
});
  

app.listen(port , ()=>{
    console.log(process.version);
    console.log(`App runing on port ${port}`)
})


export {app}