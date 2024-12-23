import { useState, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { MinusIcon, PlusIcon, Bars2Icon } from "@heroicons/react/20/solid";

import { type rowType, type negatives } from "../../pages/zicks";

const scoreBoard: Array<[number, number]> = [
  [0, 0],
  [1, 1],
  [2, 3],
  [3, 6],
  [4, 10],
  [5, 15],
  [6, 21],
  [7, 28],
  [8, 36],
  [9, 45],
  [10, 55],
  [11, 66],
  [12, 78],
];

type scoreCard = {
  red: number;
  yellow: number;
  green: number;
  blue: number;
  negatives: number;
  total: number;
};

const rowScore = (row: rowType): number => {
  const selectedRow = Object.keys(row).filter(
    (block) => row[block as keyof typeof row].selected,
  );
  const score = scoreBoard.find((i) => i[0] === selectedRow.length);

  return score !== undefined ? score[1] : 0;
};

const negativesTotal = (negatives: negatives): number => {
  const totalNegatives = Object.keys(negatives).filter(
    (key) => negatives[key as keyof typeof negatives] === true,
  );
  const negativesLength =
    totalNegatives !== undefined ? totalNegatives.length : 0;
  return negativesLength * 5;
};

const Score = ({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}) => {
  const [scores, setScores] = useState<scoreCard>({
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0,
    negatives: 0,
    total: 0,
  });
  const gameData = useWatch({
    control,
  });

  useEffect(() => {
    const red = rowScore(gameData.red);
    const yellow = rowScore(gameData.yellow);
    const green = rowScore(gameData.green);
    const blue = rowScore(gameData.blue);
    const negatives = negativesTotal(gameData.negatives);
    const total = red + yellow + green + blue - negatives;
    setScores({
      red: red !== undefined ? red : 0,
      yellow: yellow !== undefined ? yellow : 0,
      green: green !== undefined ? green : 0,
      blue: blue !== undefined ? blue : 0,
      negatives: negatives,
      total: total,
    });
  }, [gameData]);

  return (
    <div className="flex h-full flex-1 flex-row justify-between">
      <p className="flex h-full min-w-14 flex-row items-center justify-center rounded-2xl border-4 border-red-600 bg-base-100 p-3 text-2xl font-semibold">
        <span>{scores.red}</span>
      </p>
      <PlusIcon className="w-8 fill-slate-600 stroke-slate-600" />
      <p className="flex h-full min-w-16 flex-row items-center justify-center rounded-2xl border-4 border-yellow-600 bg-base-100 p-2 text-2xl font-semibold">
        <span>{scores.yellow}</span>
      </p>
      <PlusIcon className="w-8 fill-slate-600 stroke-slate-600" />
      <p className="flex h-full min-w-16 flex-row items-center justify-center rounded-2xl border-4 border-green-600 bg-base-100 p-2 text-2xl font-semibold">
        <span>{scores.green}</span>
      </p>
      <PlusIcon className="w-8 fill-slate-600 stroke-slate-600" />
      <p className="flex h-full min-w-16 flex-row items-center justify-center rounded-2xl border-4 border-blue-600 bg-base-100 p-2 text-2xl font-semibold">
        <span>{scores.blue}</span>
      </p>
      <MinusIcon className="w-8 fill-slate-600 stroke-slate-600" />
      <p className="flex h-full min-w-16 flex-row items-center justify-center rounded-2xl border-4 border-secondary bg-base-100 p-2 text-2xl font-semibold">
        <span>{scores.negatives}</span>
      </p>
      <Bars2Icon className="w-8 fill-slate-600 stroke-slate-600" />
      <p className="flex h-full min-w-24 flex-row items-center justify-center rounded-2xl border-4 border-primary bg-base-100 p-2 text-2xl font-bold">
        <span>{scores.total}</span>
      </p>
    </div>
  );
};

export default Score;
