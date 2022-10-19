import { createSlice } from "@reduxjs/toolkit";

export const pencilGridSlice = createSlice({
    name: 'sudokuGrid',
    initialState: [[]],
    reducers: {
        addPencilGrid: (state, action) => action.payload,
        setPencilCellValue: (state: any, action) => {
            const {row, col, value} = action.payload;
            if (state[row][col].indexOf(value) === -1) {
                state[row][col][value-1] = value;
            } else {
                state[row][col][value-1] = '';
            }
        },
        clearPencilCel: (state, action) => {
            const {row, col} = action.payload;
            // @ts-ignore
            state[row][col] = new Array(9);
        }
    }
});

export const { addPencilGrid, setPencilCellValue, clearPencilCel } = pencilGridSlice.actions

export default pencilGridSlice.reducer