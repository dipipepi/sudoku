import { createSlice } from "@reduxjs/toolkit";

interface IActivePosition {
    row: number;
    col: number;
    square: number;
    value: string;
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
            console.log('hello setActivePosition', action.payload);
            return action.payload;
        }
    }
});

export const { setActivePosition } = activePositionSlice.actions

export default activePositionSlice.reducer