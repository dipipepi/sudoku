import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PencilGrid = (string | null)[][][];

const initialState: PencilGrid = [];

export const pencilGridSlice = createSlice({
  name: "sudokuGrid",
  initialState,
  reducers: {
    initPencilGrid: (state, action) => action.payload,
    setPencilCellValue: (state: PencilGrid, action) => {
      const { row, col, value } = action.payload;
      if (state[row][col].indexOf(value) === -1) {
        state[row][col][value - 1] = value;
      } else {
        state[row][col][value - 1] = "";
      }
    },
    clearPencilCel: (state, action) => {
      const { row, col } = action.payload;
      state[row][col] = new Array(9);
    },
  },
});

export const { initPencilGrid, setPencilCellValue, clearPencilCel } =
  pencilGridSlice.actions;

export default pencilGridSlice.reducer;
