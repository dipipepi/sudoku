import styled from "styled-components";

const StyledTableWrapped = styled.div`
  background-color: #f9f9f9;
  max-width: 500px;
  min-height: 300px;
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

const StyledTable = styled.table`
  position: relative;
  width: 100%;
  justify-content: center;

  &:before {
    box-sizing: border-box;
    display: block;
    height: 99.9999%;
    border-left: 2px solid #4e4e4e;
    content: "";
    left: 33%;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 0;
    z-index: 1;
  }

  &:after {
    box-sizing: border-box;
    display: block;
    height: 100%;
    border-left: 2px solid #4e4e4e;
    content: "";
    right: 33%;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 0;
  }
`;

const StyledTableBody = styled.tbody`
  border-color: #9e9e9e;

  &:before {
    border-top: 2px solid #4e4e4e;
    content: "";
    display: block;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 33%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 99.9999%;
    z-index: 1;
  }

  &:after {
    border-bottom: 2px solid #4e4e4e;
    content: "";
    display: block;
    left: 0;
    pointer-events: none;
    position: absolute;
    bottom: 33%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 99.9999%;
  }
`;

const StyledGameRow = styled.tr`
  display: grid;
  grid-template-columns: repeat(9, 11.1%);
`;

const StyledEndedGame = styled.div`
  text-align: center;
  position: absolute;
  top: 36%;
`;

export {
  StyledTableWrapped,
  StyledTable,
  StyledTableBody,
  StyledGameRow,
  StyledEndedGame,
};
