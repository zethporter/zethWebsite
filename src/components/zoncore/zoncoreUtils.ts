import {
  type boardObject,
  defaultGame,
  boardZod,
  type wildsObject,
  defaultWilds,
  wildsZod,
  type totalsObject,
  totals,
  defaultTotals,
  type availableColors,
  type scoreObject,
  defaultScore,
  scoreZod,
} from "./defaultGame";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  handleCellClick,
  resetGame,
  toggleMaxColorAvailable,
  toggleMaxAvailable,
  bonusCalc,
  toggleWilds,
} from "../../components/zoncore/utils";

const currentGameAtom = atomWithStorage<boardObject>(
  "currentZoncoreGame",
  boardZod.parse(defaultGame),
);
const currentWilds = atomWithStorage<wildsObject>(
  "currentZoncoreWilds",
  wildsZod.parse(defaultWilds),
);
const currentTotals = atomWithStorage<totalsObject>(
  "currentZoncoreTotals",
  totals.parse(defaultTotals),
);

const currentScore = atomWithStorage<scoreObject>(
  "currentZoncoreScore",
  scoreZod.parse(defaultScore),
);

export const useZoncore = () => {
  const [board, setBoard] = useAtom(currentGameAtom);
  const [wilds, _setWilds] = useAtom(currentWilds);
  const [totals, _setTotals] = useAtom(currentTotals);
  const [score, setScore] = useAtom(currentScore);

  const setTotals = (_totals: totalsObject) => {
    const tempBonus = bonusCalc(_totals);
    const _score = {
      bonus: tempBonus,
      aThruO: _totals.aThruO,
      wilds: wilds.available,
      stars: _totals.star,
      total: tempBonus + _totals.aThruO + wilds.available - _totals.star,
    };

    setScore(_score);
    _setTotals(_totals);
  };

  const setWilds = (_wilds: wildsObject) => {
    const _score = {
      bonus: score.bonus,
      aThruO: score.aThruO,
      wilds: _wilds.available,
      stars: score.stars,
      total: score.bonus + score.aThruO + _wilds.available - score.stars,
    };

    setScore(_score);
    _setWilds(_wilds);
  };

  const hookReset = () => resetGame(setBoard, setWilds, setTotals);
  const hookHCC = (key: [string, number]) =>
    handleCellClick(board, key, setBoard, totals, setTotals);
  const toggleMaxColor = (c: availableColors) =>
    toggleMaxColorAvailable(totals, c, setTotals);
  const _toggleMaxAvailable = (e: string) =>
    toggleMaxAvailable(board, e, setBoard, totals, setTotals);
  const _toggleWilds = (e: wildsObject, isUsed: boolean) =>
    toggleWilds(e, setWilds, isUsed);

  return {
    resetGame: hookReset,
    handleCellClick: hookHCC,
    board,
    wilds,
    totals,
    toggleWilds: _toggleWilds,
    toggleMaxColor,
    toggleMaxAvailable: _toggleMaxAvailable,
    score,
  };
};
