import React from 'react';

export function SudokuHeader({onStartNewGame, onSetAutocheck}:
                                 {onStartNewGame: () => void, onSetAutocheck: () => void}) {

    return (
        <div className="sudoku-header">
            <button className='create-new-game' onClick={onStartNewGame}>New Game</button>
            <label htmlFor="autocheck">
                <span>Autocheck</span>
                <input type="radio" id='autocheck'/>
            </label>
        </div>
    );
}