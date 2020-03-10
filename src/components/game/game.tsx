import React, { useState, useEffect, useReducer } from "react";
import { GameStatus } from "../../types";
import GameBoard from "../gameBoard/gameBoard";
import Button from "@material-ui/core/Button";
import { gameReducer } from "../../gameReducer";
import { setGameStatus } from "../../gameActions";
import TextField from "@material-ui/core/TextField";

import "./game.scss";

export const SizeContext: React.Context<number> = React.createContext(-1);

/**
 * Handles input value changes
 * Used to set either the board size or the number of mines
 * @param event Event object returned by the onChange listener
 * @param setState setState method redurned by the useState hook
 */
function handleChange(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: React.Dispatch<React.SetStateAction<number>>,
  isSettingSize?: boolean
) {
  const size = parseInt(event.target.value);
  if (isNaN(size)) {
    setState(-1);
  } else {
    if (isSettingSize) {
      if (size <= 50) {
        setState(size);
      }
    } else {
      setState(size);
    }
  }
}

/**
 * Game component
 */
const Game: React.FC<{}> = () => {
  const [size, setSize] = useState(-1);
  const [numberOfMines, setNumberOfMines] = useState(-1);

  const [gameState, dispatch] = useReducer(gameReducer, {
    gameData: [],
    gameStatus: GameStatus.SETTING_RULES,
    isAlternativeFlagAssetOn: false
  });

  const { gameStatus } = gameState;

  useEffect(() => {
    if (gameStatus === GameStatus.SETTING_RULES) {
      setSize(-1);
      setNumberOfMines(-1);
    }
  }, [gameStatus]);

  switch (gameStatus) {
    case GameStatus.SETTING_RULES: {
      return (
        <>
          <div className="gameTitleContainer">
            <span className="title">Welcome to MineSweeper</span>
            <span className="subTitle">
              Please select a game board size and a number of mines to set
            </span>
          </div>
          <div className="settingButtonsContainer">
            <TextField
              id="filled-number"
              label="Board Size"
              type="number"
              variant="standard"
              value={size < 0 ? "" : size}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChange(event, setSize, true)}
              style={{
                margin: 5
              }}
            />
            <TextField
              id="filled-number"
              label="Number of Mines"
              type="number"
              variant="standard"
              disabled={size <= 1}
              value={numberOfMines < 0 ? "" : numberOfMines}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChange(event, setNumberOfMines)}
              style={{
                margin: 5
              }}
            />
            <Button
              variant="contained"
              disabled={
                size < 0 || numberOfMines < 0 || numberOfMines > size * size
              }
              onClick={() => dispatch(setGameStatus(GameStatus.IN_PROGRESS))}
            >
              Start Game
            </Button>
          </div>
        </>
      );
    }

    case GameStatus.WON:
    case GameStatus.LOST:
    case GameStatus.IN_PROGRESS: {
      return (
        <SizeContext.Provider value={size}>
          <GameBoard
            dispatch={dispatch}
            gameState={gameState}
            size={size}
            numberOfMines={numberOfMines}
          />
        </SizeContext.Provider>
      );
    }

    default:
      return <></>;
  }
};

export default Game;
