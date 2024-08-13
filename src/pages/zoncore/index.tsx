import clsx from "clsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { twMerge } from "tailwind-merge";
import {
  StarIcon,
  SparklesIcon,
  MinusCircleIcon,
  CheckCircleIcon,
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
import { WildSelector, ColorsScore, Score } from "../../components/zoncore";

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
          "btn btn-square btn-neutral bg-neutral-300 pt-1 align-middle text-4xl text-neutral-900 hover:bg-neutral-400",
          className,
        ),
      )}
    >
      {points}
    </button>
  );
};

const Board = () => {
  const [board, setBoard] = useAtom(currentGameAtom);
  const [wilds, setWilds] = useAtom(currentWilds);
  return (
    <TransformWrapper
      disablePadding={true}
      centerOnInit={true}
      minScale={0.4}
      maxScale={7}
      doubleClick={{ disabled: true }}
    >
      <TransformComponent
        wrapperClass="bg-base-300 p-10 "
        wrapperStyle={{ height: "100vh", width: "100%" }}
        contentClass="bg-transparent p-5 "
      >
        <div
          className={clsx(
            `font-sans ${gluten.className}`,
            "flex flex-row flex-wrap justify-center gap-2 ",
          )}
        >
          <div className="flex flex-row justify-center gap-1 rounded-btn bg-base-200 ">
            {Object.keys(board).map((key, i) => (
              <div className="flex flex-col gap-1 " key={key + i}>
                <div
                  onClick={() => handleColHeaderClick(board, key, setBoard)}
                  className={twMerge(
                    clsx(
                      "mb-2 flex justify-center rounded-btn bg-base-content pt-1 align-middle text-4xl font-semibold capitalize text-base-100",
                      key === "h" && "text-red-700",
                    ),
                  )}
                >
                  {key}
                </div>
                {Object.keys(board[key]!.cells).map((cellKey, j) => {
                  const cell = board[key]!.cells[cellKey]!;
                  return cell.star ? (
                    <button
                      type="button"
                      disabled={!cell.clickable}
                      key={key + cellKey}
                      onClick={() => handleCellClick(board, [key, j], setBoard)}
                      className={clsx(
                        "btn btn-square swap swap-rotate",
                        colors[cell.color] ?? "bg-primary",
                        cell.selected && "swap-active",
                      )}
                    >
                      <SparklesIcon className="swap-on h-10 w-10 fill-primary stroke-primary-content" />
                      <StarIcon
                        className={twMerge(
                          "swap-off h-10 w-10",
                          cell.clickable
                            ? "fill-base-content stroke-base-300"
                            : "fill-base-content/40",
                        )}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!cell.clickable}
                      key={key + cellKey}
                      onClick={() => handleCellClick(board, [key, j], setBoard)}
                      className={clsx(
                        "btn btn-square swap swap-rotate",
                        colors[cell.color] ?? "bg-primary",
                        cell.selected && "swap-active",
                      )}
                    >
                      <CheckCircleIcon className="swap-on h-10 w-10 fill-secondary stroke-secondary-content" />
                      <MinusCircleIcon
                        className={twMerge(
                          "swap-off h-10 w-10",
                          cell.clickable
                            ? "fill-base-content stroke-base-300"
                            : "fill-base-content/40",
                        )}
                      />
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
                <div
                  className={clsx(
                    "mb-2 flex justify-center rounded-btn bg-base-content pt-1 align-middle text-4xl font-semibold capitalize text-base-100",
                    key === "h" ? "text-red-700" : "text-base-100",
                    board[key]!.marked === "min"
                      ? "bg-accent"
                      : "bg-base-content",
                  )}
                  key={key + "min"}
                  onClick={() =>
                    handleColCompleteClick(board, key, "min", setBoard)
                  }
                >
                  {board[key]!.minPoints}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <ColorsScore />
            <Score />
          </div>
          <div className="flex h-5 w-full justify-center ">
            <span id="columnConfetti" />
          </div>
          <WildSelector wilds={wilds} setWilds={setWilds} />
          <button
            type="button"
            onClick={() => resetGame(setBoard, setWilds)}
            className="btn btn-accent "
          >
            Reset
          </button>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

const Zoncore = () => {
  return (
    <main data-theme={"dark"}>
      <Board />
    </main>
  );
};
export default Zoncore;
