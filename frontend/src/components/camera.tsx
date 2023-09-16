import React, { Component, RefObject } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001/')


interface VideoCaptureProps {}

interface VideoCaptureState {}

export class VideoCapture extends Component<VideoCaptureProps, VideoCaptureState> {
  private videoRef: RefObject<HTMLVideoElement>;

  constructor(props: VideoCaptureProps) {
    super(props);

    this.videoRef = React.createRef();
  }

  async componentDidMount() {
    await this.startCamera();
    await this.handleVideoStream();
  }

  startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if(this.videoRef.current){
        socket.emit('data', stream);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }


  handleVideoStream = () => {
    socket.on('data' , data=>{
      if (this.videoRef.current) { // Null check
        const videoBlob = new Blob([data], { type: 'video/webm' });
        const videoURL = URL.createObjectURL(videoBlob);
        console.log(videoURL)
        this.videoRef.current.src = videoURL;
      }
       else {
        console.log(data); // Handle other types of data if needed
      }
    })
  }

  render() {
    return (
      <div>
        <video className="video" ref={this.videoRef} autoPlay />
      </div>
    );
  }
}

