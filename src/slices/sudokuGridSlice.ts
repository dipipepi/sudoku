import { createSlice } from "@reduxjs/toolkit";

export const sudokuGridSlice = createSlice({
    name: 'sudokuGrid',
    initialState: [[]],
    reducers: {
        add: (state, action) => action.payload,
        setCellValue: (state: any, action) => {
            state[action.payload.row][action.payload.col] = action.payload.value;
        }
    }
});

export const { add, setCellValue } = sudokuGridSlice.actions

export default sudokuGridSlice.reducer