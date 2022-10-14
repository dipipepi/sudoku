import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivePosition } from "../../slices/activePositionSlice";
import { setCellValue } from "../../slices/sudokuGridSlice";
import './controlPanel.css';
import NumpadItem from "./numpadItem/NumpadItem";

const actions = {
    CANCEL: 'cancel',
    NOTEC: 'notec',
    HINT: 'hint'
}

export function ControlPanel() {

    let activePosition = useSelector((state: any) => state.activePosition);
    const dispatch = useDispatch();

    const setValue = useCallback((value: string) => {

        console.log('hello', activePosition);
        if (activePosition.value === '') {
            dispatch(setCellValue({row: activePosition.row, col: activePosition.col, value}));
        }
    }, [activePosition]);

    const makeAction = (action: string): void => {
        console.log('hello action', action);
    }

    const getnumpadItems = () => {
        const res = [];

        for (let i = 0; i < 9; i++) {
            res.push(<NumpadItem key={i.toString()} onClick={setValue} value={i+1}></NumpadItem>)
        }

        return res;
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
                    <div className="game-controls-item" onClick={() => makeAction(actions.CANCEL)}>Cancel</div>
                    <div className="game-controls-item" onClick={() => makeAction(actions.NOTEC)}>Notes</div>
                    <div className="game-controls-item" onClick={() => makeAction(actions.HINT)}>Hitn</div>
                </div>
            </div>
        </div>);
}
