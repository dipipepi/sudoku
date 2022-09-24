import React from "react";
import {useRef} from "react";
import { useClickOutside } from "../../../hooks/useClickOutsode";
import {useState} from "react";
import '../SudokuGrid.css';
import './SudokuCell.css';

export function SudokuCell({position, value, onActive, children}: {position: string; value: string | number; onActive: (position: any) => void; children: any}) {
    const ref = useRef();
    const [ isActive, setIsActive ] = useState(false);

    const unsetActive = (event: any) => {
        // @ts-ignore
        ref.current.classList.remove("active");
    }

    const setActive = (event: any) => {
        event.target.classList.add("active");
        onActive(event.target.dataset.position);
    }

    useClickOutside(ref, unsetActive);

    return (
        // @ts-ignore
        <td ref={ref} onClick={setActive} className='game-cell' data-position={position} data-value={value || ''}>
            {/*<div data-value={sudokuGrid[numberOfRow][i] || ''} data-position={numberOfRow+''+i} className="value" onClick={setActive}>{sudokuGrid[numberOfRow][i] || ''}</div>*/}
            <div className="value">{value || ''}</div>
            <div className="pencil-grid">{children}</div>
        </td>

    )
}
