import { MinusIcon, PlusIcon, Bars2Icon } from "@heroicons/react/20/solid";

const scoreBoard = [
  {
    count: 0,
    score: 0,
  },
  {
    count: 1,
    score: 1,
  },
  {
    count: 2,
    score: 3,
  },
  {
    count: 3,
    score: 6,
  },
  {
    count: 4,
    score: 10,
  },
  {
    count: 5,
    score: 15,
  },
  {
    count: 6,
    score: 21,
  },
  {
    count: 7,
    score: 28,
  },
  {
    count: 8,
    score: 36,
  },
  {
    count: 9,
    score: 45,
  },
  {
    count: 10,
    score: 55,
  },
  {
    count: 11,
    score: 66,
  },
  {
    count: 12,
    score: 78,
  },
];

const getScore = (count: number) => {
  const score = scoreBoard.find((score) => score.count === count);
  return score ? score.score : 0;
};

const finalScore = (scores: {
  first: number;
  second: number;
  third: number;
  fourth: number;
  negative: number;
}) => {
  const final =
    getScore(scores.first) +
    getScore(scores.second) +
    getScore(scores.third) +
    getScore(scores.fourth) +
    scores.negative * -5;

  return final;
};

const Score = ({
  scores,
}: {
  scores: {
    first: number;
    second: number;
    third: number;
    fourth: number;
    negative: number;
  };
}) => {
  return (
    <div className="flex flex-1 flex-row justify-between">
      <p className="self-center rounded border-2 border-red-600 bg-base-100 p-3 text-3xl">
        {getScore(scores.first)}
      </p>
      <PlusIcon className="w-9 fill-slate-600 stroke-slate-600" />
      <p className="self-center rounded border-2 border-yellow-600 bg-base-100 p-3 text-3xl">
        {getScore(scores.second)}
      </p>
      <PlusIcon className="w-9 fill-slate-600 stroke-slate-600" />
      <p className="self-center rounded border-2 border-green-600 bg-base-100 p-3 text-3xl">
        {getScore(scores.third)}
      </p>
      <PlusIcon className="w-9 fill-slate-600 stroke-slate-600" />
      <p className="self-center rounded border-2 border-blue-600 bg-base-100 p-3 text-3xl">
        {getScore(scores.fourth)}
      </p>
      <MinusIcon className="w-9 fill-slate-600 stroke-slate-600" />
      <p className="self-center rounded border-2 border-secondary bg-base-100 p-3 text-3xl">
        {scores.negative * 5}
      </p>
      <Bars2Icon className="w-9 fill-slate-600 stroke-slate-600" />
      <p className="self-center rounded border-2 border-primary bg-base-100 px-10 py-3 text-3xl">
        {finalScore(scores)}
      </p>
    </div>
  );
};

export default Score;
