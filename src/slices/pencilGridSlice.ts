import { createSlice } from "@reduxjs/toolkit";

export const pencilGridSlice = createSlice({
    name: 'sudokuGrid',
    initialState: [[]],
    reducers: {
        setPencilGrid: (state, action) => action.payload,
        setPencilCellValue: (state: any, action) => {
            state[action.payload.row][action.payload.col] = action.payload.value;
        }
    }
});

export const { setPencilGrid, setPencilCellValue } = pencilGridSlice.actions

export default pencilGridSlice.reducer