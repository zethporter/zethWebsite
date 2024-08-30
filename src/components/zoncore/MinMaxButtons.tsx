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
  backgroundColor: string | string[];
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
  className: string | string[];
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
};

export default MinMaxButtons;
