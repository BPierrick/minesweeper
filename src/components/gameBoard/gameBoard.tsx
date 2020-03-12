import React, { useState, useEffect } from "react";

// ----------------------- Type imports ----------------------------------
import {
  GameData,
  CellData,
  GameAction,
  GameStatus,
  GameState
} from "../../types";

// ----------------------- Action imports --------------------------------
import {
  cellLeftClickAction,
  cellRightClickAction,
  setGameGrid,
  initGameState,
  switchFlagAsset,
  setGameStatus
} from "../../gameActions";

import Cell from "../cell/cell";
import "./gameBoard.scss";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

interface GameBoardProps {
  size: number;
  numberOfMines: number;
  dispatch: React.Dispatch<GameAction>;
  gameState: GameState;
}

/**
 * Renders the whole game board
 * @param gameData Object containing all cell data
 * @param dispatch Dispatch method returned by useReducer hook
 * @param isAlternativeFlagAssetOn Facultative boolean to show alternative flag asset
 */
function renderGameBoard(
  gameData: GameData,
  dispatch: React.Dispatch<GameAction>,
  showCellValues: boolean,
  isAlternativeFlagAssetOn?: boolean
): JSX.Element {
  const size: number = gameData.length;

  return (
    <div className="gameGrid">
      {gameData.map((gameDataRow: Array<CellData>, rowIndex: number) => {
        return (
          <div
            className="cellRow"
            key={rowIndex}
            style={{ height: `Calc(90vw/${size})` }}
          >
            {gameDataRow.map((cellData: CellData) => {
              return (
                <Cell
                  key={`cellData ${cellData.x}${cellData.y}`}
                  data={cellData}
                  isAlternativeFlagAssetOn={isAlternativeFlagAssetOn}
                  showCellValues={showCellValues}
                  onLeftClick={(x: number, y: number) => {
                    dispatch(cellLeftClickAction(x, y));
                  }}
                  onRightClick={(
                    x: number,
                    y: number,
                    event: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => {
                    event.preventDefault();
                    dispatch(cellRightClickAction(x, y));
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function renderGameFinishedComponent(
  gameFinishedLabel: string,
  dispatch: React.Dispatch<GameAction>,
  size: number,
  numberOfMines: number
) {
  return (
    <div className="gameFinishedContainer">
      <span>{gameFinishedLabel}</span>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(setGameGrid(size, numberOfMines));
          dispatch(setGameStatus(GameStatus.IN_PROGRESS));
        }}
        style={{ margin: 5 }}
      >
        Try again ?
      </Button>
    </div>
  );
}

/**
 * Game board component
 * @param props GameBoardProps
 */
const GameBoard: React.FC<GameBoardProps> = (props: GameBoardProps) => {
  const { gameState, dispatch, size, numberOfMines } = props;
  const [showCellValues, setShowCellValues] = useState(false);

  //Only fired when component in mounted (after first render)
  //To initialize the board game
  useEffect(() => {
    dispatch(setGameGrid(size, numberOfMines));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let gameFinishedComponent: JSX.Element = <></>;

  if (gameState.gameStatus === GameStatus.LOST) {
    gameFinishedComponent = renderGameFinishedComponent(
      "YOU LOSE",
      dispatch,
      size,
      numberOfMines
    );
  }

  if (gameState.gameStatus === GameStatus.WON) {
    gameFinishedComponent = renderGameFinishedComponent(
      "YOU WIN",
      dispatch,
      size,
      numberOfMines
    );
  }

  return (
    <div className="gameBoardContainer">
      {gameFinishedComponent}
      <div className="gameBoardHeader">
        <div className="headerLeftContainer">
          <span className="switchLabel">Change flag image asset</span>
          <Switch
            checked={gameState.isAlternativeFlagAssetOn}
            onChange={() => {
              dispatch(switchFlagAsset());
            }}
          />
        </div>
        <div className="headerRightContainer">
          <Button variant="contained" onClick={() => dispatch(initGameState())}>
            QUIT
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowCellValues(!showCellValues);
            }}
          >
            <img
              src={
                showCellValues
                  ? "assets/svg/hide_solution_icon.svg"
                  : "assets/svg/show_solution_icon.svg"
              }
              alt="Show solution"
            />
          </Button>
        </div>
      </div>
      {renderGameBoard(
        gameState.gameData,
        dispatch,
        showCellValues,
        gameState.isAlternativeFlagAssetOn
      )}
    </div>
  );
};

export default GameBoard;
