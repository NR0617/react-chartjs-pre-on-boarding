import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  /* Create a black background with opacity */
  background-color: rgba(0, 0, 0, 0.5);

  /* Center the spinner horizontally and vertically */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #f3f3f3;
  border-top-color: #3498db;
  animation: ${spin}1slinear infinite;
`;

export { SpinnerContainer, SpinnerOverlay };
