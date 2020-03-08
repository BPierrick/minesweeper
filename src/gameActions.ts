import {
  CellLeftClickAction,
  CellRightClickAction,
  SetGameGridAction,
  InitGameStateAction,
  SetGameStatusAction,
  GameStatus,
  SwitchFlagAssetAction
} from "./types";

export const CELL_LEFT_CLICK_ACTION = "CELL_LEFT_CLICK_ACTION";
/**
 * Left click action on a cell
 * @param x X coordinated of the cell being clicked on
 * @param y Y coordinated of the cell being clicked on
 */
export function cellLeftClickAction(x: number, y: number): CellLeftClickAction {
  return {
    type: CELL_LEFT_CLICK_ACTION,
    x,
    y
  };
}

export const CELL_RIGHT_CLICK_ACTION = "CELL_RIGHT_CLICK_ACTION";
/**
 * Right click action on a cell
 * @param x X coordinated of the cell being clicked on
 * @param y Y coordinated of the cell being clicked on
 */
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

export const SET_GAME_GRID_ACTION = "SET_GAME_GRID_ACTION";
/**
 * Action dispatched to initialize the game board
 * @param size Width and height of the game board
 * @param numberOfMines Number of mines of the game board
 */
export function setGameGrid(
  size: number,
  numberOfMines: number
): SetGameGridAction {
  return {
    type: SET_GAME_GRID_ACTION,
    size,
    numberOfMines
  };
}

export const INIT_GAME_STATE_ACTION = "INIT_GAME_STATE_ACTION";
/**
 * Action dispatched to reset the GameState object
 */
export function initGameState(): InitGameStateAction {
  return {
    type: INIT_GAME_STATE_ACTION
  };
}

export const SET_GAME_STATUS_ACTION = "SET_GAME_STATUS_ACTION";
/**
 * Action dispatched to set a new gameStatus
 * @param gameStatus New GameStatus to set
 */
export function setGameStatus(gameStatus: GameStatus): SetGameStatusAction {
  return {
    type: SET_GAME_STATUS_ACTION,
    gameStatus
  };
}

export const SWITCH_FLAG_ASSET_ACTION = "SWITCH_FLAG_ASSET_ACTION";
/**
 * Action dispatched to switch the flag assets
 */
export function switchFlagAsset(): SwitchFlagAssetAction {
  return {
    type: SWITCH_FLAG_ASSET_ACTION
  };
}
