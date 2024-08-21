import { StarIcon } from "@heroicons/react/24/solid";
import { type scoreObject } from "./defaultGame";

const Score = ({ score }: { score: scoreObject }) => {
  return (
    <div className="grid grid-cols-2 items-center gap-1">
      <p className="p-1 text-right text-2xl font-semibold">
        <span className="text-green-600">B</span>
        <span className="text-yellow-600">O</span>
        <span className="text-blue-600">N</span>
        <span className="text-red-600">U</span>
        <span className="text-orange-600">S</span>
      </p>
      <div className="flex justify-between rounded-btn bg-base-content px-3 py-1">
        <span className="text-2xl font-bold text-base-300">=</span>
        <span className="text-2xl font-semibold text-base-300">
          {score.bonus}
        </span>
      </div>
      <p className="p-1 text-right text-xl font-semibold">A-O</p>
      <div className="flex justify-between rounded-btn bg-base-content px-3 py-1">
        <span className="text-2xl font-bold text-green-600">+</span>
        <span className="text-2xl font-semibold text-base-300">
          {score.aThruO}
        </span>
      </div>
      <p className="p-1 text-right text-2xl font-semibold">! (+1)</p>
      <div className="flex justify-between rounded-btn bg-base-content px-3 py-1">
        <span className="text-2xl font-bold text-green-600">+</span>
        <span className="text-2xl font-semibold text-base-300">
          {score.wilds}
        </span>
      </div>
      <div className="flex items-center justify-end gap-2 p-1 text-right text-2xl font-semibold">
        <span>
          <StarIcon className="h-6 w-6" />
        </span>
        <span>(-2)</span>
      </div>
      <div className="flex justify-between rounded-btn bg-base-content px-3 py-1">
        <span className="text-2xl font-bold text-red-600">-</span>
        <span className="text-2xl font-semibold text-base-300">
          {score.stars}
        </span>
      </div>
      <div className="divider col-span-full my-0"></div>
      <p className="p-1 text-right text-2xl font-semibold">Total</p>
      <div className="flex justify-between rounded-btn bg-base-content px-3 py-1">
        <span className="text-2xl font-bold text-base-300">=</span>
        <span className="text-2xl font-semibold text-base-300">
          {score.total}
        </span>
      </div>
    </div>
  );
};

export default Score;
