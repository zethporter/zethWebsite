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
    <div className="flex h-20 w-full flex-row">
      <div className="w-20 rounded-xl border-4 border-red-600 bg-white p-2 text-center text-4xl">
        <p className="p-2">{getScore(scores.first)}</p>
      </div>
      <svg className="w-9 fill-slate-600 stroke-slate-600">
        <PlusIcon />
      </svg>
      <div className="w-20 rounded-xl border-4 border-yellow-400 bg-white p-2 text-center text-4xl">
        <p className="p-2">{getScore(scores.second)}</p>
      </div>
      <svg className="w-9 fill-slate-600 stroke-slate-600">
        <PlusIcon />
      </svg>
      <div className="w-20 rounded-xl border-4 border-green-600 bg-white p-2 text-center text-4xl">
        <p className="p-2">{getScore(scores.third)}</p>
      </div>
      <svg className="w-9 fill-slate-600 stroke-slate-600">
        <PlusIcon />
      </svg>
      <div className="w-20 rounded-xl border-4 border-blue-600 bg-white p-2 text-center text-4xl">
        <p className="p-2">{getScore(scores.fourth)}</p>
      </div>
      <svg className="w-9 fill-slate-600 stroke-slate-600">
        <MinusIcon />
      </svg>
      <div className="w-20 rounded-xl border-4 border-slate-600 bg-white p-2 text-center text-4xl">
        <p className="p-2">{scores.negative * 5}</p>
      </div>
      <svg className="mx-2 w-9 fill-slate-600 stroke-slate-600">
        <Bars2Icon />
      </svg>
      <div className="w-40 rounded-xl border-4 border-purple-600 bg-white p-2 text-center text-4xl">
        <p className="p-2">{finalScore(scores)}</p>
      </div>
    </div>
  );
};

export default Score;
