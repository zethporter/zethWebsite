import { type wildsObject } from "../../components/zoncore/defaultGame";

const WildSelector = ({
  wilds,
  setWilds,
}: {
  wilds: wildsObject;
  setWilds: (e: wildsObject) => void;
}) => {
  return (
    <div className="flex flex-row justify-center gap-2 rounded-box bg-transparent p-4">
      <div className="btn-square flex items-center justify-center rounded-btn bg-black pt-1 text-3xl font-extrabold text-white">
        ?
      </div>
      <span className="self-center text-4xl font-extrabold">/</span>
      <div className="btn-square flex items-center justify-center rounded-btn bg-white pt-1 text-3xl font-extrabold text-black">
        X
      </div>
      <span className="self-center text-4xl font-extrabold">=</span>
      {[...Array(wilds.selected)].map((_, i) => (
        <button
          key={i}
          disabled={wilds.selected !== i + 1}
          className="btn btn-square btn-accent disabled:bg-accent disabled:text-primary-content"
          onClick={() =>
            setWilds({
              available: wilds.available + 1,
              selected: wilds.selected - 1,
            })
          }
        >
          <span className="h-5/6 w-5/6 rounded-full bg-white/40 pt-1 text-center text-4xl font-extrabold">
            X
          </span>
        </button>
      ))}
      {[...Array(wilds.available)].map((_, i) => (
        <button
          key={i}
          disabled={i !== 0}
          className="btn btn-square btn-primary disabled:bg-primary disabled:text-primary-content"
          onClick={() =>
            setWilds({
              available: wilds.available - 1,
              selected: wilds.selected + 1,
            })
          }
        >
          <span className="h-5/6 w-5/6 rounded-full bg-white/40 pt-1 text-center text-4xl font-extrabold">
            !
          </span>
        </button>
      ))}
    </div>
  );
};

export default WildSelector;
