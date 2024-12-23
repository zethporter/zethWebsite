import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useSetAtom, useAtom } from "jotai";
import { games } from "./games";
import {
  RocketLaunchIcon,
  CheckIcon,
  FireIcon,
  HeartIcon,
  PaperAirplaneIcon,
  TrophyIcon,
  XCircleIcon,
  XMarkIcon,
  TruckIcon,
  StarIcon,
  CpuChipIcon,
  BugAntIcon,
  BoltIcon,
  BeakerIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

import { gameAtom, markerAtom } from "../../pages/zicks";

export const colors = {
  "cyan-500": {
    text: "text-cyan-500",
    stroke: "stroke-cyan-500",
    radio: "border-cyan-500 checked:bg-cyan-500",
  },
  "purple-500": {
    text: "text-purple-500",
    stroke: "stroke-purple-500",
    radio: "border-purple-500 checked:bg-purple-500",
  },
  "pink-500": {
    text: "text-pink-500",
    stroke: "stroke-pink-500",
    radio: "border-pink-500 checked:bg-pink-500",
  },
  "amber-500": {
    text: "text-amber-500",
    stroke: "stroke-amber-500",
    radio: "border-amber-500 checked:bg-amber-500",
  },
  primary: {
    text: "text-primary",
    stroke: "stroke-primary",
    radio: "radio-primary",
  },
  secondary: {
    text: "text-secondary",
    stroke: "stroke-secondary",
    radio: "radio-secondary",
  },
  accent: {
    text: "text-accent",
    stroke: "stroke-accent",
    radio: "radio-accent",
  },
  info: { text: "text-info", stroke: "stroke-info", radio: "radio-info" },
  success: {
    text: "text-success",
    stroke: "stroke-success",
    radio: "radio-success",
  },
  warning: {
    text: "text-warning",
    stroke: "stroke-warning",
    radio: "radio-warning",
  },
  error: { text: "text-error", stroke: "stroke-error", radio: "radio-error" },
};

export const icons = {
  RocketLaunchIcon: <RocketLaunchIcon />,
  CheckIcon: <CheckIcon />,
  FireIcon: <FireIcon />,
  HeartIcon: <HeartIcon />,
  PaperAirplaneIcon: <PaperAirplaneIcon />,
  TrophyIcon: <TrophyIcon />,
  XCircleIcon: <XCircleIcon />,
  XMarkIcon: <XMarkIcon />,
  TruckIcon: <TruckIcon />,
  StarIcon: <StarIcon />,
  CpuChipIcon: <CpuChipIcon />,
  BugAntIcon: <BugAntIcon />,
  BoltIcon: <BoltIcon />,
  BeakerIcon: <BeakerIcon />,
  AcademicCapIcon: <AcademicCapIcon />,
};

const Modal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: VoidFunction;
}) => {
  const [markerSettings, setMarkerSettings] = useAtom(markerAtom);
  const setGame = useSetAtom(gameAtom);
  const { handleSubmit, setValue, watch } = useForm({
    values: markerSettings,
  });

  const currentValues = watch();

  return (
    <div className={clsx({ "modal-open": open }, "modal")}>
      <form
        onSubmit={handleSubmit((data) => setMarkerSettings(data))}
        className={clsx(
          "modal-box flex max-w-6xl flex-col gap-6 overflow-auto bg-base-100",
        )}
      >
        <h3 className="self-center text-xl">Icon</h3>
        <div className="flex flex-row flex-wrap justify-center gap-2 px-10">
          {Object.keys(icons).map((icon) => (
            <div
              key={icon}
              onClick={() => setValue("icon", icon)}
              className={clsx(
                "btn btn-square border-2",
                icon === currentValues.icon
                  ? "border-primary hover:border-primary"
                  : "border-transparent hover:border-transparent",
              )}
            >
              <svg
                className={clsx(
                  "h-6 w-6 hover:bg-base-100/20",
                  colors[currentValues.fill as keyof typeof colors].text,
                  colors[currentValues.stroke as keyof typeof colors].stroke,
                )}
              >
                {icons[icon as keyof typeof icons]}
              </svg>
            </div>
          ))}
        </div>
        <h3 className="self-center text-xl">Fill</h3>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {Object.keys(colors).map((item, i) => (
            <input
              key={i}
              type="radio"
              name="fill"
              checked={currentValues.fill === item}
              onChange={() => setValue("fill", item)}
              className={clsx(
                "radio radio-lg",
                colors[item as keyof typeof colors].radio,
              )}
            />
          ))}
        </div>
        <h3 className="self-center text-xl">Stroke</h3>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {Object.keys(colors).map((item, i) => (
            <input
              key={i}
              type="radio"
              name="stroke"
              checked={currentValues.stroke === item}
              onChange={() => setValue("stroke", item)}
              className={clsx(
                "radio radio-lg",
                colors[item as keyof typeof colors].radio,
              )}
            />
          ))}
        </div>
        <div className="divider col-span-full">Board</div>
        <select
          onChange={(e) => {
            setGame(games[e.target.value as keyof typeof games]);
          }}
          className="select select-accent col-span-full w-full"
        >
          {Object.keys(games).map((game, i) => (
            <option key={i} value={game}>
              {game}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            setMarkerSettings(currentValues);
            handleClose();
          }}
          className="btn btn-secondary btn-block self-end"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Modal;
