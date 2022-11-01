import styled from "styled-components";

const StyledGameCell = styled.td<{isConflictedValue?: boolean}>`
  aspect-ratio: 1 / 1;
  text-align: center;
  vertical-align: middle;
  font-size: 5vw;
  font-weight: 300;
  position: relative;
  color: ${props => props.isConflictedValue ? '#fb3e3f' : '#4b90e2'};
  transition: all .2s ease-in-out;
  
  &:hover{
    background-color: #def;
    cursor: pointer;
  }
  
  &.active {
    background-color: #bbd7f6 !important;
  }
  
  &.game-value {
    color: black;
  }
  
  &.highlighted {
    background-color: #e9e9e9;
  }
  
  &.highlighted-number {
    background-color: #c4c6d5;
  }
  
  &.conflict {
    background-color: #f7cfd6;
  }

  @media(min-width: 800px) {
    font-size: 3.5vw;
  }
  
  
`;

const StyledValue = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`;

const StyledPencilGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;
  left: 0;
  line-height: 0;
  position: absolute;
  top: 0;
  width: 100%;
  pointer-events: none;
`;

const StyledPencilCell = styled.div`
  color: #aaa;
  display: inline-block;
  font-size: 13px;
  line-height: 18px;
  position: relative;
`;

export { StyledGameCell, StyledValue, StyledPencilGrid, StyledPencilCell};