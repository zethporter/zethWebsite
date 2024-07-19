import clsx from "clsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { twMerge } from "tailwind-merge";
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
  type wildsObject,
  defaultWilds,
  wildsZod,
} from "../../components/zoncore/defaultGame";
import {
  handleCellClick,
  handleColHeaderClick,
  handleColCompleteClick,
  resetGame,
} from "../../components/zoncore/utils";
import WildSelector from "./WildSelector";

const currentGameAtom = atomWithStorage<boardObject>(
  "currentZoncoreGame",
  boardZod.parse(defaultGame),
);
const currentWilds = atomWithStorage<wildsObject>(
  "currentZoncoreWilds",
  wildsZod.parse(defaultWilds),
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

const MinMaxButton = ({
  points,
  className,
  disabled,
  onClick,
}: {
  points: number;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const { reward } = useReward("columnConfetti", "confetti");
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      onClickCapture={reward}
      className={twMerge(
        clsx(
          "btn btn-square btn-neutral pt-1 bg-neutral-300 align-middle text-4xl text-neutral-900 hover:bg-neutral-400",
          className,
        ),
      )}
    >
      {points}
    </button>
  );
};

const Zoncore = () => {
  const [board, setBoard] = useAtom(currentGameAtom);
  const [wilds, setWilds] = useAtom(currentWilds);
  return (
    <TransformWrapper centerOnInit={true} minScale={0.1} maxScale={4} doubleClick={{ disabled: true }}>
      <TransformComponent wrapperClass="bg-base-300 p-10" wrapperStyle={{ height: '100vh', width: '100%' }} contentClass="bg-transparent p-5">
        <div
          className={clsx(
            `font-sans ${gluten.className}`,
            "flex flex-row flex-wrap justify-center gap-2",
          )}
        >
          <div className="flex flex-row justify-center gap-1 rounded-btn bg-base-200">
            {Object.keys(board).map((key, i) => (
              <div className="flex flex-col gap-1" key={key + i}>
                <button
                  type="button"
                  onClick={() => handleColHeaderClick(board, key, setBoard)}
                  className={twMerge(
                    clsx(
                      "btn btn-square btn-neutral mb-2 pt-1 bg-neutral-300 align-middle text-4xl capitalize text-neutral-900 hover:bg-neutral-400",
                      key === "h" && "text-red-700",
                    ),
                  )}
                >
                  {key}
                </button>
                {Object.keys(board[key]!.cells).map((cellKey, j) => {
                  const cell = board[key]!.cells[cellKey]!;
                  return (
                    <button
                      type="button"
                      key={key + cellKey}
                      disabled={!cell.clickable}
                      onClick={() => handleCellClick(board, [key, j], setBoard)}
                      className={clsx(
                        "btn btn-square",
                        colors[cell.color] ?? "bg-primary",
                      )}
                    >
                      {cell.star ? (
                        cell.selected ? (
                          <SparklesIcon className="fill-primary stroke-neutral-100" />
                        ) : (
                          <StarIcon />
                        )
                      ) : cell.selected ? (
                        <XCircleIcon className="fill-secondary stroke-neutral-100" />
                      ) : (
                        <MinusCircleIcon />
                      )}
                    </button>
                  );
                })}
                <MinMaxButton
                  disabled={
                    board[key]!.rowCompleted || board[key]!.marked === "min"
                  }
                  className={clsx(
                    "mt-2",
                    key === "h" && "text-red-700",
                    board[key]!.marked === "max" && "bg-accent",
                  )}
                  points={board[key]!.maxPoints}
                  key={key + "max"}
                  onClick={() =>
                    handleColCompleteClick(board, key, "max", setBoard)
                  }
                />
                <MinMaxButton
                  disabled={board[key]!.marked === "max"}
                  className={clsx(
                    key === "h" && "text-red-700",
                    board[key]!.marked === "min" && "bg-accent",
                  )}
                  points={board[key]!.minPoints}
                  key={key + "min"}
                  onClick={() =>
                    handleColCompleteClick(board, key, "min", setBoard)
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex h-5 w-full justify-center">
            <span id="columnConfetti" />
          </div>
          <WildSelector wilds={wilds} setWilds={setWilds} />
          <button
            type="button"
            onClick={() => resetGame(setBoard, setWilds)}
            className="btn btn-accent"
          >
            Reset
          </button>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Zoncore;
