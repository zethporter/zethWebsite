import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const SelectedWrapper = ({
  isMax,
  backgroundColor,
  maxAvailable,
  completed,
  children,
  onClick,
}: {
  isMax?: boolean | undefined;
  backgroundColor: string;
  maxAvailable: boolean;
  completed: boolean;
  children: React.JSX.Element | number | string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        clsx(
          "btn btn-square relative z-10 flex w-full items-center overflow-hidden rounded-btn border border-transparent p-[4px]",
          completed && "bg-transparent from-primary hover:from-secondary",
          isMax ? "cursor-pointer" : "pointer-events-none",
        ),
      )}
    >
      <div
        className={twMerge(
          clsx(
            "absolute inset-0 h-full w-full animate-rotate rounded-full",
            completed && isMax && maxAvailable
              ? "bg-[conic-gradient(var(--tw-gradient-stops))] from-inherit"
              : completed && !isMax && !maxAvailable
                ? "bg-[conic-gradient(var(--tw-gradient-stops))] from-inherit"
                : backgroundColor,
            isMax && !maxAvailable ? "bg-base-200" : null,
          ),
        )}
      ></div>
      <div
        className={twMerge(
          clsx(
            "base-300 relative z-20 flex h-full w-full items-center justify-center rounded-[0.3rem] bg-base-content p-0 pt-1 text-4xl text-base-300",
            backgroundColor,
            isMax && !maxAvailable ? "bg-base-200" : null,
          ),
        )}
      >
        {children}
      </div>
    </button>
  );
};

const MinMaxButtons = ({
  minPoints,
  maxPoints,
  maxAvailable,
  completed,
  maxFunc,
  className,
}: {
  minPoints: number;
  maxPoints: number;
  maxAvailable: boolean;
  completed: boolean;
  maxFunc: () => void;
  className: string;
}) => {
  // const { reward } = useReward("columnConfetti", "confetti");

  return (
    <>
      <SelectedWrapper
        isMax
        completed={completed}
        maxAvailable={maxAvailable}
        backgroundColor={className}
        onClick={maxFunc}
      >
        {maxPoints}
      </SelectedWrapper>
      <SelectedWrapper
        completed={completed}
        maxAvailable={maxAvailable}
        backgroundColor={className}
      >
        {minPoints}
      </SelectedWrapper>
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
