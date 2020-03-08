import { GameState, GameAction, GameStatus } from "./types";
import {
  CELL_LEFT_CLICK_ACTION,
  CELL_RIGHT_CLICK_ACTION,
  SET_GAME_GRID_ACTION,
  INIT_GAME_STATE_ACTION,
  SET_GAME_STATUS_ACTION,
  SWITCH_FLAG_ASSET_ACTION
} from "./gameActions";

import produce, { Draft } from "immer";
import {
  handleLeftClick,
  handleRightClick,
  initializeBoard,
  setMines,
  setNumberOfAdjacentMines
} from "./utils";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case CELL_LEFT_CLICK_ACTION: {
      return produce(state, (draft: Draft<GameState>) => {
        handleLeftClick(draft, action.x, action.y);
      });
    }

    case CELL_RIGHT_CLICK_ACTION: {
      return produce(state, (draft: Draft<GameState>) => {
        handleRightClick(draft, action.x, action.y);
      });
    }

    case SET_GAME_GRID_ACTION: {
      return produce(state, (draft: Draft<GameState>) => {
        draft.gameData = initializeBoard(action.size);
        draft.gameData = setMines(draft.gameData, action.numberOfMines);
        draft.gameData = setNumberOfAdjacentMines(draft.gameData);
      });
    }

    case INIT_GAME_STATE_ACTION: {
      return produce(state, (draft: Draft<GameState>) => {
        draft.gameData = [];
        draft.gameStatus = GameStatus.SETTING_RULES;
      });
    }

    case SET_GAME_STATUS_ACTION: {
      return produce(state, (draft: Draft<GameState>) => {
        draft.gameStatus = action.gameStatus;
      });
    }

    case SWITCH_FLAG_ASSET_ACTION: {
      return produce(state, (draft: Draft<GameState>) => {
        draft.isAlternativeFlagAssetOn = !draft.isAlternativeFlagAssetOn;
      });
    }

    default:
      return state;
  }
}
