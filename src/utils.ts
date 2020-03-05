import { GameData, CellData } from "./types";

/**
 *
 * @param x
 * @param y
 * @param gameData
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
