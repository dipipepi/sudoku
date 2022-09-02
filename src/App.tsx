import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SudokuService} from "./services/sudokuService";

function App() {
  return (
    <div className="App">
      <h1>hello</h1>
    </div>
  );
}

export default App;
let sudoku = new SudokuService(3);

sudoku.createSudokuGrid();