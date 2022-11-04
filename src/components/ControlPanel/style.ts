import styled from "styled-components";

const StyledGameControlWrapper = styled.div`
  width: 100%;
  user-select: none;
  max-width: 450px;
  display: grid;
  grid-template-rows: 40px 40px;
  margin: 0 auto;
  gap: 10px;

  @media (min-width: 800px) {
    width: 50%;
    margin-left: 15px;
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
`;

const StyledNumpadWrapper = styled.div`
  flex-grow: 1;
  position: relative;
`;

const StyledNumpad = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 11.1%);
  grid-template-rows: 100%;
  height: 100%;
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #9e9e9e;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const StyledGameControlsButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 5px;
  height: 100%;
  width: 100%;

  @media (min-width: 800px) {
    height: auto;
  }
`;

const StyledButton = styled.button<{ isEditode?: boolean }>`
  background-color: ${(props) => (props.isEditode ? "#3490de" : "#e9e9e9")};
  border-color: #fff;
  border-style: solid;
  border-width: 0;
  box-sizing: border-box;
  cursor: pointer;
  padding: 8px 0 6px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  color: ${(props) => (props.isEditode ? "white" : "#4e4e4e")};
  color: #4e4e4e;
`;

export {
  StyledGameControlWrapper,
  StyledNumpadWrapper,
  StyledNumpad,
  StyledGameControlsButtons,
  StyledButton,
};
