import React, { useRef,useState,useContext,useEffect } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
faPlay, 
faStop, 
faWandMagicSparkles,
faThumbsUp,
faThumbsDown,
faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import {
Button,
GroupButton,
TextGroup,
TextButton,
Text,
TextInput} from './Button.styles';

import { formDataCSV,ProcessIMG } from '../../utils/helpers';
import { addPhoto,addCSVtoS3 } from '../../utils/aws';
import { MyContext } from '../../App/App';

export default function ButtonX() {
  const [startButton, setStartButton] = useState(true);
  const [stopButton, setStopButton] = useState(false);
  const inputRef = useRef('');
  const textRef = useRef('');
  const { base64Context,
          setPermissionCamera,
          setPermisionRecognition,
          buttonDisabled, 
          setButtonDisabled } = useContext(MyContext);
  const base64ContextRef = useRef(base64Context);

  const handleStartButton = () => {
    setStartButton(false);
    setStopButton(true);
    setPermissionCamera(true);
    setButtonDisabled(false);
  };

  const handleStopButton = () => {
    setStopButton(false);
    setStartButton(true);
    setPermissionCamera(false);
    setButtonDisabled(true);
    ReactDOM.render('', document.getElementById('containtText'));
    setPermisionRecognition(false);
  };

  const handleSnapBtn = () => {
    const htmlContent = (
      <TextGroup>
        <Text>
          <div id="insertText" ref={textRef} ></div>
        </Text>
        <TextButton id="likeButton" onClick={LikePrediction} >
          {<FontAwesomeIcon icon={faThumbsUp} />}
        </TextButton>
        <TextButton id="unlikeButton" onClick={contentUnLike}>
          {<FontAwesomeIcon icon={faThumbsDown} />}
        </TextButton>
      </TextGroup>
      );
    ReactDOM.render(htmlContent, document.getElementById('containtText'));
    setPermisionRecognition(true);
  };

  const contentUnLike = () => {
    const inputValue = textRef.current.innerText
    const htmlContent = (
      <TextGroup>
        <Text>
          <TextInput id="inputText" type="text" ref={inputRef} defaultValue={inputValue}/>
        </Text>
        <TextButton id="unlikeButton" onClick={SendUnlikePrediction}>
          {<FontAwesomeIcon icon={faPaperPlane} />}
        </TextButton>
      </TextGroup>
      );
      ReactDOM.render(htmlContent, document.getElementById('containtText'));
      setButtonDisabled(true);
  };

  const LikePrediction = () => {
    setButtonDisabled(true);
    const { formData, urlDate } = formDataCSV("no", textRef.current.innerText);
    addPhoto(ProcessIMG(base64ContextRef.current),textRef.current.innerText, urlDate)
    addCSVtoS3(formData, urlDate)
    setButtonDisabled(false)
    ReactDOM.render('', document.getElementById('containtText'));
  }


  const SendUnlikePrediction = () => {
    const { formData, urlDate } = formDataCSV("no", inputRef.current.value);
    addPhoto(ProcessIMG(base64ContextRef.current),inputRef.current.value, urlDate)
    addCSVtoS3(formData, urlDate);
    setButtonDisabled(false)
    ReactDOM.render('', document.getElementById('containtText'));
  }

  useEffect(() => {
    base64ContextRef.current = base64Context;
  },[base64Context]);

  return (
    <GroupButton>
      <div style={{ display: "flex" }}>
        {startButton && (
          <Button id="initButton" onClick={handleStartButton}>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        )}
        {stopButton && (
          <Button id="stopButton" onClick={handleStopButton}>
            <FontAwesomeIcon icon={faStop} />
          </Button>
        )}
      </div>
      <Button disabled={buttonDisabled} id="snap" onClick={handleSnapBtn}>
        <FontAwesomeIcon icon={faWandMagicSparkles} />
      </Button>
    </GroupButton>
  );
}