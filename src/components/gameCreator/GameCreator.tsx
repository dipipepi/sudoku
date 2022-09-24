import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './gameCreactorStyles.css';
import {useState} from "react";
import { dificultyLevelConstants } from '../../constants';
import { GameConfig } from '../../App';

// @ts-ignore
export function GameCreator({onChange}) {
    let [ isDificultyLevelSelected, setDificultyLevelSelected ] = useState(false);
    let [ gameConfig, setGameConfig ] = useState({
        difficultyLevel: 'easy',
        size: 3
    })

    const setDificultLevel = (difficultyLevel: string): void => {
        setGameConfig({...gameConfig, difficultyLevel})
    }

    const setSize = (size: number): void => {
        setGameConfig({...gameConfig, size})
    }

    const startGame = (): void => {
        onChange(gameConfig);
    }

    return (
        <div className='game-creator-wrapper'>
            <div className="game-creator">
                <div className="dificulty-selector buttons">
                    <h4>Select dificult level</h4>
                    <button className={gameConfig.difficultyLevel === 'easy' ? 'active' : ''} 
                            onClick={() => setDificultLevel('easy')}>{dificultyLevelConstants.easy}</button>
                    <button className={gameConfig.difficultyLevel === 'middle' ? 'active' : ''} 
                            onClick={() => setDificultLevel('middle')}>{dificultyLevelConstants.middle}</button>
                    <button className={gameConfig.difficultyLevel === 'hard' ? 'active' : ''} 
                            onClick={() => setDificultLevel('hard')}>{dificultyLevelConstants.hard}</button>
                    <button className={gameConfig.difficultyLevel === 'ultraHard' ? 'active' : ''} 
                            onClick={() => setDificultLevel('ultraHard')}>{dificultyLevelConstants.ultraHard}</button>
                </div>
                {/*<div className="size-selector buttons">*/}
                {/*    <h4>Select size</h4>*/}
                {/*    <button className={gameConfig.size === 3 ? 'active' : ''} onClick={() => setSize(3)}>3x3</button>*/}
                {/*    <button className={gameConfig.size === 4 ? 'active' : ''} onClick={() => setSize(4)}>4x4</button>*/}
                {/*</div>*/}
                <button className='start-game-button' onClick={startGame}>Start Game</button>
            </div>
        </div>
    )
}


