import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 4vw;
  border-color: #9e9e9e;
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f3f3f3;
  }

  &:active {
    background-color: #dfdfdf;
  }
`;

export { StyledButton };
