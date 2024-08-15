import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { toggleMaxAvailable } from "./utils";
import { type boardObject } from "./defaultGame";

const SelectedWrapper = ({
  // points,
  // maxAvailable,
  // colComplete,
  children,
}: {
  // points: number;
  // maxAvailable: boolean;
  // colComplete: boolean;
  children: React.JSX.Element | number | string;
}) => {
  return (
    <div className="relative z-10 flex w-full cursor-pointer items-center overflow-hidden rounded-xl border border-transparent p-[2px]">
      <div className="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"></div>
      <div className="base-300 relative z-20 flex w-full rounded-[0.60rem] p-0">
        {children}
      </div>
    </div>
  );
};

const MinMaxButtons = ({
  board,
  col,
  minPoints,
  maxPoints,
  maxAvailable,
  colCompleted,
  setBoard,
}: {
  board: boardObject;
  col: string;
  minPoints: number;
  maxPoints: number;
  maxAvailable: boolean;
  colCompleted: boolean;
  setBoard: (e: boardObject) => void;
}) => {
  // const { reward } = useReward("columnConfetti", "confetti");

  return (
    <>
      <SelectedWrapper>
        <div className="flex h-full w-full items-center justify-center rounded-btn bg-base-300">
          {minPoints}
        </div>
      </SelectedWrapper>
      <SelectedWrapper>{maxPoints}</SelectedWrapper>
    </>
  );
  // return;
  // !disabled ? (
  //   <button
  //     // disabled={disabled}
  //     type="button"
  //     onClick={onClick}
  //     onClickCapture={reward}
  //     className={twMerge(
  //       clsx(
  //         "btn btn-square pt-1 align-middle text-4xl",
  //         className,
  //         disabled
  //           ? "bg-base-100 text-base-content/30 hover:text-base-content/90"
  //           : "bg-base-content text-base-300 hover:bg-base-content/70",
  //       ),
  //     )}
  //   >
  //     {points}
  //   </button>
  // ) : (

  // );
};

export default MinMaxButtons;
