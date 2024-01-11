import { Fragment, useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
// import { z } from "zod";

type pinochleRow = {
  themMeld: number | null;
  themTricks: number | null;
  bid: string | null;
  bidAmount: number | null;
  usMeld: number | null;
  usTricks: number | null;
};

type TScore = {
  them: number;
  us: number;
};

// const pinochleAtom = atom([
//   {
//     themMeld: null,
//     themTricks: null,
//     bid: null,
//     usMeld: null,
//     usTricks: null,
//   },
// ]);

const Pinochle = () => {
  const [score, setScore] = useState<TScore>({
    them: 0,
    us: 0,
  });
  const { control, register, watch } = useForm();
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "game", // unique name for your Field Array
  });

  const game = watch("game");

  useEffect(() => {
    game &&
      game.forEach((round: pinochleRow) => {
        const usMeld = round.usMeld ?? 0;
        const usTricks = round.usTricks ?? 0;
        const themMeld = round.themMeld ?? 0;
        const themTricks = round.themTricks ?? 0;
        const bidAmount = round.bidAmount ?? 0;
        if (round.bid === "us") {
          if (usMeld + usTricks < bidAmount) {
            setScore({ them: themMeld + themTricks, us: score.us - bidAmount });
          } else {
            setScore({
              them: score.them + themMeld + themTricks,
              us: score.us + usMeld + usTricks,
            });
          }
        }
        if (round.bid === "them") {
          if (themMeld + themTricks < bidAmount) {
            setScore({
              them: score.them - bidAmount,
              us: score.us + usMeld + usTricks,
            });
          } else {
            setScore({
              them: score.them + themMeld + themTricks,
              us: score.us + usMeld + usTricks,
            });
          }
        }
      });
  }, [game]);

  console.log("Watch", game);

  return (
    <main className="flex min-h-screen w-full flex-col gap-2 bg-gradient-to-b from-base-100 to-base-300 p-4">
      <div className="container mx-auto grid h-full min-w-96 grid-cols-5 content-start gap-x-2 gap-y-4 overflow-y-auto rounded-box p-2">
        <h3 className="fond-bold text-right text-3xl text-primary">
          {score.them}
        </h3>
        <h1 className="col-span-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-4xl font-bold text-transparent">
          Pinochle
        </h1>
        <h3 className="fond-bold text-3xl text-secondary">{score.us}</h3>
        <h2 className="col-span-2 rounded-xl bg-primary p-1 text-center text-xl font-bold text-primary-content">
          Them
        </h2>
        <h2 className="rounded-xl bg-accent p-1 text-center text-xl font-bold text-accent-content">
          Bid
        </h2>
        <h2 className="col-span-2 rounded-xl bg-secondary p-1 text-center text-xl font-bold text-secondary-content">
          Us
        </h2>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <input
              type="tel"
              placeholder="Meld"
              className="input input-bordered input-primary input-sm w-full max-w-xs"
              {...register(`game.${index}.themMeld`, {
                valueAsNumber: true,
              })}
            />
            <input
              type="tel"
              placeholder="Tricks"
              className="input input-bordered input-primary input-sm w-full max-w-xs"
              {...register(`game.${index}.themTricks`, {
                valueAsNumber: true,
              })}
            />
            <div className="flex flex-row gap-2 overflow-y-auto">
              <input
                type="radio"
                className="radio-primary radio md:radio-lg"
                {...register(`game.${index}.bid`)}
                value="them"
              />
              <input
                type="tel"
                placeholder="Bid"
                className="input input-bordered input-accent input-sm w-full min-w-12 max-w-xs flex-1 text-center"
                {...register(`game.${index}.bidAmount`, {
                  valueAsNumber: true,
                })}
              />
              <input
                type="radio"
                className="radio-secondary radio md:radio-lg"
                {...register(`game.${index}.bid`)}
                value="us"
              />
            </div>
            <input
              type="tel"
              placeholder="Meld"
              className="input input-bordered input-secondary input-sm w-full max-w-xs text-right"
              {...register(`game.${index}.usMeld`, {
                valueAsNumber: true,
              })}
            />
            <input
              type="tel"
              placeholder="Tricks"
              className="input input-bordered input-secondary input-sm w-full max-w-xs text-right"
              {...register(`game.${index}.usTricks`, {
                valueAsNumber: true,
              })}
            />
          </Fragment>
        ))}
        <div className="col-span-full scale-95 rounded-xl bg-gradient-to-r from-primary via-accent to-secondary">
          <div
            className="btn glass btn-sm btn-block text-accent-content"
            onClick={append}
          >
            Add Hand
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pinochle;
