import { configureStore } from "@reduxjs/toolkit";
import activePositionSlice, {
  ActivePosition,
} from "./slices/activePositionSlice";
import pencilGridSlice, { PencilGrid } from "./slices/pencilGridSlice";
import sudokuGridSlice from "./slices/sudokuGridSlice";

const store = configureStore({
  reducer: {
    sudokuGrid: sudokuGridSlice,
    pencilGrid: pencilGridSlice,
    activePosition: activePositionSlice,
  },
});

export interface RootState {
  activePosition: ActivePosition;
  pencilGrid: PencilGrid;
  sudokuGrid: string | number[][];
}

export default store;
