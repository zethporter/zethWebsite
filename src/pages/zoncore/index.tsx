const Zoncore = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="justify-middle grid-cols-15 col-span-full grid grid-rows-7 items-stretch gap-1 rounded-btn bg-primary lg:col-span-10">
        {Array.from({ length: 105 }, (_, i) => (
          <div
            key={i}
            className="btn aspect-square rounded-btn bg-accent"
          ></div>
        ))}
      </div>
      <div className="col-span-full h-20 rounded-btn bg-primary lg:col-span-2"></div>
      <div className="col-span-full h-20 rounded-btn bg-primary"></div>
    </div>
  );
};

export default Zoncore;
