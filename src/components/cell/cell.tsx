import React, { useContext } from "react";
import { CellData } from "../../types";
import "./cell.scss";
import { SizeContext } from "../game/game";

interface CellProps {
  isAlternativeFlagAssetOn?: boolean;
  onLeftClick: (x: number, y: number) => void;
  onRightClick: (
    x: number,
    y: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  data: CellData;
  showCellValues: boolean;
}

/**
 * Renders the cell value regarding its data
 * @param data Cell data
 * @param isAlternativeFlagAssetOn Facultative boolean to show alternative flag asset
 */
function displayCellValue(
  data: CellData,
  showCellValues: boolean,
  isAlternativeFlagAssetOn?: boolean
): JSX.Element {
  if (data.isFlag && !showCellValues) {
    return isAlternativeFlagAssetOn ? (
      <img src="assets/png/flag_opt.png" alt="flag" />
    ) : (
      <img src="assets/svg/flag.svg" alt="flag" />
    );
  }
  if (data.isRevealed || showCellValues) {
    if (data.isMine) {
      return <img src="assets/svg/bomb.svg" alt="bomb" />;
    } else if (data.numberOfAdjacentMines > 0) {
      return <span>{data.numberOfAdjacentMines}</span>;
    } else {
      return <div className="emptyCell" />;
    }
  }
  return <></>;
}

/**
 * Cell component
 * @param props CellProps
 */
const Cell: React.FC<CellProps> = (props: CellProps) => {
  const size: number = useContext(SizeContext);
  return (
    <div
      className="cell"
      onClick={() => {
        if (!props.showCellValues)
          props.onLeftClick(props.data.x, props.data.y);
      }}
      onContextMenu={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (!props.showCellValues)
          props.onRightClick(props.data.x, props.data.y, event);
      }}
      style={{
        width: `calc(90%/${size})`,
        height: `100%`
      }}
    >
      {displayCellValue(
        props.data,
        props.showCellValues,
        props.isAlternativeFlagAssetOn
      )}
    </div>
  );
};

export default Cell;
