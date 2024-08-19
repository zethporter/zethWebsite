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

import {
  WildSelector,
  ColorsScore,
  Score,
  MinMaxButtons,
  useZoncore,
} from "../../components/zoncore";

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

const Board = () => {
  const {
    resetGame,
    handleCellClick,
    board,
    wilds,
    setWilds,
    toggleMaxAvailable,
    toggleMaxColor,
    totals,
  } = useZoncore("columnConfetti");
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
          <div className="flex flex-row justify-center gap-1 rounded-btn">
            {Object.keys(board).map((key, i) => (
              <div className="flex flex-col gap-1 " key={key + i}>
                <div
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
                      onClick={() => handleCellClick([key, j])}
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
                      onClick={() => handleCellClick([key, j])}
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
                <MinMaxButtons
                  minPoints={board[key]!.minPoints}
                  maxPoints={board[key]!.maxPoints}
                  maxAvailable={board[key]!.maxAvailable}
                  completed={board[key]!.colCompleted}
                  maxFunc={() => toggleMaxAvailable(key)}
                  className={"bg-base-content"}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <ColorsScore totals={totals} toggleMaxColor={toggleMaxColor} />
            <Score />
          </div>
          <div className="flex h-5 w-full justify-center ">
            <span id="columnConfetti" />
          </div>
          <WildSelector wilds={wilds} setWilds={setWilds} />
          <button
            type="button"
            onClick={() => resetGame()}
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
