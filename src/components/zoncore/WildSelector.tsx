
import { type wildsObject } from "../../components/zoncore/defaultGame";

const WildSelector = ({
  wilds,
  setWilds,
}: {
  wilds: wildsObject;
  setWilds: (e: wildsObject) => void;
}) => {
  return (
    <div className="p-4 w-full rounded-box bg-transparent flex flex-row gap-2 justify-center">
      <div className='btn-square pt-1 flex justify-center items-center rounded-btn bg-black text-white text-3xl font-extrabold'>?</div>
      <span className='text-4xl font-extrabold self-center'>/</span>
      <div className='btn-square flex pt-1 justify-center items-center rounded-btn bg-white text-black text-3xl font-extrabold'>X</div>
      <span className='text-4xl font-extrabold self-center'>=</span>
      {
        [...Array(wilds.selected)].map((_, i) => (
          <button
            key={i}
            disabled={wilds.selected !== i + 1}
            className="btn btn-square btn-accent disabled:bg-accent disabled:text-primary-content"
            onClick={() => setWilds({ available: wilds.available + 1, selected: wilds.selected - 1 })}
          >
            <span className='rounded-full w-5/6 h-5/6 text-center pt-1 bg-white/40 text-4xl font-extrabold'>X</span>
          </button>
        ))
      }
      {
        [...Array(wilds.available)].map((_, i) => (
          <button
            key={i}
            disabled={i !== 0}
            className="btn btn-square btn-primary disabled:bg-primary disabled:text-primary-content"
            onClick={() => setWilds({ available: wilds.available - 1, selected: wilds.selected + 1 })}
          >
            <span className='rounded-full w-5/6 h-5/6 text-center pt-1 bg-white/40 text-4xl font-extrabold'>!</span>
          </button>
        ))
      }
    </div>
  );
};

export default WildSelector;
