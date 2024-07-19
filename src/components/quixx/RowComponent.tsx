import { useAtom } from "jotai";
import clsx from "clsx";
import NumberComponent from "./NumberComponent";
import { type rowType } from "../../pages/zicks";
import { LockOpenIcon, LockClosedIcon } from "@heroicons/react/24/solid";

import { rowClosedAtom } from "../../pages/zicks";

const RowComponent = ({
  rowData,
  control,
  rowKey,
}: {
  rowData: rowType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  rowKey: string;
}) => {
  const [rowClosed, setRowClosed] = useAtom(rowClosedAtom);
  return (
    <div className="mx-auto flex flex-row items-center gap-2">
      {Object.keys(rowData).map((blockName, i) => (
        <NumberComponent
          key={i}
          data={rowData[blockName as keyof typeof rowData]}
          rowKey={rowKey}
          blockKey={blockName}
          control={control}
        />
      ))}
      {/* <div
        className="btn text-xl text-accent"
        onClick={() =>
          setRowClosed({
            ...rowClosed,
            [rowKey]: !rowClosed[rowKey as keyof typeof rowClosed],
          })
        }
      >
        test
      </div> */}
      <label
        className={clsx("text-md btn btn-ghost swap swap-rotate text-accent", {
          "swap-active": rowClosed[rowKey as keyof typeof rowClosed],
        })}
        onClick={() =>
          setRowClosed({
            ...rowClosed,
            [rowKey]: !rowClosed[rowKey as keyof typeof rowClosed],
          })
        }
      >
        <svg className="swap-on h-8 w-8">
          <LockClosedIcon />
        </svg>
        <svg className="swap-off h-8 w-8">
          <LockOpenIcon />
        </svg>
      </label>
    </div>
  );
};

export default RowComponent;
