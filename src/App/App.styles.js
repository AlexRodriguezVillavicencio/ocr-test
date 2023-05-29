import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    background-color: black;
    color: aliceblue;
}
`;

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 80px;
  background-color: rgb(66, 35, 35);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MovilWarning = styled.div`
  display: none;
  @media (min-width: 540px) {
    display: flex;
    justify-content: center;
    top: 200px;
    width: 100vw;
    height: 100px;
    position: fixed;
  }
`;