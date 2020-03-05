import {
  GameBoardState,
  GameBoardAction,
  GameData,
  CellData,
  GameStatus
} from "./types";
import {
  CELL_LEFT_CLICK_ACTION,
  CELL_RIGHT_CLICK_ACTION
} from "./gameBoardActions";

import produce, { Draft } from "immer";
import { getAdjacentCells } from "./utils";

export function gameBoardReducer(
  state: GameBoardState,
  action: GameBoardAction
): GameBoardState {
  switch (action.type) {
    case CELL_LEFT_CLICK_ACTION: {
      return produce(state, (draft: Draft<GameBoardState>) => {
        handleLeftClick(draft, action.x, action.y);
      });
    }

    case CELL_RIGHT_CLICK_ACTION: {
      return produce(state, (draft: Draft<GameBoardState>) => {
        handleRightClick(draft, action.x, action.y);
      });
    }

    default:
      return state;
  }
}

function handleLeftClick(
  gameBoardState: GameBoardState,
  x: number,
  y: number
): void {
  const gameData = gameBoardState.gameData;
  const currentCell = gameData[x][y];
  if (currentCell.isRevealed || currentCell.isFlag) {
    return;
  } else if (currentCell.isMine) {
    //If a mine is revealed, it is a lost
    currentCell.isRevealed = true;
    gameBoardState.gameStatus = GameStatus.LOST;
    return;
  } else {
    currentCell.isRevealed = true;
    if (currentCell.numberOfAdjacentMines === 0) {
      showEmptyCells(gameData, x, y);
    }
    if (isGameFinished(gameData)) {
      if (isGameWon(gameData)) {
        gameBoardState.gameStatus = GameStatus.WON;
      } else {
        gameBoardState.gameStatus = GameStatus.LOST;
      }
    }
  }
}

function handleRightClick(
  gameBoardState: GameBoardState,
  x: number,
  y: number
): void {
  const gameData = gameBoardState.gameData;
  const currentCell = gameData[x][y];
  if (!currentCell.isRevealed) {
    currentCell.isFlag = !currentCell.isFlag;
  }

  if (isGameFinished(gameBoardState.gameData)) {
    if (isGameWon(gameData)) {
      gameBoardState.gameStatus = GameStatus.WON;
    } else {
      gameBoardState.gameStatus = GameStatus.LOST;
    }
  }
}

function showEmptyCells(gameData: GameData, x: number, y: number): void {
  const cellNeighbours = getAdjacentCells(x, y, gameData);
  cellNeighbours.forEach((cellData: CellData) => {
    if (!cellData.isRevealed && !cellData.isFlag && !cellData.isMine) {
      cellData.isRevealed = true;
      if (cellData.numberOfAdjacentMines === 0) {
        showEmptyCells(gameData, cellData.x, cellData.y);
      }
    }
  });
}

function isGameWon(gameData: GameData): boolean {
  let won = true;
  gameData.forEach((gameDataRow: Array<CellData>) => {
    gameDataRow.forEach((cellData: CellData) => {
      if (cellData.isFlag && !cellData.isMine) {
        won = false;
      }
    });
  });

  return won;
}

function isGameFinished(gameData: GameData): boolean {
  let finished = true;
  gameData.forEach((gameDataRow: Array<CellData>) => {
    gameDataRow.forEach((cellData: CellData) => {
      if (!cellData.isRevealed && !cellData.isFlag) {
        finished = false;
      }
    });
  });

  return finished;
}
