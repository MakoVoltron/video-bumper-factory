import { FILTER_TYPE } from "@/app/data";

const Filters = () => {
  return (
    <div className="m-2">
      <p className="text-center text-gray-400 text-sm">Select your logo type</p>
      {Object.entries(FILTER_TYPE).map(([key]) => (
        <button
          key={key}
          className="h-14 bg-purple-900/40 hover:bg-purple-900/80 border-2 border-purple-900 p-2 rounded-sm m-0.5 text-sm cursor-pointer"
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default Filters;
