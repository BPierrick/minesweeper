export type GameData = Array<Array<CellData>>;

export interface CellData {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlag: boolean;
  numberOfAdjacentMines: number;
}

export enum GameStatus {
  LOST = "LOST",
  WON = "WON",
  IN_PROGRESS = "IN_PROGRESS",
  SETTING_RULES = "SETTING_RULES"
}

export interface GameState {
  gameData: GameData;
  gameStatus: GameStatus;
  isAlternativeFlagAssetOn: boolean
}

export interface CellLeftClickAction {
  type: "CELL_LEFT_CLICK_ACTION";
  x: number;
  y: number;
}

export interface CellRightClickAction {
  type: "CELL_RIGHT_CLICK_ACTION";
  x: number;
  y: number;
}

export interface SetGameGridAction {
  type: "SET_GAME_GRID_ACTION";
  size: number;
  numberOfMines: number;
}

export interface InitGameStateAction {
  type: "INIT_GAME_STATE_ACTION";
}

export interface SetGameStatusAction {
  type: "SET_GAME_STATUS_ACTION";
  gameStatus: GameStatus;
}

export interface SwitchFlagAssetAction {
  type: 'SWITCH_FLAG_ASSET_ACTION'
}

export type GameAction =
  | CellLeftClickAction
  | CellRightClickAction
  | SetGameGridAction
  | InitGameStateAction
  | SetGameStatusAction
  | SwitchFlagAssetAction;
