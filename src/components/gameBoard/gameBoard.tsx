import React, { useReducer, Dispatch, useEffect } from "react";

// ----------------------- Type imports ----------------------------------
import { GameData, CellData, GameBoardAction, GameStatus } from "../../types";

// ----------------------- Action imports --------------------------------
import {
  cellLeftClickAction,
  cellRightClickAction
} from "../../gameBoardActions";

import { gameBoardReducer } from "../../gameBoardReducer";

import Cell from "../cell/cell";
import { Random } from "random-js";
import "./gameBoard.scss";
import { getAdjacentCells } from "../../utils";

interface GameBoardProps {
  size: number;
  numberOfMines: number;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

/**
 *
 * @param size
 */
function initializeBoard(size: number): GameData {
  const gameDataInitialized: GameData = [];
  for (let x = 0; x < size; x++) {
    gameDataInitialized.push([]);
    for (let y = 0; y < size; y++) {
      gameDataInitialized[x].push({
        x,
        y,
        isFlag: false,
        isMine: false,
        isRevealed: false,
        numberOfAdjacentMines: 0
      });
    }
  }

  return gameDataInitialized;
}

/**
 *
 * @param gameData
 * @param numberOfMines
 */
function setMines(gameData: GameData, numberOfMines: number): GameData {
  const random = new Random();
  const gameDataCopy: GameData = gameData;
  const size: number = gameData.length;
  let minesCount: number = 0;

  while (minesCount < numberOfMines) {
    const randomX: number = random.integer(0, size - 1);
    const randomY: number = random.integer(0, size - 1);

    if (!gameDataCopy[randomX][randomY].isMine) {
      gameDataCopy[randomX][randomY].isMine = true;
      minesCount++;
    }
  }

  return gameDataCopy;
}

/**
 *
 * @param gameData
 */
function setNumberOfAdjacentMines(gameData: GameData): GameData {
  const gameDataCopy: GameData = gameData;
  const size: number = gameData.length;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const gameCellNeighbours: Array<CellData> = getAdjacentCells(
        x,
        y,
        gameData
      );
      gameCellNeighbours.forEach((cell: CellData) => {
        if (cell.isMine) {
          gameDataCopy[x][y].numberOfAdjacentMines++;
        }
      });
    }
  }

  return gameDataCopy;
}

/**
 *
 * @param gameData
 */
function renderGameBoard(
  gameData: GameData,
  dispatch: Dispatch<GameBoardAction>
) {
  return (
    <>
      {gameData.map((gameDataRow: Array<CellData>, rowIndex: number) => {
        return (
          <div className="cellRow" key={rowIndex}>
            {gameDataRow.map((cellData: CellData) => {
              return (
                <Cell
                  key={`cellData ${cellData.x}${cellData.y}`}
                  data={cellData}
                  onLeftClick={(x, y) => {
                    dispatch(cellLeftClickAction(x, y));
                  }}
                  onRightClick={(x, y, event) => {
                    event.preventDefault();
                    dispatch(cellRightClickAction(x, y));
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

const GameBoard: React.FC<GameBoardProps> = props => {
  let gameData = initializeBoard(props.size);
  gameData = setMines(gameData, props.numberOfMines);
  gameData = setNumberOfAdjacentMines(gameData);

  const [gameState, dispatch] = useReducer(gameBoardReducer, {
    gameData,
    gameStatus: GameStatus.SETTING_RULES
  });

  useEffect(() => {
    if (gameState.gameStatus === GameStatus.LOST) {
      props.setGameStatus(GameStatus.LOST);
    }

    if (gameState.gameStatus === GameStatus.WON) {
      props.setGameStatus(GameStatus.WON);
    }
  });

  return renderGameBoard(gameState.gameData, dispatch);
};

export default GameBoard;
