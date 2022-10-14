import React from "react";
import {useRef} from "react";
import {useState} from "react";
import '../SudokuGrid.css';
import './SudokuCell.css';
import {useDispatch, useSelector } from "react-redux";
import { ActivePosition, setActivePosition } from "../../../slices/activePositionSlice";

export function SudokuCell({position, value, children}: any) {
    let activePosition = useSelector((state: any) => state.activePosition);
    const dispatch = useDispatch();
    const ref = useRef();
    const isActive = useRef(false);

    const setActive = (event: any) => {
        const position = {
            row: event.target.dataset.row,
            col: event.target.dataset.col,
            square: event.target.dataset.square,
            value: event.target.dataset.value,
        };
        dispatch(setActivePosition(position));
    }

    const getClasses = (position: any[], activePosition: { row: any; col: any; square: any; }): string => {
        let res = 'game-cell';
        // console.log('hello active', activePosition);
        if(position[0] == activePosition.row ||
            position[1] == activePosition.col ||
            position[2] == activePosition.square ||
            // @ts-ignore
            position[3] == activePosition.value) {
            res += ' highlighted';
        }

        if (position[0] == activePosition.row &&
            position[1] == activePosition.col) {
            res += ' active';
        }

        return res;
    }

    return (
        // @ts-ignore
        <td ref={ref}
            onClick={setActive}
            className={getClasses(position, activePosition)}
            data-row={position[0]}
            data-col={position[1]}
            data-square={position[2]}
            data-value={value || ''}>
            <div className="value">{value || ''}</div>
            <div className="pencil-grid">{children}</div>
        </td>

    )
}
