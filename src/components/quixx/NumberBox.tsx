const colors = {
  red: {
    classes:
      "bg-red-300 cursor-pointer p-1 rounded-xl hover:ring-3 hover:ring-red-800 hover:bg-red-200 hover:animate-pulse",
    outer: "w-20 col-span-1 p-2 rounded bg-red-600",
  },
  yellow: {
    classes:
      "bg-yellow-300 cursor-pointer p-1 rounded-xl hover:ring-3 hover:ring-yellow-800 hover:bg-yellow-200 hover:animate-pulse",
    outer: "w-20 col-span-1 p-2 rounded bg-yellow-600",
  },
  green: {
    classes:
      "bg-green-300 cursor-pointer p-1 rounded-xl hover:ring-3 hover:ring-green-800 hover:bg-green-200 hover:animate-pulse",
    outer: "w-20 col-span-1 p-2 rounded bg-green-600",
  },
  blue: {
    classes:
      "bg-blue-300 cursor-pointer p-1 rounded-xl hover:ring-3 hover:ring-blue-800 hover:bg-blue-200 hover:animate-pulse",
    outer: "w-20 col-span-1 p-2 rounded bg-blue-600",
  },
  disabled: {
    classes:
      "bg-slate-300 cursor-pointer p-1 rounded-xl hover:ring-3 hover:ring-slate-800 hover:bg-slate-200",
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
  const innerClass = colors[color as keyof typeof colors].classes;
  const outerClass = colors[color as keyof typeof colors].outer;

  if (disabled) {
    return (
      <div className={colors.disabled.outer}>
        <div className={colors.disabled.classes} onClick={onClick}>
          <p className="m-1 p-2 text-center text-4xl sm:m-0 sm:text-4xl">
            {number}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={outerClass}>
        <div className={innerClass} onClick={onClick}>
          {selected ? (
            icon
          ) : (
            <p className="m-1 p-2 text-center text-4xl text-black sm:m-0">
              {number}
            </p>
          )}
        </div>
      </div>
    );
  }
};

export default BlueBox;
