import styled from "styled-components";

export const Button = styled.button`
  width: 60px;
  height: 60px;
  font-size: 20px;
  border-radius: 50%;
  filter: invert(100%);
  background-color: transparent;
`;

export const GroupButton = styled.div`
  width: 100vw;
  background-color: rgb(30, 31, 31);
  height: 120px;
  bottom:0;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 540px) {
    display: none;
  }
`;

export const TextGroup = styled.div`
  width: 100vw;
  bottom: 120px;
  position: fixed;
  height: 60px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  padding: 0 10px;
  @media (min-width: 540px) {
    display: none;
  }
`;

export const TextButton = styled.button`
  font-size: 20px;
  background-color: transparent;
  border: none;
  filter: invert(100%);
`;

export const Text = styled.div`
  font-size: 25px;
  height: 50px;
  grid-column-start: 3;
  grid-column-end: span 4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextInput = styled.input`
  width: 150px;
  height: 32px;
  font-size: 20px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: rgb(30, 31, 31);
  color: white !important;
`;