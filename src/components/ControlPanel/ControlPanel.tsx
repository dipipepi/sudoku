import React, {ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IActivePosition, setActivePosition } from "../../slices/activePositionSlice";
import {clearPencilCel, setPencilCellValue } from "../../slices/pencilGridSlice";
import {clearCellValue, setCellValue } from "../../slices/sudokuGridSlice";
import NumpadItem from "../NumpadItem/NumpadItem";
import './controlPanel.css';
import {StyledButton, StyledGameControlsButtons } from "./style";

export function ControlPanel() {

    let activePosition: IActivePosition = useSelector((state: any) => state.activePosition);
    const [ isEditmode, setIsEditMode ] = useState(false);
    const dispatch = useDispatch();

    let solution = JSON.parse(localStorage.getItem('solution') || '[]');

    useEffect(() => {
        const keyDown = (e: KeyboardEvent) => {
            const key = e.key;
            switch (key) {
                case 'Backspace':
                    clearCell();
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    setValue(key);
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'ArrowRight':
                    moveActivePosition(key);
            }
        }
        document.addEventListener('keydown', keyDown);

        return () => {
            document.removeEventListener('keydown', keyDown);
        }
    }, []);

    const setValue = (value: string | number): void => {
        if (activePosition.isReadOnly === 'false') {
            if(!isEditmode) {
                setSudokuGridValue(value);
            } else {
                setPencilGridValue(value);
            }
        }
    };

    const setSudokuGridValue = (value: string | number): void => {
        const isReadOnly = typeof value === 'number' ? 'true' : 'false';

        dispatch(clearPencilCel({row: activePosition.row, col: activePosition.col, value: new Array(9)}))
        dispatch(setCellValue({row: activePosition.row, col: activePosition.col, value}));
        dispatch(setActivePosition({...activePosition, value, isReadOnly}));
    }

    const setPencilGridValue = (value: string | number): void => {
        if (!activePosition.value) {
            dispatch(setPencilCellValue({row: activePosition.row, col: activePosition.col, value}));
        }
    }

    const getnumpadItems = (): ReactElement[] => {
        const res = [];

        for (let i = 0; i < 9; i++) {
            res.push(<NumpadItem key={i.toString()} onClick={setValue} value={String(i+1)}></NumpadItem>)
        }

        return res;
    }

    const setEditMode = (): void => {
        setIsEditMode((state) => !state);
    }

    const clearCell = (): void => {
        if (activePosition.isReadOnly === 'false') {
            if(isEditmode) {
                dispatch(clearPencilCel({row: activePosition.row, col: activePosition.col}))
            } else {
                dispatch(clearCellValue({row: activePosition.row, col: activePosition.col}));
                dispatch(setActivePosition({...activePosition, value: ''}));
            }
        }
    }

    const moveActivePosition = (action: string): void => {
        const newPosition = {...activePosition};
        switch (action) {
            case 'ArrowUp':
                if(+activePosition.row - 1 >= 0) {
                    newPosition.row = String(+activePosition.row - 1);
                }
                break;
            case 'ArrowDown':
                if(+activePosition.row + 1 <= 8) {
                    newPosition.row = String(+activePosition.row + 1);
                }
                break;
            case 'ArrowLeft':
                if(+activePosition.col - 1 >= 0) {
                    newPosition.col = String(+activePosition.col - 1);
                }
                break;
            case 'ArrowRight':
                if(+activePosition.col + 1 <= 8) {
                    newPosition.col = String(+activePosition.col + 1);
                }
                break;
        }
        const newElement = document.getElementById(newPosition.row + '' + newPosition.col);

        newPosition.value = String(newElement!.dataset.value);
        newPosition.isReadOnly = String(newElement!.dataset.readonly);
        if(JSON.stringify(newPosition) !== JSON.stringify(activePosition)) {
            dispatch(setActivePosition(newPosition));
        }
    }

    const showHint = (): void => {
        const value = solution[activePosition.row][activePosition.col];
        setSudokuGridValue(value);
    }

    return (
        <div className="game-controls-wrapper">
            <div className="numpad-wrapper">
                <div className="numpad">
                    {getnumpadItems()}
                </div>
            </div>
                <StyledGameControlsButtons>
                    <StyledButton onClick={clearCell}>Cancel</StyledButton>
                    <StyledButton isEditode={isEditmode} onClick={setEditMode}>Notes</StyledButton>
                    <StyledButton onClick={showHint}>Hitn</StyledButton>
                </StyledGameControlsButtons>
        </div>);
}
