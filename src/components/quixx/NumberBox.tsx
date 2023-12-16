import clsx from "clsx";
import { LockOpenIcon } from "@heroicons/react/24/solid";
import { type ReactNode } from "react";

const backgrounds = {
  red: "bg-red-600",
  yellow: "bg-yellow-600",
  green: "bg-green-600",
  blue: "bg-blue-600",
};

const BlueBox = ({
  onClick,
  number,
  icon,
  color,
  selected,
  disabled,
}: {
  onClick?: React.MouseEventHandler;
  number?: string | number;
  icon?: ReactNode;
  color: string;
  selected: boolean;
  disabled: boolean;
}) => {
  return (
    <div
      className={clsx(
        "aspect-square w-full rounded-md p-2",
        disabled
          ? "bg-slate-600"
          : backgrounds[color as keyof typeof backgrounds],
      )}
    >
      <div
        className={clsx(
          "btn btn-ghost h-full w-full bg-white/20 p-2 text-center hover:shadow-2xl",
          { "pointer-events-none": disabled },
        )}
        onClick={onClick}
      >
        {selected ? (
          icon
        ) : number === "lock" ? (
          <LockOpenIcon className="stroke-base-100/10 text-secondary" />
        ) : (
          <p className="text-4xl text-black">{number}</p>
        )}
      </div>
    </div>
  );
};

export default BlueBox;
