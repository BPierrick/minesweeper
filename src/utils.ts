import { GameData, CellData, GameState, GameStatus } from "./types";
import { Random } from "random-js";

/**
 * Returns an array of the neighbour CellData of the one located at (x,y) coordinates
 * @param x X coordinate of the current cell
 * @param y Y coordinate of the current cell
 * @param gameData Object containing all cell data
 */
export function getAdjacentCells(
  x: number,
  y: number,
  gameData: GameData
): Array<CellData> {
  const adjacentCellDataArray = [];
  const size = gameData.length;

  //left located column
  if (x > 0) {
    adjacentCellDataArray.push(gameData[x - 1][y]);
    if (y > 0) {
      adjacentCellDataArray.push(gameData[x - 1][y - 1]);
    }
    if (y < size - 1) {
      adjacentCellDataArray.push(gameData[x - 1][y + 1]);
    }
  }

  //right located column
  if (x < size - 1) {
    adjacentCellDataArray.push(gameData[x + 1][y]);
    if (y > 0) {
      adjacentCellDataArray.push(gameData[x + 1][y - 1]);
    }
    if (y < size - 1) {
      adjacentCellDataArray.push(gameData[x + 1][y + 1]);
    }
  }

  //top cell
  if (y > 0) {
    adjacentCellDataArray.push(gameData[x][y - 1]);
  }

  //down cell
  if (y < size - 1) {
    adjacentCellDataArray.push(gameData[x][y + 1]);
  }

  return adjacentCellDataArray;
}

/**
 * Returns an array of the neighbour CellData of the one located at (x,y) coordinates
 * @param x X coordinate of the current cell
 * @param y Y coordinate of the current cell
 * @param gameData Object containing all cell data
 */
export function getNotVisitedAdjacentCells(
  x: number,
  y: number,
  gameData: GameData
): Array<CellData> {
  const adjacentCellDataArray = [];
  const size = gameData.length;

  //left located column
  if (x > 0) {
    if (!gameData[x - 1][y].isVisited) {
      adjacentCellDataArray.push(gameData[x - 1][y]);
      gameData[x - 1][y].isVisited = true;
    }
    if (y > 0 && !gameData[x - 1][y - 1].isVisited) {
      adjacentCellDataArray.push(gameData[x - 1][y - 1]);
      gameData[x - 1][y - 1].isVisited = true;
    }
    if (y < size - 1 && !gameData[x - 1][y + 1].isVisited) {
      adjacentCellDataArray.push(gameData[x - 1][y + 1]);
      gameData[x - 1][y + 1].isVisited = true;
    }
  }

  //right located column
  if (x < size - 1) {
    if (!gameData[x + 1][y].isVisited) {
      adjacentCellDataArray.push(gameData[x + 1][y]);
      gameData[x + 1][y].isVisited = true;
    }
    if (y > 0 && !gameData[x + 1][y - 1].isVisited) {
      adjacentCellDataArray.push(gameData[x + 1][y - 1]);
      gameData[x + 1][y - 1].isVisited = true;
    }
    if (y < size - 1 && !gameData[x + 1][y + 1].isVisited) {
      adjacentCellDataArray.push(gameData[x + 1][y + 1]);
      gameData[x + 1][y + 1].isVisited = true;
    }
  }

  //top cell
  if (y > 0 && !gameData[x][y - 1].isVisited) {
    adjacentCellDataArray.push(gameData[x][y - 1]);
    gameData[x][y - 1].isVisited = true;
  }

  //down cell
  if (y < size - 1 && !gameData[x][y + 1].isVisited) {
    adjacentCellDataArray.push(gameData[x][y + 1]);
    gameData[x][y + 1].isVisited = true;
  }

  return adjacentCellDataArray;
}

export function resetVisitedCells(gameData: GameData): void {
  for (const cellRow of gameData) {
    for (const cellData of cellRow) {
      cellData.isVisited = false;
    }
  }
}

/**
 * Returns an initialized GameData object with empty cells
 * @param size Size of the board game which will be the size of the returned GameData object.
 */
export function initializeBoard(size: number): GameData {
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
        numberOfAdjacentMines: 0,
        isVisited: false
      });
    }
  }

  return gameDataInitialized;
}

