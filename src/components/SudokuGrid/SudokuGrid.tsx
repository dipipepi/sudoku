import React, {ReactElement, useEffect, useState } from "react";
import { SudokuCell } from "../SudokuCell/SudokuCell";
import { useSelector } from "react-redux";
import { StyledPencilCell } from "../SudokuCell/style";
import {StyledEndedGame, StyledGameRow, StyledTable, StyledTableBody, StyledTableWrapped } from "./style";
import { StyledCreateNewGameButton } from "../AppContainer/style";

type Props = {
    startNewGame: () => void
};

export function SudokuGrid({startNewGame}: Props) {
    let sudokuGrid = useSelector((state: any) => state.sudokuGrid);
    let pencilGrid = useSelector((state: any) => state.pencilGrid);
    const [ isGameEnded, setIsGameEnded ] = useState(false);
    const solution = JSON.parse(localStorage.getItem('solution') || '[]');

    const getPencilGrid = (numberOfRow: number, numberOfCol: number, pencilGrid: any): ReactElement[] => {
        let cells = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            cells.push(
                <StyledPencilCell key={'pg-' + numberOfRow + '-' + i}>{pencilGrid[numberOfRow][numberOfCol][i]}</StyledPencilCell>
            )
        }

        return cells;
    }

    const getCells = (numberOfRow: number): ReactElement[] => {
        let cells = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            const square = 3 * Math.floor(numberOfRow / 3) + Math.floor(i / 3);
            const position = numberOfRow+''+i+''+square+''+sudokuGrid[numberOfRow][i] || '';
            cells.push(
                <SudokuCell key={numberOfRow+i}
                            position={position}
                            value={sudokuGrid[numberOfRow][i] || ''}>
                    {getPencilGrid(numberOfRow, i, pencilGrid)}
                </SudokuCell>
            )
        }

        return cells;
    }

    const getRows = (count: number): ReactElement[] => {
        let rows = [];

        for (let i = 0; i < sudokuGrid.length; i++){
            rows.push(<StyledGameRow key={i}>{getCells(i)}</StyledGameRow>)
        }

        return rows;
    };

    useEffect(() => {
        let isGameWon = true;
        for (let i = 0; i < sudokuGrid.length; i++) {
            for (let j = 0; j < sudokuGrid.length; j++) {
                if(Number(sudokuGrid[i][j]) !== solution[i][j]) {
                    isGameWon = false;
                    break;
                }
            }
        }

        if (isGameWon) {
            setIsGameEnded(true);
        }
    }, [sudokuGrid]);
    
    return (
        <StyledTableWrapped className="table-wrapper">
            {isGameEnded ?
                <StyledEndedGame>
                    <h2>Congratulations! You won the game!</h2>
                    <StyledCreateNewGameButton onClick={startNewGame}>Start new game</StyledCreateNewGameButton>
                </StyledEndedGame> :
                <StyledTable className="table-bordered ">
                    <StyledTableBody>
                    {getRows(sudokuGrid.length)}
                    </StyledTableBody>
                </StyledTable>
            }
        </StyledTableWrapped>
    );
}