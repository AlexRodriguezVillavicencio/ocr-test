import React from 'react';
import ReactDOM from 'react-dom';
import { ContainerVideo, Canvas} from './OCRreader.styles';
import { useEffect, useRef, useState, useContext } from 'react';

import { getRecognition } from '../../api/fetchs';
import { MyContext } from '../../App/App';

const constraints = {
  video: {
    facingMode: 'environment',
  },
  audio: false,
};

export default function OCRreader() {
  const canvasRef = useRef(null); 
  const canvasImgRef = useRef(null);
  const videoRef = useRef(null);
  const dataImageRef = useRef(null);
  let globalStream = useRef(null);
  const [videoError, setVideoError] = useState(null);
  const { setBase64Context,
          permissionCamera,
          permissionRecognition,
          setPermisionRecognition,
          setButtonDisabled} = useContext(MyContext);


  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = videoRef.current;
      globalStream.current = stream;
      video.srcObject = stream;
      // video.play();
    } catch (error) {
      setVideoError(error);
    }
  };

  // start camera
  useEffect(() => {
    if (permissionCamera) {
      setTimeout(() => {
        handleCamera();
      }, 100);
    }
  }, [permissionCamera]);

  // stop camera
  useEffect(() => {
    const video = globalStream.current;
    const canvasImg = canvasImgRef.current?.getContext('2d');
    canvasImg.clearRect(0, 0,320,80);
    if (video) {
      const tracks = video.getTracks();
      tracks.forEach((track) => track.stop());
    } 
  }, [permissionCamera]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { willReadFrequently: true });
    canvas.width = 320;
    canvas.height = 120;
    const dwidth = 320;
    const dheight = 120;
    const dx = 640/2 - dwidth/2;
    const dy = 480/2 - dheight/2;

    context.strokeStyle = 'red';
    context.lineWidth = 1;

    const drawFrame = () => {
      context?.drawImage(video, dx, dy, dwidth, dheight, 0, 0, dwidth, dheight);
      context.beginPath();
      context.moveTo(dwidth/2-130, dheight/2 -30);
      context.lineTo(dwidth/2+130, dheight/2 -30);
      context.stroke();
      context.beginPath();
      context.moveTo(dwidth/2-130, dheight/2 +30);
      context.lineTo(dwidth/2+130, dheight/2 +30);
      context.stroke();
      context.beginPath();
      context.moveTo(dwidth/2-130, dheight/2 -30);
      context.lineTo(dwidth/2-130, dheight/2 +30);
      context.stroke();
      context.beginPath();
      context.moveTo(dwidth/2+130, dheight/2 -30);
      context.lineTo(dwidth/2+130, dheight/2 +30);
      context.stroke();
      dataImageRef.current = context.getImageData(dwidth/2-130, dheight/2-30, 260, 60);
      requestAnimationFrame(drawFrame);
    };
  
    if (video) {
      video.addEventListener('play', drawFrame);
    }
  
    return () => {
      if (video) {
        video.removeEventListener('play', drawFrame);
        
      }
    };
  }, [permissionCamera]);

  useEffect(() => {
    if (permissionRecognition) {
        setButtonDisabled(true);
        const context = canvasRef.current.getContext('2d');
        const contextImg = canvasImgRef.current.getContext('2d');
        const dwidth = 320;
        const dheight = 80; 
        const imageData = context.getImageData(dwidth/2-130, dheight/2-10, 260, 60);
        contextImg.putImageData(imageData, 0, 0);
        const dataURL = canvasImgRef.current.toDataURL('image/jpeg');
        setBase64Context(dataURL);
        getRecognition(dataURL)
        .then( response => {
              ReactDOM.render(response, document.getElementById('insertText'))
              setButtonDisabled(false);
            }
            )
        setPermisionRecognition(false);
      }
  }, [permissionRecognition]);


  return (
    <>
  <ContainerVideo style={{ top: 120}}>
    <video
      style={{ width: '0px', height: '0px'}}
      ref={videoRef}
      autoPlay
      muted
      playsInline 
      onLoadedData={() => {
        videoRef.current.play();
      }}
      />
    <Canvas id="canvas" ref={canvasRef} />
  </ContainerVideo>
  <ContainerVideo style={{ top: 150}}>
    <Canvas id="canvasImg" width={260} height={60} ref={canvasImgRef} />
  </ContainerVideo>
  </>
  )
}
