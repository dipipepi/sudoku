import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivePosition, IActivePosition, setActivePosition } from "../../slices/activePositionSlice";
import {clearPencilCel, setPencilCellValue } from "../../slices/pencilGridSlice";
import {clearCellValue, setCellValue } from "../../slices/sudokuGridSlice";
import './controlPanel.css';
import NumpadItem from "./numpadItem/NumpadItem";

const actions = {
    CANCEL: 'cancel',
    NOTEC: 'notec',
    HINT: 'hint'
}

export function ControlPanel() {

    let activePosition: IActivePosition = useSelector((state: any) => state.activePosition);
    const [ isEditmode, setIsEditMode ] = useState(false);
    const dispatch = useDispatch();

    const setValue = (value: string) => {
        if (activePosition.isReadOnly === 'false') {
            if(!isEditmode) {
                dispatch(clearPencilCel({row: activePosition.row, col: activePosition.col, value: new Array(9)}))
                dispatch(setCellValue({row: activePosition.row, col: activePosition.col, value: value.toString()}));
                dispatch(setActivePosition({...activePosition, value}))
            } else {
                if (!activePosition.value) {
                    dispatch(setPencilCellValue({row: activePosition.row, col: activePosition.col, value}));
                }
            }
        }
    };

    const makeAction = (action: string): void => {
        // console.log('hello action', action);
    }

    const getnumpadItems = () => {
        const res = [];

        for (let i = 0; i < 9; i++) {
            res.push(<NumpadItem key={i.toString()} onClick={setValue} value={i+1}></NumpadItem>)
        }

        return res;
    }

    const setEditMode = () => {
        setIsEditMode((state) => !state);
    }

    const clearCell = () => {
        if (activePosition.isReadOnly === 'false') {
            dispatch(clearCellValue({row: activePosition.row, col: activePosition.col}));
        }
    }

    return (
        <div className="game-controls-wrapper">
            <div className="numpad-wrapper">
                <div className="numpad">
                    {getnumpadItems()}
                </div>
            </div>
            <div className="game-controls">
                <div className="game-controls-buttons">
                    <div className="game-controls-item" onClick={clearCell}>Cancel</div>
                    <div className={`game-controls-item ${isEditmode ? 'edit-mode' : ''}`} onClick={setEditMode}>Notes</div>
                    <div className="game-controls-item" onClick={() => makeAction(actions.HINT)}>Hitn</div>
                </div>
            </div>
        </div>);
}
