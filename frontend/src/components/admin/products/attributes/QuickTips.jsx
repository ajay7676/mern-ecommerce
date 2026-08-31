import { FiAlignRight, FiCheckCircle } from "react-icons/fi";


const tips = [
  "Use Dropdown for predefined options.",
  "Use Switch for color or visual selections.",
  "Keep attribute names short and clear.",
  "Set proper sort order for better display.",
  "Deactivate unused attributes instead of deleting.",
];

const QuickTips = () => {
  return (
    
    <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
         <FiAlignRight 
          size={21}
          className="text-violet-600"
        />

        <h2 className="text-base font-bold text-slate-950">
          Quick Tips
        </h2>
      </div>

      <div className="mt-4 space-y-3">
        {tips.map((tip) => (
          <div
            key={tip}
            className="flex items-start gap-3"
          >
            <FiCheckCircle
              size={15}
              className="mt-0.5 shrink-0 text-emerald-500"
            />

            <p className="text-xs leading-5 text-[#253875]">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickTips;