import styled from "styled-components";

export const QrReaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  z-index: 10;
  background-color: white;
`;


export const CameraWrapper = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
