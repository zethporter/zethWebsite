import { z } from "zod";
import MinMaxButtons from "./MinMaxButtons";
import {
  availableColors,
  type totalsObject,
  z_availableColors,
} from "./defaultGame";

const colors = z.array(z.tuple([z_availableColors, z.string()])).parse([
  [
    availableColors.green,
    "bg-green-500 text-green-800 hover:bg-green-700 disabled:bg-green-500/60",
  ],
  [
    availableColors.yellow,
    "bg-yellow-500 text-yellow-800 hover:bg-yellow-700 disabled:bg-yellow-500/60",
  ],
  [
    availableColors.blue,
    "bg-blue-500 text-blue-800 hover:bg-blue-700 disabled:bg-blue-500/60",
  ],
  [
    availableColors.red,
    "bg-red-500 text-red-800 hover:bg-red-700 disabled:bg-red-500/60",
  ],
  [
    availableColors.orange,
    "bg-orange-500 text-orange-800 hover:bg-orange-700 disabled:bg-orange-500/60",
  ],
]);

const ColorsScore = ({
  totals,
  toggleMaxColor,
}: {
  totals: totalsObject;
  toggleMaxColor: (c: availableColors) => void;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {colors.map(([color, className], key) => (
        <div key={key} className="flex flex-row gap-1">
          <MinMaxButtons
            minPoints={3}
            maxPoints={5}
            maxAvailable={totals.available[color]}
            completed={totals[color] === 21}
            maxFunc={() => toggleMaxColor(color)}
            className={className}
          />
        </div>
      ))}
    </div>
  );
};

export default ColorsScore;
