import React, { useEffect, useRef, useState } from 'react';

function QrReader() {
  const canvasRef = useRef();
  const isScanning = useRef(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const videoRef = useRef();

  const constraints = {
    video: {
      facingMode: 'environment',
    },
    audio: false,
  };


  const handleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      setHasPermission(true);
      const video = videoRef.current;
      video.srcObject = stream;
      video.play();
    } catch (error) {
      setVideoError(error);
    }
  };


  useEffect(() => {
    async function scan() {
      if (isScanning.current ) {
        console.log(isScanning.current)
        const video = videoRef.current;
        if (video !== null) {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas
            .getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = canvas
            .getContext('2d')
            .getImageData(0, 0, canvas.width, canvas.height);

        }
      }
    }

  });


  const handleVideoError = (event) => {
    alert(event.target.error);
  };

  return (
        <>
            <button onClick={handleCamera}>
              Acceder a la cámara
            </button>

          {hasPermission && (
            <div
              style={{
                position: 'relative',
                width: '75%',
                height: '100%',
                margin: '0 auto',
                top: '5vh',
              }}
            >
              <video
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                ref={videoRef}
                autoPlay
                muted
                playsInline
                onLoadedData={() => {
                  videoRef.current.play();
                }}
                onError={handleVideoError}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: '2px solid green',
                  width: '55%',
                  height: '50%',
                }}
              ></div>
            </div>
          )}

          <canvas
            ref={canvasRef}
            width="320"
            height="240"
            style={{ display: 'none' }}
          ></canvas>
        </>
  );
}

export default QrReader;
