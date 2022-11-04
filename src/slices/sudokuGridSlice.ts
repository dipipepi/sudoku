import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SudokuGrid = (string | number)[][];

export const sudokuGridSlice = createSlice({
  name: "sudokuGrid",
  initialState: [[]],
  reducers: {
    itinSudokuGrid: (state: SudokuGrid, action) => action.payload,
    setCellValue: (state: SudokuGrid, action) => {
      state[action.payload.row][action.payload.col] = action.payload.value;
    },
    clearCellValue: (state: SudokuGrid, action) => {
      const { row, col } = action.payload;
      state[row][col] = "";
    },
  },
});

export const { itinSudokuGrid, setCellValue, clearCellValue } =
  sudokuGridSlice.actions;

export default sudokuGridSlice.reducer;
