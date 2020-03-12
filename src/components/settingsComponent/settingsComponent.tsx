import React from "react";

import { GameStatus, GameAction } from "../../types";
import { setGameStatus } from "../../gameActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

interface SettingsComponentProps {
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  numberOfMines: number;
  setNumberOfMines: React.Dispatch<React.SetStateAction<number>>;
  dispatch: React.Dispatch<GameAction>;
}

/**
 * Handles input value changes
 * Used to set either the board size or the number of mines
 * @param event Event object returned by the onChange listener
 * @param setState setState method redurned by the useState hook
 */
function handleChange(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: React.Dispatch<React.SetStateAction<number>>,
  max?: number
) {
  const value = parseInt(event.target.value);
  if (isNaN(value)) {
    setState(-1);
  } else {
    if (max !== undefined) {
      if (value <= max) {
        setState(value);
      }
    } else {
      setState(value);
    }
  }
}

const SettingsComponent: React.FC<SettingsComponentProps> = (
  props: SettingsComponentProps
) => {
  const { size, setSize, numberOfMines, setNumberOfMines, dispatch } = props;
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
          ) => handleChange(event, setSize, 100)}
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
};

export default SettingsComponent;
