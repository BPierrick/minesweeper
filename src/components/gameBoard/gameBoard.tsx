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
import SolutionCell from "../solutionCell/solutionCell";
import Modal from "react-modal";

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
  isAlternativeFlagAssetOn?: boolean
): JSX.Element {
  return (
    <div className="gameGrid">
      {gameData.map((gameDataRow: Array<CellData>, rowIndex: number) => {
        return (
          <div className="cellRow" key={rowIndex}>
            {gameDataRow.map((cellData: CellData) => {
              return (
                <Cell
                  key={`cellData ${cellData.x}${cellData.y}`}
                  data={cellData}
                  isAlternativeFlagAssetOn={isAlternativeFlagAssetOn}
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

/**
 * Renders the whole game board with all cell values shown
 * @param gameData Object containing all cell data
 */
function renderSolutionGameBoardModal(gameData: GameData): React.ReactNode {
  return (
    <div className="gameGrid">
      {gameData.map((gameDataRow: Array<CellData>, rowIndex: number) => {
        return (
          <div className="cellRow" key={rowIndex}>
            {gameDataRow.map((cellData: CellData) => {
              return (
                <SolutionCell
                  key={`cellData ${cellData.x}${cellData.y}`}
                  data={cellData}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Game board component
 * @param props GameBoardProps
 */
const GameBoard: React.FC<GameBoardProps> = (props: GameBoardProps) => {
  const { gameState, dispatch, size, numberOfMines } = props;
  const [openModal, setOpenModal] = useState(false);

  //Only fired when component in mounted (after first render)
  //To initialize the board game
  useEffect(() => {
    dispatch(setGameGrid(size, numberOfMines));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let gameFinishedComponent: JSX.Element = <></>;

  if (gameState.gameStatus === GameStatus.LOST) {
    gameFinishedComponent = (
      <div className="gameFinishedContainer">
        <span>YOU LOSE</span>
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

  if (gameState.gameStatus === GameStatus.WON) {
    gameFinishedComponent = (
      <div className="gameFinishedContainer">
        <span>YOU WIN</span>
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
              setOpenModal(true);
            }}
          >
            <img src="assets/svg/solution_icon.svg" alt="Show solution" />
          </Button>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={{
          content: {
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height: "fitContent",
            width: "fitContent"
          }
        }}
      >
        <div className="modalGameBoardContainer">
          <div className="gameBoardModalHeader">
            <Button
              variant="contained"
              onClick={() => setOpenModal(false)}
              style={{ width: "fitContent" }}
            >
              <img src="assets/svg/close.svg" alt="Close" />
            </Button>
          </div>
          {renderSolutionGameBoardModal(gameState.gameData)}
        </div>
      </Modal>
      {renderGameBoard(
        gameState.gameData,
        dispatch,
        gameState.isAlternativeFlagAssetOn
      )}
    </div>
  );
};

export default GameBoard;
