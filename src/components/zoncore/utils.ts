import { z } from "zod";
import { defaultGame, type boardObject, boardZod, type wildsObject, defaultWilds } from "./defaultGame";

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

const clickableCheck = (board: boardObject) => {
  const newBoard = { ...board };
  Object.keys(newBoard).forEach((col) => {
    Object.keys(newBoard[col]!.cells).forEach((row) => {
      if (col === "h") {
        newBoard[col]!.cells[parseInt(row)]!.clickable = true;
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
        newBoard[col]!.cells[parseInt(row)]!.clickable = clickable;
      }
    });
  });
  return newBoard;
};

export const handleCellClick = (
  board: boardObject,
  key: [string, number],
  setBoard: (e: boardObject) => void,
) => {
  console.log(key);
  const [col, row] = key;
  const newBoard = { ...board };
  newBoard[col]!.cells[row]!.selected = !newBoard[col]!.cells[row]!.selected;
  setBoard(clickableCheck(newBoard));
};

export const handleColHeaderClick = (
  board: boardObject,
  col: string,
  setBoard: (e: boardObject) => void,
) => {
  const newBoard = { ...board };
  newBoard[col]!.rowCompleted = !newBoard[col]!.rowCompleted;
  setBoard(newBoard);
};

export const handleColCompleteClick = (
  board: boardObject,
  col: string,
  marked: "none" | "min" | "max",
  setBoard: (e: boardObject) => void,
) => {
  const newBoard = { ...board };
  newBoard[col]!.marked =
    newBoard[col]!.marked === marked
      ? (newBoard[col]!.marked = "none")
      : (newBoard[col]!.marked = marked);
  setBoard(newBoard);
};

export const resetGame = (setBoard: (e: boardObject) => void, setWilds: (e: wildsObject) => void) => {
  setBoard(boardZod.parse(defaultGame));
  setWilds(defaultWilds);
};
