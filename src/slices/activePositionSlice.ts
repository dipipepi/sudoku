import { createSlice } from "@reduxjs/toolkit";

export interface IActivePosition {
    row: string;
    col: string;
    square: string;
    value: string | number;
    isReadOnly: string
}

interface IActivePositionAction {
    type: string;
    payload: IActivePosition;
}

export type ActivePosition = IActivePosition | {};

const initialState: ActivePosition = {};

const activePositionSlice = createSlice({
    name: 'activePosition',
    initialState,
    reducers: {
        setActivePosition: (state: ActivePosition, action: IActivePositionAction) => {
            return action.payload;
        }
    }
});

export const { setActivePosition } = activePositionSlice.actions

export default activePositionSlice.reducer