/**
 * Randomly sets mines all over the initialized GameData object
 * @param gameData  GameData to set mines into
 * @param numberOfMines Number of mines to set
 */
export function setMines(gameData: GameData, numberOfMines: number): GameData {
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
 *  For each cell data object, sets its numberOfAdjacentMines attribute value regarding the mines around it
 * @param gameData GameData object containing all the cell data
 */
export function setNumberOfAdjacentMines(gameData: GameData): GameData {
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
 * Handles the action of left click on a cell following the minesweeper game rules.
 * @param gameState GameState of the gameReducer
 * @param x X coordinate of the cell which has been clicked on
 * @param y Y coordinate of the cell which has been clicked on
 */
export function handleLeftClick(
  gameState: GameState,
  x: number,
  y: number
): void {
  const gameData = gameState.gameData;
  const currentCell = gameData[x][y];
  if (currentCell.isRevealed || currentCell.isFlag) {
    return;
  } else if (currentCell.isMine) {
    //If a mine is revealed, it is a lost
    currentCell.isRevealed = true;
    setAllCellsRevealed(gameData);
    gameState.gameStatus = GameStatus.LOST;
    return;
  } else {
    currentCell.isRevealed = true;
    if (currentCell.numberOfAdjacentMines === 0) {
      showEmptyCells(gameData, x, y);
      resetVisitedCells(gameData);
    }
    if (isGameFinished(gameData)) {
      if (isGameWon(gameData)) {
        gameState.gameStatus = GameStatus.WON;
      } else {
        gameState.gameStatus = GameStatus.LOST;
      }
    }
  }
}

/**
 * Handles the action of right click on a cell following the minesweeper game rules.
 * Basically sets a flag to the cell, or removes it if there was one.
 * @param gameState GameState of the gameReducer
 * @param x X coordinate of the cell which has been clicked on
 * @param y Y coordinate of the cell which has been clicked on
 */
export function handleRightClick(
  gameState: GameState,
  x: number,
  y: number
): void {
  const gameData = gameState.gameData;
  const currentCell = gameData[x][y];
  if (!currentCell.isRevealed) {
    currentCell.isFlag = !currentCell.isFlag;
  }

  if (isGameFinished(gameState.gameData)) {
    if (isGameWon(gameData)) {
      gameState.gameStatus = GameStatus.WON;
    } else {
      gameState.gameStatus = GameStatus.LOST;
    }
  }
}

/**
 * Recursively shows all empty cells directly connected to the first cell used when called the algorithm.
 * Stops when the current cell is either shown, a flag, a mine or has a mine next to it
 * @param gameData GameData object containing all the cell data
 * @param x X coordinate of the current cell
 * @param y Y coordinate of the current cell
 */
function showEmptyCells(
  gameData: GameData,
  x: number,
  y: number,
  prevX?: number,
  prevY?: number
): void {
  const cellNeighbours = getNotVisitedAdjacentCells(x, y, gameData);
  for (const cellData of cellNeighbours) {
    if (!cellData.isRevealed && !cellData.isFlag && !cellData.isMine) {
      cellData.isRevealed = true;
      if (cellData.numberOfAdjacentMines === 0) {
        if (cellData.x === prevX && cellData.y === prevY) {
          console.log("optimize you prick");
        }
        showEmptyCells(gameData, cellData.x, cellData.y, x, y);
      }
    }
  }
}

/**
 * Sets all the gameData cell isRevealed attribute to true.
 * @param gameData GameData object containing all the cell data
 */
function setAllCellsRevealed(gameData: GameData): void {
  gameData.forEach((gameDataRow: Array<CellData>) => {
    gameDataRow.forEach((cellData: CellData) => {
      if (!cellData.isRevealed) {
        cellData.isRevealed = true;
      }
    });
  });
}

/**
 * Returns true if the game is won. If not returns false.
 * @param gameData GameData object containing all the cell data
 */
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

/**
 * Returns true if the game is finished (if all cells a either revealed or flagged). Else returns false.
 * @param gameData GameData object containing all the cell data
 */
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
