import React from 'react'
import { createContext, useState} from 'react';

import { 
Nav, 
MovilWarning,
GlobalStyles} from './App.styles'

import ButtonX from '../components/Button/Button';
import OCRreader from '../components/OCRreader/OCRreader';

export const MyContext = createContext(); 

export default function App() {

  const [permissionCamera, setPermissionCamera] = useState(false)
  const [permissionRecognition,setPermisionRecognition] = useState(false)
  const [base64Context, setBase64Context] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <MyContext.Provider 
        value={{ base64Context, setBase64Context,
                permissionCamera, setPermissionCamera,
                permissionRecognition,setPermisionRecognition,
                buttonDisabled, setButtonDisabled }}>
      <GlobalStyles />
      <Nav>
        <h1>OCR</h1>
        <p>Prueba de códigos</p>
      </Nav>
      <OCRreader/>
      <div id="containtText"></div>
      <ButtonX/>
      <MovilWarning>
        <h2>Disponible solo para moviles</h2>
      </MovilWarning>
    </MyContext.Provider>
  )
}
