import { type boardObject, boardColumnZod } from "./defaultGame";

export function nextChar(c: string) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

export function previousChar(c: string) {
  return String.fromCharCode(c.charCodeAt(0) - 1);
}

// const clickableCheck = (board: boardObject) => {
//   // const newBoard = { ...board }
//   Object.keys(board).forEach((key) => {
//     board[key]?.cells.forEach((cell, i) => {
//       // newCells.push({ ...cell, clickable: !cell.clickable })
//     })
//   })
// }

export const handleCellClick = (
  board: boardObject,
  key: [string, number],
  setBoard: (e: boardObject) => void,
) => {
  const [col, row] = key;
  const newBoard = { ...board };
  const newCells = newBoard[col]?.cells.map((cell, i) =>
    i === row ? { ...cell, selected: !cell.selected } : cell,
  );
  newBoard[col] = boardColumnZod.parse({ ...newBoard[col], cells: newCells });
  setBoard(newBoard);
};
