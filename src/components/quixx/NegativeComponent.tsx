import { Controller } from "react-hook-form";

const Checkbox = ({
  control,
  name,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          {...field}
          onChange={(e) => field.onChange(e.target.checked)}
          type="checkbox"
          checked={field.value}
          className="checkbox-secondary checkbox checkbox-lg"
        />
      )}
    />
  );
};

const NegativeComponent = ({
  control,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}) => {
  return (
    <div className="flex h-full flex-row items-center gap-2 rounded-box border-2 border-secondary p-2">
      <Checkbox control={control} name={"negatives.first"} />
      <Checkbox control={control} name={"negatives.second"} />
      <Checkbox control={control} name={"negatives.third"} />
      <Checkbox control={control} name={"negatives.fourth"} />
      <p className="text-2xl font-semibold text-secondary">-5</p>
    </div>
  );
};

export default NegativeComponent;
