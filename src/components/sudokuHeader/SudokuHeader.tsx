import React from 'react';

export function SudokuHeader({onStartNewGame}:
                                 {onStartNewGame: () => void}) {

    return (
        <div className="sudoku-header">
            <button className='create-new-game' onClick={onStartNewGame}>New Game</button>
        </div>
    );
}