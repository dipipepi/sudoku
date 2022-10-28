import React from 'react';
import './gameCreactorStyles.css';
import {useState} from "react";
import { dificultyLevelConstants } from '../../constants';

type Props = {
    onChange: (difficultyLevel: string) => void
}

export function GameCreator({onChange}: Props) {
    const [ gameConfig, setGameConfig ] = useState({
        difficultyLevel: 'easy'
    });

    const setDificultLevel = (difficultyLevel: string): void => {
        setGameConfig({difficultyLevel});
    }

    const startGame = (): void => {
        onChange(gameConfig.difficultyLevel);
    }

    const difficultyValues = ['easy', 'middle', 'hard', 'ultraHard'];

    return (
        <div className='game-creator-wrapper'>
            <div className="game-creator">
                <div className="dificulty-selector buttons">
                    <h4>Select dificult level</h4>
                    {difficultyValues.map(item => {
                        return <button key={item} className={gameConfig.difficultyLevel === item ? 'active' : ''}
                                       onClick={() => setDificultLevel(item)}
                        >{dificultyLevelConstants[item]}</button>
                    })}
                </div>
                <button className='start-game-button' onClick={startGame}>Start Game</button>
            </div>
        </div>
    )
}


