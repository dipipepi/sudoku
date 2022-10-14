import React, { useEffect } from "react";
import { SudokuCell } from "./sudokuCell/SudokuCell";
import './SudokuGrid.css';
import {useState} from "react";
import {useDispatch, useSelector } from "react-redux";
import {ActivePosition, setActivePosition } from "../../slices/activePositionSlice";

export function SudokuGrid() {
    let sudokuGrid = useSelector((state: any) => state.sudokuGrid);
    let pencilGrid = useSelector((state: any) => state.pencilGrid);


    const getPencilGrid = (indexOfCell: number) => {
        let cells = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            cells.push(
                <div key={'pg-' + indexOfCell + '-' + i} className="pencil-grid-cell">{i+1}</div>
            )
        }

        return cells;
    }

    const getCells = (numberOfRow: number) => {
        let cells = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            const square = 3 * Math.floor(numberOfRow / 3) + Math.floor(i / 3);
            const position = numberOfRow+''+i+''+square+''+sudokuGrid[numberOfRow][i] || '';
            cells.push(
                <SudokuCell key={numberOfRow+i}
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