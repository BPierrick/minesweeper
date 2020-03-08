import React from "react";
import { CellData } from "../../types";
import "./cell.scss";

interface CellProps {
  isAlternativeFlagAssetOn?: boolean;
  onLeftClick: (x: number, y: number) => void;
  onRightClick: (
    x: number,
    y: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  data: CellData;
}

/**
 * Renders the cell value regarding its data
 * @param data Cell data
 * @param isAlternativeFlagAssetOn Facultative boolean to show alternative flag asset
 */
function displayCellValue(
  data: CellData,
  isAlternativeFlagAssetOn?: boolean
): JSX.Element {
  if (data.isFlag) {
    return isAlternativeFlagAssetOn ? (
      <img src="assets/png/flag_opt.png" alt="flag" />
    ) : (
      <img src="assets/svg/flag.svg" alt="flag" />
    );
  }
  if (data.isRevealed) {
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
  return (
    <div
      className="cell"
      onClick={() => props.onLeftClick(props.data.x, props.data.y)}
      onContextMenu={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        props.onRightClick(props.data.x, props.data.y, event)
      }
    >
      {displayCellValue(props.data, props.isAlternativeFlagAssetOn)}
    </div>
  );
};

export default Cell;
