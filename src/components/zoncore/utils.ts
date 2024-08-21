import { z } from "zod";
import {
  defaultGame,
  type boardObject,
  boardZod,
  type wildsObject,
  defaultWilds,
  type totalsObject,
  totals,
  defaultTotals,
  availableColors,
} from "./defaultGame";

const z_surroundingCells = z.array(z.tuple([z.string(), z.number()]));
type t_surroundingCells = z.infer<typeof z_surroundingCells>;

export function nextChar(c: string) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

export function previousChar(c: string) {
  return String.fromCharCode(c.charCodeAt(0) - 1);
}

const getSurroundingCells = (_rowId: number, _colId: string) => {
  const previousCol = _colId === "a" ? null : previousChar(_colId);
  const nextCol = _colId === "o" ? null : nextChar(_colId);
  const previousRow = _rowId === 0 ? null : _rowId - 1;
  const nextRow = _rowId === 6 ? null : _rowId + 1;

  const surroundingCells = [
    [previousCol, previousRow],
    [_colId, previousRow],
    [nextCol, previousRow],
    [previousCol, _rowId],
    [nextCol, _rowId],
    [previousCol, nextRow],
    [_colId, nextRow],
    [nextCol, nextRow],
  ];
  const filteredCells = surroundingCells.filter(
    (cell) => cell[0] && cell[1] !== null,
  );
  return filteredCells;
};

const clickableCheck = (board: boardObject, currTotals: totalsObject) => {
  const newBoard = { ...board };
  const newTotals = totals.parse(defaultTotals);
  newTotals.available = currTotals.available;
  Object.keys(newBoard).forEach((col) => {
    const _col = newBoard[col]!;
    let selectedCount = 0;
    Object.keys(_col.cells).forEach((row) => {
      const _row = _col.cells[parseInt(row)]!;
      if (_row.selected) {
        selectedCount++;
        newTotals[_row.color] = newTotals[_row.color] + 1;
        if (_row.star) {
          newTotals.star = newTotals.star - 1;
        }
      }
      if (col === "h") {
        _row.clickable = true;
      } else {
        let clickable = false;
        const surroundingCells = getSurroundingCells(
          parseInt(row),
          col,
        ) as t_surroundingCells;
        for (let i = 0; i < surroundingCells.length; i++) {
          const tempCell = surroundingCells[i];
          if (
            newBoard[tempCell![0]] &&
            newBoard[tempCell![0]]!.cells[tempCell![1]]!.selected
          ) {
            clickable = true;
            break;
          }
        }
        _row.clickable = clickable;
      }
      if (selectedCount === 7) {
        _col.colCompleted = true;
        const colPoints = _col.maxAvailable ? _col.maxPoints : _col.minPoints;
        newTotals.aThruO = newTotals.aThruO + colPoints;
      } else {
        _col.colCompleted = false;
      }
    });
  });
  return { newBoard, newTotals };
};

export const handleCellClick = (
  board: boardObject,
  key: [string, number],
  setBoard: (e: boardObject) => void,
  totals: totalsObject,
  setTotals: (e: totalsObject) => void,
) => {
  console.log(key);
  const [col, row] = key;
  const newBoard = { ...board };
  newBoard[col]!.cells[row]!.selected = !newBoard[col]!.cells[row]!.selected;
  const newStuff: { newBoard: boardObject; newTotals: totalsObject } =
    clickableCheck(newBoard, totals);
  setBoard(newStuff.newBoard);
  setTotals(newStuff.newTotals);
};

export const toggleMaxColorAvailable = (
  totals: totalsObject,
  color: availableColors,
  setTotals: (e: totalsObject) => void,
) => {
  const _totals = { ...totals };
  _totals.available[color] = !_totals.available[color];
  setTotals(_totals);
};

export const toggleMaxAvailable = (
  board: boardObject,
  col: string,
  setBoard: (e: boardObject) => void,
  totals: totalsObject,
  setTotals: (e: totalsObject) => void,
) => {
  const newBoard = { ...board };
  newBoard[col]!.maxAvailable = !newBoard[col]!.maxAvailable;
  const newStuff: { newBoard: boardObject; newTotals: totalsObject } =
    clickableCheck(newBoard, totals);
  setBoard(newStuff.newBoard);
  setTotals(newStuff.newTotals);
};

export const resetGame = (
  setBoard: (e: boardObject) => void,
  setWilds: (e: wildsObject) => void,
  setTotals: (e: totalsObject) => void,
) => {
  setBoard(boardZod.parse(defaultGame));
  setWilds(defaultWilds);
  setTotals(defaultTotals);
};

export const bonusCalc = (totals: totalsObject) => {
  const totalArray: number[] = (
    Object.keys(availableColors) as Array<keyof typeof availableColors>
  ).map((key) => {
    if (totals[key] === 21) {
      return totals.available[key] ? 5 : 3;
    }
    return 0;
  });

  return totalArray.reduce((partialSum, a) => partialSum + a, 0);
};

export const toggleWilds = (
  wilds: wildsObject,
  setWilds: (e: wildsObject) => void,
  isUsed: boolean,
) => {
  const _wilds = { ...wilds };
  if (isUsed) {
    _wilds.selected = _wilds.selected - 1;
    _wilds.available = _wilds.available + 1;
  } else {
    _wilds.selected = _wilds.selected + 1;
    _wilds.available = _wilds.available - 1;
  }
  setWilds(_wilds);
};
