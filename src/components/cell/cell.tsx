import React from "react";
import { CellData } from "../../types";
import "./cell.scss";

interface CellProps {
  onLeftClick: (x: number, y: number) => void;
  onRightClick: (
    x: number,
    y: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  data: CellData;
}

function displayCellValue(data: CellData): JSX.Element {
  if (data.isFlag) {
    // return <img src="assets/svg/flag.svg" alt="flag" />;
    return <img src="assets/png/flag_opt.png" alt="flag" />;
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

const Cell: React.FC<CellProps> = props => {
  return (
    <div
      className="cell"
      onClick={() => props.onLeftClick(props.data.x, props.data.y)}
      onContextMenu={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        props.onRightClick(props.data.x, props.data.y, event)
      }
    >
      {displayCellValue(props.data)}
    </div>
  );
};

export default Cell;
