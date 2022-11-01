import styled from "styled-components";

const StyledCreatorWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000000a6;
  z-index: 1000;
`;

const StyledCreator = styled.div`
  position: relative;
  width: 400px;
  margin: 200px auto;
  padding: 10px 5px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  background-color: white;
`;

const StyledDifficultySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCreatorButton = styled.button<{isActive?: boolean}>`
  width: 100px;
  border: 1px solid #dbdbdb;
  border-radius: 20px;
  margin: 10px 0;
  background-color: ${props => props.isActive ? '#19a319' : 'white'};
  color: ${props => props.isActive ? 'white' : 'black'};
`;

const StyledCreateGameButton = styled(StyledCreatorButton)`
  width: 100%;
  color: white;
  background-color: #19a319;
`;

export { StyledCreatorWrapper, StyledCreator, StyledDifficultySection, StyledCreatorButton, StyledCreateGameButton };