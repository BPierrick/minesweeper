import React, { useState, useEffect, useReducer } from "react";
import { GameStatus } from "../../types";
import GameBoard from "../gameBoard/gameBoard";
import { gameReducer } from "../../gameReducer";

import "./game.scss";
import SettingsComponent from "../settingsComponent/settingsComponent";

export const SizeContext: React.Context<number> = React.createContext(-1);

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

  if (
    gameStatus === GameStatus.WON ||
    gameStatus === GameStatus.LOST ||
    gameStatus === GameStatus.IN_PROGRESS
  ) {
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
  } else {
    return (
      <SettingsComponent
        size={size}
        setSize={setSize}
        numberOfMines={numberOfMines}
        setNumberOfMines={setNumberOfMines}
        dispatch={dispatch}
      />
    );
  }
};

export default Game;
