import clsx from "clsx";
import { useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
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
import Menu from "../../components/zoncore/Menu";

const gluten = Gluten({
  subsets: ["latin"],
});

export const themeAtom = atomWithStorage<string>("currentTheme", "dark");

const colors = {
  red: "bg-red-500 hover:bg-red-700 disabled:bg-red-500/60",
  green: "bg-green-500 hover:bg-green-700 disabled:bg-green-500/60",
  blue: "bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500/60",
  orange: "bg-orange-500 hover:bg-orange-700 disabled:bg-orange-500/60",
  yellow: "bg-yellow-500 hover:bg-yellow-700 disabled:bg-yellow-500/60",
};

const Board = () => {
  const {
    handleCellClick,
    board,
    wilds,
    toggleWilds,
    toggleMaxAvailable,
    toggleMaxColor,
    totals,
    score,
  } = useZoncore();
  return (
    <TransformWrapper
      disablePadding={true}
      centerOnInit={true}
      minScale={0.6}
      maxScale={3}
      doubleClick={{ disabled: true }}
    >
      <Menu />
      <TransformComponent
        wrapperClass="bg-base-300 p-10 "
        wrapperStyle={{ height: "100vh", width: "100%" }}
        contentClass="bg-transparent p-5 "
      >
        <div
          className={clsx(
            `font-sans ${gluten.className}`,
            "flex flex-col justify-center gap-2 ",
          )}
        >
          <div className="flex w-full flex-row gap-2">
            <div className="flex flex-1 flex-row justify-center gap-1 rounded-btn">
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
                        <SparklesIcon className="swap-on h-9 w-9 fill-primary stroke-primary-content" />
                        <StarIcon
                          className={twMerge(
                            "swap-off h-9 w-9",
                            cell.clickable
                              ? "fill-neutral-100 stroke-neutral-300"
                              : "fill-neutral-content/40",
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
                        <CheckCircleIcon className="swap-on h-9 w-9 fill-secondary stroke-secondary-content" />
                        <MinusCircleIcon
                          className={twMerge(
                            "swap-off h-9 w-9",
                            cell.clickable
                              ? "fill-neutral-100 stroke-neutral-300"
                              : "fill-neutral-content/40",
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
                    boardKey={key}
                    className={"bg-base-content"}
                  />
                </div>
              ))}
            </div>
            <div className="flex w-52 flex-col gap-1">
              <ColorsScore totals={totals} toggleMaxColor={toggleMaxColor} />
              <Score score={score} />
            </div>
          </div>
          <WildSelector wilds={wilds} toggleWilds={toggleWilds} />
          <div className="flex h-5 w-full justify-center ">
            <span id="columnConfetti" />
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

const Zoncore = () => {
  const theme = useAtomValue(themeAtom);
  return (
    <main id="zoncoreMain" data-theme={theme}>
      <Board />
    </main>
  );
};
export default Zoncore;
