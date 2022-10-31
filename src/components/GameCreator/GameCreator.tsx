import React from 'react';
import './gameCreactorStyles.css';
import {useState} from "react";
import { DIFFICULTY_LEVELS } from '../../const/index';

type Props = {
    onChange: (difficultyLevel: string) => void
}

export function GameCreator({onChange}: Props) {
    const [ difficultyLevel, setDifficultyLevel ] = useState('Easy');
    const difficultyValues = Object.entries(DIFFICULTY_LEVELS);

    return (
        <div className='game-creator-wrapper'>
            <div className="game-creator">
                <div className="dificulty-selector buttons">
                    <h4>Select dificult level</h4>
                    {difficultyValues.map(item => {
                        return <button key={item[0]} className={difficultyLevel === item[1] ? 'active' : ''}
                                       onClick={() => setDifficultyLevel(item[1])}
                        >{item[1]}</button>
                    })}
                </div>
                <button className='start-game-button' onClick={() => onChange(difficultyLevel)}>Start Game</button>
            </div>
        </div>
    )
}


