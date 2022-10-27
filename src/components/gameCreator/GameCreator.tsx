import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './gameCreactorStyles.css';
import {useState} from "react";
import { dificultyLevelConstants } from '../../constants';
import { GameConfig } from '../../App';

// @ts-ignore
export function GameCreator({onChange}) {
    const [ gameConfig, setGameConfig ] = useState({
        difficultyLevel: 'easy'
    });

    const setDificultLevel = (difficultyLevel: string): void => {
        setGameConfig({difficultyLevel});
    }

    const startGame = (): void => {
        onChange(gameConfig);
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


