import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { CameraWrapper, QrReaderWrapper} from './QrReader.styles';

function QrReader() {
  const { qrReaderModal } = useSelector((state) => state.app);

  /* JSQR */
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

  function revokeCameraPermissions() {
    alert(
      "Ha negado el acceso a la camara.\nPara revocar los permisos de la cámara, por favor siga estos pasos:\n\n1. Abra la página de configuración de permisos de la cámara en su navegador.\n2. Encuentre y seleccione 'tracesurfer.com' o 't-s.fyi' y revocar los permisos de la cámara.\n3. Haga clic en el botón de revocar permisos.\n4. Recargue la página."
    );
  }

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
    qrReaderModal && handleCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrReaderModal]);

  useEffect(() => {
    async function scan() {
      if (isScanning.current && hasPermission) {
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

    if (isScanning && qrReaderModal === true) {
      setTimeout(() => {
        scan();
      }, 2000);
    }

  });

  useEffect(() => {
    if (qrReaderModal === true) isScanning.current = true;
  }, [qrReaderModal]);

  const handleVideoError = (event) => {
    alert(event.target.error);
  };

  return (
    <QrReaderWrapper show={qrReaderModal}>
        <CameraWrapper>
          {!hasPermission && (
            <button onClick={revokeCameraPermissions}>
              Acceder a la cámara
            </button>
          )}
          {qrReaderModal && hasPermission && (
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
            width="640"
            height="480"
            style={{ display: 'none' }}
          ></canvas>
        </CameraWrapper>
    </QrReaderWrapper>
  );
}

export default QrReader;
