import React, { useRef, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import ReactWebcam from 'react-webcam';

const socket = io('http://localhost:3001');

const App: React.FC = () => {
  const webcamRef = useRef<ReactWebcam | null>(null);
  
  useEffect(() => {
    const captureAndSend = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        socket.emit('data', imageSrc);
      }
    };

    const interval = setInterval(captureAndSend, 1000); // Adjust the interval as needed

    return () => {
      clearInterval(interval);
    };
  }, [socket]);

  return (
    <div>
      <ReactWebcam ref={webcamRef} />
    </div>
  );
};
export default App ;