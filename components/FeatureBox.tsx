import { LucideIcon } from "lucide-react";

type FeatureBoxProps = {
  title: string;
  text: string;
  icon: LucideIcon;
};

const FeatureBox = ({ title, text, icon: Icon }: FeatureBoxProps) => {
  return (
    <div className="featurebox-wrapper col-span-12 md:col-span-6 lg:col-span-4  rounded-xl p-0.5  transition duration-500 hover:-translate-y-1  group cursor-pointer">
      <div className="featurebox-content grid grid-cols-5 gap-4 p-4 ">
        <div className="col-span-1 flex items-center bg-slate-800/60 size-13 justify-center rounded-md group-hover:text-purple-600 transition duration-500 ">
          <span className="transition duration-500 group-hover:scale-110">
            <Icon size={34} />
          </span>
        </div>
        <div className="col-span-4 ">
          <h4 className="text-xl font-bold transition duration-500 group-hover:text-purple-600">
            {title}
          </h4>
          <p className="text-gray-400 text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureBox;
