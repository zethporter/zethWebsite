import { useEffect, useState } from "react";
import clsx from "clsx";
import { Controller } from "react-hook-form";
import { useAtom, useAtomValue } from "jotai";
import { rowCountsAtom, type blockType } from "../../pages/zicks";
import { useWatch } from "react-hook-form";
import { colors, icons } from "./IconModal";

import { rowClosedAtom } from "../../pages/zicks";
import { markerAtom } from "../../pages/zicks";

const backgrounds = {
  red: "bg-red-600",
  yellow: "bg-yellow-500",
  green: "bg-green-600",
  blue: "bg-blue-600",
};

const NumberComponent = ({
  data,
  control,
  rowKey,
  blockKey,
}: {
  data: blockType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  rowKey: string;
  blockKey: string;
}) => {
  const [disableCheckers, setDisableCheckers] = useState<string[]>([]);
  const [rowCounts, setRowCounts] = useAtom(rowCountsAtom);
  const rowClosed = useAtomValue(rowClosedAtom);
  const markerSettings = useAtomValue(markerAtom);
  const rowValues = useWatch({
    control,
    name: rowKey,
  });

  useEffect(() => {
    const newRowCount = Object.keys(rowValues).filter(
      (key) => rowValues[key].selected,
    );
    const checkers = Object.keys(rowValues).filter(
      (key) => rowValues[key].id > data.id && rowValues[key].selected,
    );

    if (checkers !== disableCheckers) {
      setDisableCheckers(checkers);
    }

    if (rowCounts[rowKey as keyof typeof rowCounts] !== newRowCount.length) {
      setRowCounts({
        ...rowCounts,
        [rowKey as keyof typeof rowCounts]: newRowCount.length,
      });
    }
  }, [rowValues]);

  return (
    <Controller
      control={control}
      name={`${rowKey}.${blockKey}.selected`}
      defaultValue={false}
      render={({ field }) => {
        const disabled = rowClosed[rowKey as keyof typeof rowClosed]
          ? true
          : data.id > 10
            ? rowCounts[rowKey as keyof typeof rowCounts] < 5
            : disableCheckers.length > 0 && !field.value;
        return (
          <div
            className={clsx(
              "rounded-xl p-2",
              backgrounds[data.color as keyof typeof backgrounds],
            )}
          >
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                if (field.value == undefined) {
                  field.onChange(true);
                } else {
                  field.onChange(!field.value);
                }
              }}
              className={clsx(
                "btn-xl btn btn-square border-none bg-base-300/20 text-2xl outline-none",
                "swap swap-flip",
                field.value ? "swap-active" : null,
              )}
            >
              <svg
                className={clsx(
                  "swap-on h-8 w-8 hover:bg-base-100/20",
                  colors[markerSettings.fill as keyof typeof colors].text,
                  colors[markerSettings.stroke as keyof typeof colors].stroke,
                )}
              >
                {icons[markerSettings.icon as keyof typeof icons]}
              </svg>
              <span className="swap-off">{data.num}</span>
            </button>
          </div>
        );
      }}
    />
  );
};

export default NumberComponent;
