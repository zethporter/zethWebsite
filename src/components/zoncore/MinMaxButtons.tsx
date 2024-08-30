import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const SelectedWrapper = ({
  isMax,
  backgroundColor,
  maxAvailable,
  completed,
  children,
  onClick,
  boardKey,
}: {
  isMax?: boolean | undefined;
  backgroundColor: string;
  maxAvailable: boolean;
  completed: boolean;
  children: React.JSX.Element | number | string;
  onClick?: () => void;
  boardKey?: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        clsx(
          isMax ? "cursor-pointer" : "pointer-events-none",
          "btn btn-square w-full pt-1 text-4xl font-semibold",
          completed && isMax && maxAvailable
            ? "bg-gradient-to-br from-primary to-secondary hover:from-accent hover:to-secondary"
            : completed && !isMax && !maxAvailable
              ? "bg-gradient-to-br from-primary to-secondary hover:from-accent hover:to-secondary"
              : backgroundColor,
          isMax && !maxAvailable ? "bg-base-100" : null,
          boardKey === "h" ? "text-red-700" : "text-base-300",
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
  boardKey,
}: {
  minPoints: number;
  maxPoints: number;
  maxAvailable: boolean;
  completed: boolean;
  maxFunc: () => void;
  className: string;
  boardKey?: string;
}) => {
  // const { reward } = useReward("columnConfetti", "confetti");

  return (
    <>
      <SelectedWrapper
        isMax
        completed={completed}
        maxAvailable={maxAvailable}
        backgroundColor={className}
        boardKey={boardKey}
        onClick={maxFunc}
      >
        {maxPoints}
      </SelectedWrapper>
      <SelectedWrapper
        completed={completed}
        maxAvailable={maxAvailable}
        backgroundColor={className}
        boardKey={boardKey}
      >
        {minPoints}
      </SelectedWrapper>
    </>
  );
};

export default MinMaxButtons;
