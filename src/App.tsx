import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {SudokuService} from "./services/sudokuService";
import {useState} from 'react';
import { GameCreator } from './components/gameCreator/GameCreator';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SudokuGrid } from './components/sudokuGrid/SudokuGrid';
import { ControlPanel } from './components/controlPanel/ControlPanel';
import { useDispatch } from 'react-redux';
import { itinSudokuGrid } from './slices/sudokuGridSlice';
import { setActivePosition } from './slices/activePositionSlice';
import { addPencilGrid } from './slices/pencilGridSlice';

export interface GameConfig {
    difficultyLevel: string;
    size: number;
}

function App() {
    const isSavedGameExist = localStorage.savedGame ? false : true;
    const [ isNewGame, setIsNewGame] = useState(isSavedGameExist);
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.savedGame) {
            const { sudokuGrid, pencilGrid, activePosition } = JSON.parse(localStorage.savedGame);
            dispatch(itinSudokuGrid(sudokuGrid));
            dispatch(setActivePosition(activePosition));
            dispatch(addPencilGrid(pencilGrid));
        }
    }, []);

    const initGame = (gameConfig: GameConfig) => {
        const sudoku = new SudokuService(gameConfig);
        localStorage.setItem('savedGame', JSON.stringify(
            {sudokuGrid: sudoku.gameGrid, pencilGrid: sudoku.pencilGrid}
        ));
        localStorage.setItem('solution', JSON.stringify(sudoku.solution));
        dispatch(itinSudokuGrid(sudoku.gameGrid));
        const activePosition = {
            row: '0',
            col: '0',
            square: '0',
            value: sudoku.gameGrid[0][0] || '',
            isReadOnly: typeof sudoku.gameGrid[0][0] === 'number' ? 'true' : 'false'
        }

        dispatch(setActivePosition(activePosition));
        dispatch(addPencilGrid(sudoku.pencilGrid));
        setIsNewGame(false);
    }
    
    const startNewGame = () => {
        setIsNewGame(true);
    }

    return (
        <>
            {isNewGame ?
                <GameCreator onChange={(newSettings: GameConfig) => initGame(newSettings)}/> :
                <div className="wrapper">
                    <div className="game-info-wrapper">
                        <div className="check-mistakes-wrapper"></div>
                    </div>
                    <div className="sudoku-header">
                        <button className='create-new-game' onClick={startNewGame}>New Game</button>
                    </div>
                    <div className="game-wrapper">
                        <SudokuGrid startNewGame={startNewGame}/>
                        <ControlPanel/>
                    </div>
                </div>
            }
      </>
  );
}

export default App;

