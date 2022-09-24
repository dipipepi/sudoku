import React, {useEffect} from 'react';
import './App.css';
import {SudokuService} from "./services/sudokuService";
import {useState} from 'react';
import { GameCreator } from './components/gameCreator/GameCreator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { dificultyLevelConstants } from './constants';
// @ts-ignore
import _ from 'lodash';
import { SudokuGrid } from './components/sudokuGrid/SudokuGrid';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { SudokuHeader } from './components/sudokuHeader/SudokuHeader';
import 'bootstrap/dist/css/bootstrap.css';

export interface GameConfig {
    difficultyLevel: string;
    size: number;
}

function App() {

    let [ isNewGame, setIsNewGame] = useState(localStorage.savedGame ? false : true);
    let [ autoCheck, setAutoCheck ] = useState(true);
    let [ sudokuGrid, setSudokuGrid ] = useState([[]]);
    let [ pencilGrid, setPencilGrid ] = useState([[]])
    let solution = [];

    useEffect(() => {
        if(localStorage.savedGame) {
            const sudoku = JSON.parse(localStorage.savedGame)
            setSudokuGrid(sudoku.sudokuGrid);
            setPencilGrid(sudoku.pencilGrid);
            solution = sudoku.solutions;
        }
    }, []);

    const initGame = (gameConfig: GameConfig) => {
        const sudoku = new SudokuService(gameConfig);
        localStorage.setItem('savedGame', JSON.stringify(
            {sudokuGrid: sudoku.gameGrid, solution: sudoku.solution, pencilGrid: sudoku.pencilGrid}
        ));
        // @ts-ignore
        setSudokuGrid(sudoku.gameGrid);
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
                  <SudokuGrid sudokuGrid={sudokuGrid} pencilGrid={pencilGrid}/>
                  <ControlPanel/>
              </div>

              <pre>{ sudokuGrid }</pre>
          </div>
      </>
  );
}

export default App;

