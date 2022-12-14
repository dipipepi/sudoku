import React, { ReactElement } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IActivePosition,
  setActivePosition,
} from "../../slices/activePositionSlice";
import { RootState } from "../../store";
import { StyledGameCell, StyledPencilGrid, StyledValue } from "./style";

type Props = {
  position: string;
  value: string | number;
  children: ReactElement[];
};

export function SudokuCell({ position, value, children }: Props) {
  let activePosition: IActivePosition = useSelector(
    (state: RootState) => state.activePosition
  );

  const dispatch = useDispatch();
  const ref = useRef();
  const [currentRow, currentCol, currentSquare, currentValue] = position;
  const solution = JSON.parse(localStorage.getItem("solution") || "");

  const setActive = (event: {
    target: {
      dataset: { row: any; col: any; square: any; value: any; readonly: any };
    };
  }): void => {
    const position = {
      row: event.target.dataset.row,
      col: event.target.dataset.col,
      square: event.target.dataset.square,
      value: event.target.dataset.value,
      isReadOnly: event.target.dataset.readonly,
    };
    const solution = JSON.stringify(localStorage.getItem("solution"));
    dispatch(setActivePosition(position));
  };

  const getClasses = (
    position: string,
    activePosition: IActivePosition
  ): string => {
    const [currentRow, currentCol, currentSquare, currentValue] = position;
    let res = "game-cell";
    if (
      currentRow == activePosition.row ||
      currentCol == activePosition.col ||
      currentSquare == activePosition.square
    ) {
      res += " highlighted";
    }

    if (currentValue == activePosition.value) {
      res += " highlighted-number";
    }

    if (currentRow == activePosition.row && currentCol == activePosition.col) {
      res += " active";
    }

    if (typeof value === "number") {
      res += " game-value";
    }

    if (
      currentValue == activePosition.value &&
      (currentRow == activePosition.row ||
        currentCol == activePosition.col ||
        currentSquare == activePosition.square)
    ) {
      res += " conflict";
    }

    return res;
  };

  return (
    // @ts-ignore
    <StyledGameCell
      ref={ref}
      id={currentRow + "" + currentCol}
      onClick={setActive}
      className={getClasses(position, activePosition)}
      data-row={currentRow}
      data-col={currentCol}
      data-square={currentSquare}
      data-value={currentValue || ""}
      isConflictedValue={
        currentValue && solution[currentRow][currentCol] != currentValue
      }
      data-readonly={typeof value === "number" ? true : false}
    >
      <StyledValue>{currentValue || ""}</StyledValue>
      <StyledPencilGrid>{children}</StyledPencilGrid>
    </StyledGameCell>
  );
}
