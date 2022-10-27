import { createSlice } from "@reduxjs/toolkit";

export const sudokuGridSlice = createSlice({
    name: 'sudokuGrid',
    initialState: [[]],
    reducers: {
        itinSudokuGrid: (state, action) => action.payload,
        setCellValue: (state: any, action) => {
            state[action.payload.row][action.payload.col] = action.payload.value;
        },
        clearCellValue: (state: any, action) => {
            const {row, col} = action.payload;
            state[row][col] = '';
        }
    }
});

export const { itinSudokuGrid, setCellValue, clearCellValue } = sudokuGridSlice.actions;

export default sudokuGridSlice.reducer;