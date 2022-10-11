import React from "react";
import {useRef} from "react";
import { useClickOutside } from "../../../hooks/useClickOutsode";
import {useState} from "react";
import '../SudokuGrid.css';
import './SudokuCell.css';

export function SudokuCell({position, value, onActive, activePosition, children}: any) {
    const ref = useRef();
    const [ isActive, setIsActive ] = useState(false);

    const unsetActive = (event: any) => {
        // @ts-ignore
        ref.current.classList.remove("active");
    }

    const setActive = (event: any) => {
        event.target.classList.add("active");
        if(event.target.dataset.row === activePosition.row) {
            event.target.classList.add("highlited");
        }
        onActive(event.target.dataset);
    }

    const getClasses = (position: any[], activePosition: { row: any; col: any; square: any; }): string => {
        let res = 'game-cell';
        if(position[0] === activePosition.row ||
            position[1] === activePosition.col ||
            position[2] === activePosition.square ||
            // @ts-ignore
            position[3] === activePosition.value) {
            res += ' highlighted';
        }

        return res;
    }

    useClickOutside(ref, unsetActive);

    return (
        // @ts-ignore
        <td ref={ref} onClick={setActive}
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
