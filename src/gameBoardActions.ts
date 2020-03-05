import { CellLeftClickAction, CellRightClickAction } from "./types";

export const CELL_LEFT_CLICK_ACTION = "CELL_LEFT_CLICK_ACTION";

export function cellLeftClickAction(x: number, y: number): CellLeftClickAction {
  return {
    type: CELL_LEFT_CLICK_ACTION,
    x,
    y
  };
}

export const CELL_RIGHT_CLICK_ACTION = "CELL_RIGHT_CLICK_ACTION";

export function cellRightClickAction(
  x: number,
  y: number
): CellRightClickAction {
  return {
    type: CELL_RIGHT_CLICK_ACTION,
    x,
    y
  };
}
