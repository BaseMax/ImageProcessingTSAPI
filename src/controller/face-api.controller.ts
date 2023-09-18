const canvas = require('canvas');
import fs from 'fs';
import path from 'path';
import { Request, Response, Router } from "express";
import * as faceapi from 'face-api.js';
import sizeOf, { imageSize } from 'image-size';


const minConfidence = 0.5;
const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
  minConfidence
});

const { Canvas , Image , ImageData } = canvas;
faceapi.env.monkeyPatch({Canvas , Image , ImageData});

const modelPath = path.join(__dirname , '../../models')

Promise.all([
   faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath),
   faceapi.nets.ageGenderNet.loadFromDisk(modelPath),
   faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath),
   faceapi.nets.faceLandmark68TinyNet.loadFromDisk(modelPath),
   faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath),
   faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath),
   faceapi.nets.faceExpressionNet.loadFromDisk(modelPath)
]).then()

const detect =async (req:Request , res:Response) => {
    const file = req.file.path
    const imageSize = sizeOf(file);  
    const resize =  {width : imageSize.width , height :imageSize.height};
    const image = await canvas.loadImage(file)
    try {
      const detections = await faceapi.detectAllFaces(image, faceDetectionOptions)
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        
      const resizedDetections = faceapi.resizeResults(detections ,resize)
      const output = faceapi.createCanvasFromMedia(image);
      
      faceapi.draw.drawDetections(output , detections);
      faceapi.draw.drawFaceLandmarks(output , detections);
      faceapi.draw.drawFaceExpressions(output , detections);
      resizedDetections.forEach( detection => {
        const box = detection.detection.box
        const drawBox = new faceapi.draw.DrawBox(box, { label: Math.round(detection.age) + " year old " + detection.gender })
        drawBox.draw(output)
      })
      
      const result = (output as any).toBuffer('image/jpeg')
      const directory = path.join(__dirname, '../../', `public/output/output_${Date.now()}.jpg`)
  
      fs.writeFileSync(
        directory ,
        result
      );
  
      res.status(201)
        .json({
          url : 
        })
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