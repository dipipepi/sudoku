import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IActivePosition {
  row: string;
  col: string;
  square: string;
  value: string | number;
  isReadOnly: string;
}

interface IActivePositionAction {
  type: string;
  payload: IActivePosition;
}

export type ActivePosition = {
  row: string;
  col: string;
  square: string;
  value: string | number;
  isReadOnly: string;
};

const activePositionSlice = createSlice({
  name: "activePosition",
  initialState: {},
  reducers: {
    setActivePosition: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActivePosition } = activePositionSlice.actions;

export default activePositionSlice.reducer;
