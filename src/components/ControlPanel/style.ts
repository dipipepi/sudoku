import styled from "styled-components";

const StyledGameControlsButtons = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 5px;
  height: 100%;
  width: 100%;
`;

const StyledButton = styled.button<{isEditode?: boolean}>`
  background-color: ${props => props.isEditode ? '#3490de' : '#e9e9e9'};
  border-color: #fff;
  border-style: solid;
  border-width: 0;
  box-sizing: border-box;
  cursor: pointer;
  padding: 8px 0 6px;
  text-align: center;
  transition: all .2s ease-in-out;
  color: ${props => props.isEditode ? 'white' : '#4e4e4e'};
  color: #4e4e4e;
`;

export { StyledGameControlsButtons, StyledButton};