const canvas = require('canvas');
import fs from 'fs';
import path from 'path';
import { Request, Response, Router } from "express";
import * as faceapi from 'face-api.js';


const minConfidence = 0.5;
const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
  minConfidence
});

const { Canvas , Image , ImageData } = canvas;
faceapi.env.monkeyPatch({Canvas , Image , ImageData});


(async()=>{
    const modelPath = path.join(__dirname , '../../models')
  
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68TinyNet.loadFromDisk(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath)
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
    await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
})()


const detect =async (req:Request , res:Response) => {
    const file = req.file.path
  
    const image = await canvas.loadImage(file)
    
    try {
      const detections = await faceapi.detectAllFaces(image, faceDetectionOptions).withFaceLandmarks().withFaceExpressions()
  
      const output = faceapi.createCanvasFromMedia(image);
      faceapi.draw.drawDetections(output , detections);
      faceapi.draw.drawFaceLandmarks(output , detections);
      faceapi.draw.drawFaceExpressions(output , detections);
  
      const result = (output as any).toBuffer('image/jpeg')
  
  
      await fs.writeFileSync(
        path.join(__dirname, '../../', `public/output/output_${Date.now()}.jpg`),
        result
      );
  
      res.send('ok')
    } catch (error) {
      res.send(error)
    }
}


const detectVideo =async (req:Request,res:Response) => {

}

export {
    detect ,
    detectVideo , 
}