import { RocketLaunchIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Component } from "react";

const colors = {
  red: {
    classes:
      "bg-red-300 w-full h-full cursor-pointer text-center p-2 rounded-xl hover:ring-3 hover:ring-red-800 hover:bg-red-200",
    outer: "w-20 col-span-1 p-2 rounded bg-red-600",
  },
  yellow: {
    classes:
      "bg-yellow-300 h-full cursor-pointer text-center p-2 rounded-xl hover:ring-3 hover:ring-yellow-800 hover:bg-yellow-200",
    outer: "w-20 col-span-1 p-2 rounded bg-yellow-600",
  },
  green: {
    classes:
      "bg-green-300 h-full cursor-pointer text-center p-2 rounded-xl hover:ring-3 hover:ring-green-800 hover:bg-green-200",
    outer: "w-20 col-span-1 p-2 rounded bg-green-600",
  },
  blue: {
    classes:
      "bg-blue-300 h-full cursor-pointer text-center p-2 rounded-xl hover:ring-3 hover:ring-blue-800 hover:bg-blue-200",
    outer: "w-20 col-span-1 p-2 rounded bg-blue-600",
  },
  disabled: {
    classes:
      "bg-slate-300 h-full cursor-pointer text-center p-2 rounded-xl hover:ring-3 hover:ring-slate-800 hover:bg-slate-200",
    outer: "w-20 col-span-1 p-2 rounded bg-slate-600",
  },
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
  number?: any;
  icon?: any;
  color: string;
  selected: boolean;
  disabled: boolean;
}) => {
  let innerClass = "";
  let outerClass = "";
  switch (color) {
    case "red":
      innerClass = colors.red.classes;
      outerClass = colors.red.outer;
      break;
    case "yellow":
      innerClass = colors.yellow.classes;
      outerClass = colors.yellow.outer;
      break;
    case "green":
      innerClass = colors.green.classes;
      outerClass = colors.green.outer;
      break;
    case "blue":
      innerClass = colors.blue.classes;
      outerClass = colors.blue.outer;
      break;
  }
  if (disabled) {
    return (
      <div className={colors.disabled.outer}>
        <div className={colors.disabled.classes} onClick={onClick}>
          <p className="m-2 text-4xl">{number}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={outerClass}>
        <div className={innerClass} onClick={onClick}>
          {selected ? icon : <p className="m-2 text-4xl">{number}</p>}
        </div>
      </div>
    );
  }
};

export default BlueBox;
