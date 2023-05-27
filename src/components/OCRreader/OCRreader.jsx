import React from 'react';
import ReactDOM from 'react-dom';
import { 
  ContainerVideo, 
  Canvas} from './OCRreader.styles';
import { useEffect, useRef, useState } from 'react';

import { getRecognition } from '../../api/fetchs';

export default function OCRreader({permissionCamera,permissionRecognition}) {
  const [hasPermission, setHasPermission] = useState(false);
  const canvasRef = useRef(null); 
  const videoRef = useRef(null);
  let globalStream = useRef(null);
  const [videoError, setVideoError] = useState(null);

  const constraints = {
    video: {
      facingMode: 'environment',
    },
    audio: false,
  };

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

  useEffect(() => {
    setHasPermission(permissionCamera);
    if (permissionCamera) {
      setTimeout(() => {
        handleCamera();
      }, 100);
    }
  }, [permissionCamera]);

  useEffect(() => {
    const video = globalStream.current;
    if (video) {
      const tracks = video.getTracks();
      tracks.forEach((track) => track.stop());
    } 
  }, [hasPermission]);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 80;
    const dwidth = 320;
    const dheight = 80;
    const dx = 640/2 - dwidth/2;
    const dy = 480/2 - dheight/2;
    
    const drawFrame = () => {
      context?.drawImage(video, dx, dy, dwidth, dheight, 0, 0, dwidth, dheight);
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
  }, [hasPermission]);

  useEffect(() => {
    if (permissionRecognition) { // Verificar si canvas está definido
      const dataURL = canvasRef.current.toDataURL('image/jpeg'); // Generar base64
      getRecognition(dataURL)
      .then( response => {
        ReactDOM.render(response, document.getElementById('insertText'))
      }
      )
    }
  }, [permissionRecognition]);


  return (
  <ContainerVideo>
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
    <Canvas id="canvas" ref={canvasRef} ></Canvas>
  </ContainerVideo>
  )
}
