import React, { useState } from "react";
import { GameStatus } from "../../types";
import GameBoard from "../gameBoard/gameBoard";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function handleChange(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: React.Dispatch<React.SetStateAction<number>>
) {
  const size = parseInt(event.target.value);
  if (size > 0) {
    setState(size);
  }
}

const Game: React.FC<{}> = () => {
  const [size, setSize] = useState(-1);
  const [numberOfMines, setNumberOfMines] = useState(-1);
  const [gameStatus, setGameStatus] = useState(GameStatus.SETTING_RULES);

  switch (gameStatus) {
    case GameStatus.SETTING_RULES: {
      if (size <= 1) {
        return (
          <>
            <TextField
              id="filled-number"
              label="Board Size"
              type="number"
              variant="outlined"
              value={size < 0 ? '' : size}
              onChange={event => handleChange(event, setSize)}
            />
          </>
        );
      } else if (size > 1 && numberOfMines < 0) {
        return (
          <>
            <input
              type="number"
              value={size}
              onChange={event => handleChange(event, setSize)}
            />
            <input
              type="number"
              value={0}
              onChange={event => handleChange(event, setNumberOfMines)}
            />
          </>
        );
      } else {
        return (
          <>
            <input
              type="number"
              value={size}
              onChange={event => handleChange(event, setSize)}
            />
            <input
              type="number"
              value={numberOfMines}
              onChange={event => {
                if (parseInt(event.target.value) < size * size) {
                  handleChange(event, setNumberOfMines);
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => setGameStatus(GameStatus.IN_PROGRESS)}
            >
              Start Game
            </Button>
          </>
        );
      }
    }

    case GameStatus.IN_PROGRESS: {
      return (
        <GameBoard
          size={size}
          numberOfMines={numberOfMines}
          setGameStatus={setGameStatus}
        />
      );
    }

    case GameStatus.LOST: {
      return (
        <Button
          variant="contained"
          onClick={() => setGameStatus(GameStatus.SETTING_RULES)}
        >
          Try again ?
        </Button>
      );
    }

    case GameStatus.WON: {
      return <>YOU WON</>;
    }

    default:
      return <></>;
  }
};

export default Game;
