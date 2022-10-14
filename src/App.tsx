import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {SudokuService} from "./services/sudokuService";
import {useState} from 'react';
import { GameCreator } from './components/gameCreator/GameCreator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SudokuGrid } from './components/sudokuGrid/SudokuGrid';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { SudokuHeader } from './components/sudokuHeader/SudokuHeader';
import {useDispatch} from 'react-redux';
import { add } from './slices/sudokuGridSlice';
import {setActivePosition } from './slices/activePositionSlice';

export interface GameConfig {
    difficultyLevel: string;
    size: number;
}

function App() {
    let [ isNewGame, setIsNewGame] = useState(localStorage.savedGame ? false : true);
    let [ autoCheck, setAutoCheck ] = useState(true);
    let [ pencilGrid, setPencilGrid ] = useState([[]]);

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.savedGame) {
            const sudoku = JSON.parse(localStorage.savedGame);
            setPencilGrid(sudoku.pencilGrid);
            dispatch(add(sudoku.sudokuGrid));
            dispatch(setActivePosition({row: 0, col: 0, square: 0, value: sudoku.sudokuGrid[0][0] || ''}));
        }
    }, []);

    const initGame = (gameConfig: GameConfig) => {
        const sudoku = new SudokuService(gameConfig);
        localStorage.setItem('savedGame', JSON.stringify(
            {sudokuGrid: sudoku.gameGrid, solution: sudoku.solution, pencilGrid: sudoku.pencilGrid}
        ));
        dispatch(add(sudoku.gameGrid));
        // @ts-ignore
        dispatch(setActivePosition({row: 0, col: 0, square: 0, value: sudoku.gameGrid[0][0] || ''}));
        // @ts-ignore
        setPencilGrid(sudoku.pencilGrid);
        setIsNewGame(false);
    }
    
    const startNewGame = () => {
        setIsNewGame(true);
    }

    return (
      <>
          {(() => {
              if(isNewGame) {
                  return <GameCreator onChange={(newSettings: GameConfig) => initGame(newSettings)}/>
              }
          })()}
          <div className="wrapper">
              <div className="game-info-wrapper">
                  <div className="check-mistakes-wrapper"></div>
              </div>
              <SudokuHeader onStartNewGame={() => startNewGame()}
                            onSetAutocheck={() => {}}/>
              <div className="game-wrapper">
                  <SudokuGrid/>
                  <ControlPanel/>
              </div>
          </div>
      </>
  );
}

export default App;

