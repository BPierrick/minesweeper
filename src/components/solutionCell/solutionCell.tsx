import React, { useContext } from "react";
import { CellData } from "../../types";
import { SizeContext } from "../game/game";

interface SolutionCellProps {
  data: CellData;
}

/**
 * Displays the cell value whether its isRevealed attributes is true or not
 * @param data Cell data
 */
function displayCellValue(data: CellData): JSX.Element {
  if (data.isMine) {
    return <img src="assets/svg/bomb.svg" alt="bomb" />;
  } else if (data.numberOfAdjacentMines > 0) {
    return <span>{data.numberOfAdjacentMines}</span>;
  } else {
    return <div className="emptyCell" />;
  }
}

/**
 * SolutionCell component
 * @param props SolutionCellProps
 */
const SolutionCell: React.FC<SolutionCellProps> = props => {
  const size: number = useContext(SizeContext);
  return (
    <div
      className="cell"
      style={{
        width: `calc(90%/${size})`,
        height: `100%`
      }}
    >
      {displayCellValue(props.data)}
    </div>
  );
};

export default SolutionCell;
