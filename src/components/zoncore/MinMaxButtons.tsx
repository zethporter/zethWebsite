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
          isMax ? "cursor-pointer" : "pointer-events-none",
          "btn btn-square w-full pt-1 text-4xl font-semibold text-base-300",
          completed && isMax && maxAvailable
            ? "bg-gradient-to-br from-primary to-secondary hover:from-accent hover:to-secondary"
            : completed && !isMax && !maxAvailable
              ? "bg-gradient-to-br from-primary to-secondary hover:from-accent hover:to-secondary"
              : backgroundColor,
          isMax && !maxAvailable ? "bg-base-100" : null,
        ),
      )}
    >
      {children}
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
