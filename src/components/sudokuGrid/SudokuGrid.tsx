import React from "react";
import { SudokuCell } from "./sudokuCell/SudokuCell";
import './SudokuGrid.css';
import {useState} from "react";

export function SudokuGrid({sudokuGrid, pencilGrid}: {sudokuGrid: number[][], pencilGrid: number[][]}) {
    // const [ activeCell, setActiveCell ] = useState([]);
    const [ activePosition, setActivePosition ] = useState({col: 0, row: 0, square: 0, value: sudokuGrid[0][0]});

    const getPencilGrid = (indexOfCell: number) => {
        let cells = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            cells.push(
                <div key={'pg-' + indexOfCell + '-' + i} className="pencil-grid-cell">{pencilGrid[indexOfCell][i] || ''}</div>
            )
        }

        return cells;
    }

    // @ts-ignore
    const setCellsActive = ({row, col, square, value}) => {
        setActivePosition({row, col, square, value});
        console.log('hello active', activePosition);
    }

    const getCells = (numberOfRow: number) => {
        let cells = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            const square = 3 * Math.floor(numberOfRow / 3) + Math.floor(i / 3);
            const position = numberOfRow+''+i+''+square+''+sudokuGrid[numberOfRow][i] || '';
            cells.push(
                <SudokuCell onActive={setCellsActive}
                            activePosition={activePosition}
                            key={numberOfRow+i}
                            position={position}
                            value={sudokuGrid[numberOfRow][i] || ''}>
                    {getPencilGrid(numberOfRow)}
                </SudokuCell>
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
    
    return (
        <div className="table-wrapper">
            <table className="table table-bordered sudoku-table">
                <tbody>
                    {getRows(sudokuGrid.length)}
                </tbody>
            </table>
        </div>
    );
}