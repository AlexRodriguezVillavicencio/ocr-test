import React from 'react'
import { useState, Fragment } from 'react';

import { 
Nav, 
MovilWarning,
GlobalStyles} from './App.styles'

import ButtonX from '../components/Button/Button';
import OCRreader from '../components/OCRreader/OCRreader';


export default function App() {

  const [permissionCamera, setPermissionCamera] = useState(false)
  const [permissionRecognition,setPermisionRecognition] = useState(false)

  const handleCameraBool = (context) => {
    setPermissionCamera(context);
  }

  const handleSnapBtnBool = (context) => {
    setPermisionRecognition(context);
  }

  return (
    <Fragment>
      <GlobalStyles />
      <Nav>
        <h1>OCR</h1>
        <p>Prueba de códigos</p>
      </Nav>
      <OCRreader  permissionCamera={permissionCamera} permissionRecognition={permissionRecognition}/>
      <div id="containtText"></div>
      <ButtonX handleCameraBool={handleCameraBool} handleSnapBtnBool={handleSnapBtnBool} />
      <MovilWarning>
        <h2>Disponible solo para moviles</h2>
      </MovilWarning>
    </Fragment>
  )
}
