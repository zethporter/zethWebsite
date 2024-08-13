import clsx from "clsx";

const colors = [
  [
    "green",
    "bg-green-500 text-green-800 hover:bg-green-700 disabled:bg-green-500/60",
  ],
  [
    "yellow",
    "bg-yellow-500 text-yellow-800 hover:bg-yellow-700 disabled:bg-yellow-500/60",
  ],
  [
    "blue",
    "bg-blue-500 text-blue-800 hover:bg-blue-700 disabled:bg-blue-500/60",
  ],
  ["red", "bg-red-500 text-red-800 hover:bg-red-700 disabled:bg-red-500/60"],
  [
    "orange",
    "bg-orange-500 text-orange-800 hover:bg-orange-700 disabled:bg-orange-500/60",
  ],
];

const ColorsScore = () => {
  return (
    <div className="flex flex-col gap-1">
      {colors.map((color, key) => (
        <div key={key} className="flex flex-row gap-1">
          <button
            type="button"
            className={clsx(
              "btn btn-square pt-1 text-center text-4xl font-extrabold",
              color[1],
            )}
          >
            5
          </button>
          <button
            type="button"
            className={clsx(
              "btn btn-square pointer-events-none pt-1 text-center text-4xl font-extrabold",
              color[1],
            )}
          >
            3
          </button>
        </div>
      ))}
    </div>
  );
};

export default ColorsScore;
