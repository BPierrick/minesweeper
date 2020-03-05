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
    LOST = 'LOST',
    WON = 'WON',
    IN_PROGRESS = 'IN_PROGRESS',
    SETTING_RULES = 'SETTING_RULES'
} 

export interface GameBoardState {
  gameData: GameData;
  gameStatus: GameStatus;
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

export type GameBoardAction = CellLeftClickAction | CellRightClickAction;
