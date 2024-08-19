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
} from "./defaultGame";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useReward } from "react-rewards";
import {
  handleCellClick,
  resetGame,
  toggleMaxColorAvailable,
  toggleMaxAvailable,
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

export const useZoncore = (rewardId: string) => {
  const [board, setBoard] = useAtom(currentGameAtom);
  const [wilds, setWilds] = useAtom(currentWilds);
  const [totals, setTotals] = useAtom(currentTotals);

  const { reward } = useReward(rewardId, "confetti");

  const hookReset = () => resetGame(setBoard, setWilds);
  const hookHCC = (key: [string, number]) =>
    handleCellClick(board, key, setBoard, totals, setTotals);
  const toggleMaxColor = (c: availableColors) =>
    toggleMaxColorAvailable(totals, c, setTotals);
  const _toggleMaxAvailable = (e: string) =>
    toggleMaxAvailable(board, e, setBoard);

  return {
    resetGame: hookReset,
    handleCellClick: hookHCC,
    board,
    wilds,
    totals,
    setWilds,
    toggleMaxColor,
    toggleMaxAvailable: _toggleMaxAvailable,
  };
};
