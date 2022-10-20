import React from "react";
import {useRef} from "react";
import '../SudokuGrid.css';
import './SudokuCell.css';
import {useDispatch, useSelector } from "react-redux";
import { setActivePosition } from "../../../slices/activePositionSlice";

export function SudokuCell({position, value,  children}: any) {
    let activePosition = useSelector((state: any) => state.activePosition);
    const dispatch = useDispatch();
    const ref = useRef();
    const [currentRow, currentCol, currentSquare, currentValue] = position;

    const setActive = (event: any) => {
        const position = {
            row: event.target.dataset.row,
            col: event.target.dataset.col,
            square: event.target.dataset.square,
            value: event.target.dataset.value,
            isReadOnly: event.target.dataset.readonly
        };
        dispatch(setActivePosition(position));
    }

    const getClasses = (position: any[], activePosition: { row: any; col: any; square: any; }): string => {
        let res = 'game-cell';
        // console.log('hello active', activePosition);
        if(currentRow == activePosition.row ||
            currentCol == activePosition.col ||
            currentSquare == activePosition.square ||
            // @ts-ignore
            currentValue == activePosition.value) {
            res += ' highlighted';
        }

        if (currentRow == activePosition.row &&
            currentCol == activePosition.col) {
            res += ' active';
        }

        if (typeof value === "number") {
            res += ' game-value'
        }

        return res;
    }

    return (
        // @ts-ignore
        <td ref={ref}
            id={currentRow + '' + currentCol}
            onClick={setActive}
            className={getClasses(position, activePosition)}
            data-row={currentRow}
            data-col={currentCol}
            data-square={currentSquare}
            data-value={currentValue || ''}
            data-readonly={typeof value === 'number' ? true : false}>
            <div className="value">{currentValue || ''}</div>
            <div className="pencil-grid">{children}</div>
        </td>

    )
}
