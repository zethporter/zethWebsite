import clsx from "clsx";
import {
  StarIcon,
  SparklesIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { Gluten } from "next/font/google";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useReward } from "react-rewards";

import {
  type boardObject,
  defaultGame,
  boardZod,
} from "../../components/zoncore/defaultGame";
import { handleCellClick } from "../../components/zoncore/utils";

const currentGameAtom = atomWithStorage<boardObject>(
  "currentZoncoreGame",
  boardZod.parse(defaultGame),
);

const gluten = Gluten({
  subsets: ["latin"],
});

const colors = {
  red: "bg-red-500 hover:bg-red-700 disabled:bg-red-500/60",
  green: "bg-green-500 hover:bg-green-700 disabled:bg-green-500/60",
  blue: "bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500/60",
  orange: "bg-orange-500 hover:bg-orange-700 disabled:bg-orange-500/60",
  yellow: "bg-yellow-500 hover:bg-yellow-700 disabled:bg-yellow-500/60",
};

const MinMaxButton = ({ points, key }: { points: number; key: string }) => {
  const { reward } = useReward(key + points, "confetti");
  return (
    <button
      type="button"
      onClick={reward}
      className="btn btn-square btn-neutral bg-neutral-300 align-middle text-4xl text-neutral-900 hover:bg-neutral-400"
    >
      {points}
      <span id={key + points} />
    </button>
  );
};

const Zoncore = () => {
  const [board, setBoard] = useAtom(currentGameAtom);
  return (
    <div
      className={clsx(
        `font-sans ${gluten.className}`,
        "flex flex-row flex-wrap gap-2",
      )}
    >
      <div className="flex flex-row gap-1 rounded-btn bg-base-200">
        {Object.keys(board).map((key, i) => (
          <div className="flex flex-col gap-1" key={i}>
            <div className="mb-2 flex aspect-square w-full items-center justify-center rounded-btn bg-neutral-300 text-4xl font-extrabold capitalize text-neutral-900">
              {key}
            </div>
            {board[key]!.cells.map((cell, j) => (
              <button
                type="button"
                key={i}
                disabled={!cell.clickable}
                onClick={() => handleCellClick(board, [key, j], setBoard)}
                className={clsx(
                  "btn btn-square",
                  colors[cell.color] ?? "bg-primary",
                )}
              >
                {cell.star ? (
                  cell.selected ? (
                    <SparklesIcon />
                  ) : (
                    <StarIcon />
                  )
                ) : cell.selected ? (
                  <XCircleIcon />
                ) : (
                  <MinusCircleIcon />
                )}
              </button>
            ))}
            <MinMaxButton points={board[key]!.maxPoints} key={key} />
            <MinMaxButton points={board[key]!.minPoints} key={key} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Zoncore;
