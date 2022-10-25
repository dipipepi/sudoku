import React, {useEffect, useState } from "react";
import { SudokuCell } from "../sudokuCell/SudokuCell";
import './SudokuGrid.css';
import { useSelector } from "react-redux";

// @ts-ignore
export function SudokuGrid({startNewGame}) {
    let sudokuGrid = useSelector((state: any) => state.sudokuGrid);
    let pencilGrid = useSelector((state: any) => state.pencilGrid);
    const [ isGameEnded, setIsGameEnded ] = useState(false);
    const solution = JSON.parse(localStorage.getItem('solution') || '[]');

    console.log('hello SudokuGrid ', pencilGrid);


    const getPencilGrid = (numberOfRow: number, numberOfCol: number, pencilGrid: any) => {
        if (pencilGrid.length <= 1) {
            return;
        }
        let cells = [];
        // <div key={'pg-' + numberOfRow + '-' + i} className="pencil-grid-cell">{pencilGrid[numberOfRow][numberOfCol][i]}</div>

        for (let i = 0; i < sudokuGrid.length; i++){
            cells.push(
                <div key={'pg-' + numberOfRow + '-' + i} className="pencil-grid-cell">{pencilGrid[numberOfRow][numberOfCol][i]}</div>
            )
        }

        return cells;
    }

    const getCells = (numberOfRow: number) => {
        let cells = [];
        const SudokuCellMemo = React.memo(SudokuCell);

        for (let i = 0; i < sudokuGrid.length; i++){
            const square = 3 * Math.floor(numberOfRow / 3) + Math.floor(i / 3);
            const position = numberOfRow+''+i+''+square+''+sudokuGrid[numberOfRow][i] || '';
            cells.push(
                <SudokuCellMemo key={numberOfRow+i}
                            position={position}
                            value={sudokuGrid[numberOfRow][i] || ''}>
                    {getPencilGrid(numberOfRow, i, pencilGrid)}
                </SudokuCellMemo>
            )
        }

        return cells;
    }

    const getRows = (count: number) => {
        let rows = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            rows.push(<tr className='game-row' key={i}>{getCells(i)}</tr>)
        }

        return rows;
    };

    const rows = getRows(sudokuGrid.length);

    useEffect(() => {
        let isGameWon = true;
        for (let i = 0; i < sudokuGrid.length; i++) {
            for (let j = 0; j < sudokuGrid.length; j++) {
                if(sudokuGrid[i][j] != solution[i][j]) {
                    isGameWon = false;
                    break;
                }
            }
        }

        if (isGameWon) {
            setIsGameEnded(true);
        }
    }, [sudokuGrid]);

    const setNewGame = () => {
        setIsGameEnded(false);
        startNewGame();
    }
    
    return (
        <div className="table-wrapper">
            {isGameEnded ?
                <div className='ended-game'>
                    <h2>Congratulations! You won the game!</h2>
                    <button onClick={startNewGame}>Start new game</button>
                </div> :
                <table className="table table-bordered sudoku-table">
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            }
        </div>
    );
}