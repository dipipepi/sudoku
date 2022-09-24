import React from "react";
import { SudokuCell } from "./sudokuCell/SudokuCell";
import './SudokuGrid.css';
import {useState} from "react";

export function SudokuGrid({sudokuGrid, pencilGrid}: {sudokuGrid: number[][], pencilGrid: number[][]}) {
    const [ activeCell, setActiveCell ] = useState([]);

    const getPencilGrid = (indexOfCell: number) => {
        let cells = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            cells.push(
                <div key={'pg-' + indexOfCell + '-' + i} className="pencil-grid-cell">{pencilGrid[indexOfCell][i] || ''}</div>
            )
        }

        return cells;
    }

    const setCellsActive = (position: any) => {
        console.log('hello active', position);
    }

    const getCells = (numberOfRow: number) => {
        let cells = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            cells.push(
                <SudokuCell onActive={setCellsActive} key={numberOfRow+i} position={numberOfRow+''+i} value={sudokuGrid[numberOfRow][i] || ''}>
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
    }
    
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