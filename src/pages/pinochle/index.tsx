import { atom, useAtom } from "jotai";

type pinochleRow = {
  themMeld: number | null;
  themTricks: number | null;
  bid: number | null;
  usMeld: number | null;
  usTricks: number | null;
};

const pinochleAtom = atom([
  {
    themMeld: null,
    themTricks: null,
    bid: null,
    usMeld: null,
    usTricks: null,
  },
]);

const Pinochle = () => {
  const [rows, setRows] = useAtom(pinochleAtom);

  return (
    <main className="flex h-screen w-full flex-col gap-2 bg-gradient-to-b from-base-100 to-base-300 p-4">
      <div className="flex w-full justify-center">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-4xl font-bold text-transparent">
          Pinochle
        </h1>
      </div>
      <div className="container mx-auto grid h-full grid-cols-5 content-start gap-2 rounded-box p-2">
        <div className="col-span-2 rounded-xl bg-primary p-1 text-center text-xl font-bold text-primary-content">
          Them
        </div>
        <div className="rounded-xl bg-accent p-1 text-center text-xl font-bold text-accent-content">
          Bid
        </div>
        <div className="col-span-2 rounded-xl bg-secondary p-1 text-center text-xl font-bold text-secondary-content">
          Us
        </div>
        {rows.map((row: pinochleRow) => (
          <>
            <input
              value={row.themMeld}
              type="text"
              placeholder="Meld"
              className="input input-bordered input-primary input-sm w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Tricks"
              className="input input-bordered input-primary input-sm w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Bid"
              className="input input-bordered input-accent input-sm w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Meld"
              className="input input-bordered input-secondary input-sm w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Tricks"
              className="input input-bordered input-secondary input-sm w-full max-w-xs"
            />
          </>
        ))}
      </div>
    </main>
  );
};

export default Pinochle;
