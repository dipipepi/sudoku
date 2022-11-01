import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledSudokuHeader = styled.div`
  
`;

const StyledCreateNewGameButton = styled.button`
  border-radius: 30px;
  width: 100%;
  background-color: #3490de;
  border-color: #3490de;
  color: white;
  transition: all .2s ease-in-out;
  
  &:hover {
    background-color: #69a7f0;
    border-color: #69a7f0;
  }
`;

const StyledGameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (min-width: 800px) {
    flex-direction: row;
    min-height: 517px;
  }
`;

export { StyledWrapper, StyledSudokuHeader, StyledCreateNewGameButton, StyledGameWrapper };