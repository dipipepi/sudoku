import { configureStore } from "@reduxjs/toolkit";
import activePositionSlice from "./slices/activePositionSlice";
import pencilGridSlice  from "./slices/pencilGridSlice";
import sudokuGridSlice from './slices/sudokuGridSlice';

const store = configureStore({
    reducer: {
        sudokuGrid: sudokuGridSlice,
        pencilGrid: pencilGridSlice,
        activePosition: activePositionSlice
    }
})

export default store;