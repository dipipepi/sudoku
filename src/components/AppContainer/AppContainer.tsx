import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SudokuService } from "../../services/sudokuService";
import { setActivePosition } from "../../slices/activePositionSlice";
import { initPencilGrid } from "../../slices/pencilGridSlice";
import { itinSudokuGrid } from "../../slices/sudokuGridSlice";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { GameCreator } from "../GameCreator/GameCreator";
import { SudokuGrid } from "../SudokuGrid/SudokuGrid";
import {
  StyledCreateNewGameButton,
  StyledGameWrapper,
  StyledSudokuHeader,
  StyledWrapper,
} from "./style";

export const AppContainer = () => {
  const isSavedGameExist = localStorage.savedGame ? false : true;
  const [isNewGame, setIsNewGame] = useState(isSavedGameExist);
  const [wasSudokuGridInit, setWasSudokuGridInit] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.savedGame) {
      const { sudokuGrid, pencilGrid, activePosition } = JSON.parse(
        localStorage.savedGame
      );
      dispatch(itinSudokuGrid(sudokuGrid));
      dispatch(setActivePosition(activePosition));
      dispatch(initPencilGrid(pencilGrid));
      setWasSudokuGridInit(true);
    }
  }, []);

  const initGame = (difficultyLevel: string) => {
    const sudoku = new SudokuService(difficultyLevel);
    localStorage.setItem(
      "savedGame",
      JSON.stringify({
        sudokuGrid: sudoku.gameGrid,
        pencilGrid: sudoku.pencilGrid,
      })
    );
    localStorage.setItem("solution", JSON.stringify(sudoku.solution));
    dispatch(itinSudokuGrid(sudoku.gameGrid));
    const activePosition = {
      row: "0",
      col: "0",
      square: "0",
      value: sudoku.gameGrid[0][0] || "",
      isReadOnly: typeof sudoku.gameGrid[0][0] === "number" ? "true" : "false",
    };

    dispatch(setActivePosition(activePosition));
    dispatch(initPencilGrid(sudoku.pencilGrid));
    setIsNewGame(false);
    setWasSudokuGridInit(true);
  };

  const startNewGame = () => {
    setIsNewGame(true);
  };

  return (
    <>
      {isNewGame ? (
        <GameCreator onChange={initGame} />
      ) : wasSudokuGridInit ? (
        <StyledWrapper>
          <div>
            <StyledCreateNewGameButton onClick={startNewGame}>
              New Game
            </StyledCreateNewGameButton>
          </div>
          <StyledGameWrapper>
            <SudokuGrid startNewGame={startNewGame} />
            <ControlPanel />
          </StyledGameWrapper>
        </StyledWrapper>
      ) : (
        <div>There's an error with initialization grid</div>
      )}
    </>
  );
};
