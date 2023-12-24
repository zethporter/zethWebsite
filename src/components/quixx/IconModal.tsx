import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
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

import { markerAtom } from "../../pages/quixx";

const colors = [
  "cyan-500",
  "purple-500",
  "purple-500",
  "amber-500",
  "primary",
  "secondary",
  "accent",
  "info",
  "success",
  "warning",
  "error",
];

// setCookie('theme', newTheme, { expires: new Date(Date.now() + (360 * 24 * 3600000)) })

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

type radioType = {
  color: string;
  value: string;
};

const Modal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: VoidFunction;
}) => {
  const [markerSettings, setMarkerSettings] = useAtom(markerAtom);
  const { control, handleSubmit, setValue, watch } = useForm({
    values: markerSettings,
  });

  const currentValues = watch();

  const RadioGroup = ({
    // control,
    // name,
    items,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    name: string;
    items: radioType[];
  }) => {
    return (
      <div className="flex flex-row flex-wrap gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className={clsx(
              `btn btn-square border-2 border-${item.color} rounded-lg bg-transparent`,
            )}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className={clsx({ "modal-open": open }, "modal")}>
      <form
        onSubmit={handleSubmit((data) => setMarkerSettings(data))}
        className={clsx(
          "modal-box flex max-w-6xl flex-row flex-wrap justify-around gap-2 overflow-auto bg-base-100",
        )}
      >
        {Object.keys(icons).map((icon) => (
          <div key={icon} className="btn btn-square">
            <svg
              className={clsx(
                "h-6 w-6 border-2 hover:bg-base-100/20",
                icon === currentValues.icon
                  ? "border-primary hover:border-primary"
                  : "border-transparent hover:border-transparent",
                `stroke-${currentValues.stroke} text-${currentValues.fill}`,
              )}
              onClick={() => setValue("icon", icon)}
            >
              {icons[icon as keyof typeof icons]}
            </svg>
          </div>
        ))}
        <RadioGroup
          control={control}
          name="fill"
          items={colors.map((color) => ({ color: color, value: color }))}
        />
        <div onClick={handleClose} className="btn-small btn btn-primary w-fit">
          close
        </div>
      </form>
    </div>
  );
};

export default Modal;
