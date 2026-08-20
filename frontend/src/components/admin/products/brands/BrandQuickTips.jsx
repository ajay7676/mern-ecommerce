import {
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";

const tips = [
  "Add high quality brand logos.",
  "Set featured brands to highlight them.",
  "Use sort order to arrange brands.",
  "Deactivate brands instead of deleting.",
];

const BrandQuickTips = () => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_2px_12px_rgba(15,23,42,0.03)]
      "
    >
      <div className="flex items-center gap-2">
        <FiZap
          size={20}
          className="text-violet-600"
        />

        <h2 className="text-[15px] font-bold text-slate-950">
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
              size={14}
              className="
                mt-0.5
                shrink-0
                text-emerald-500
              "
            />

            <p className="text-[12px] leading-5 text-slate-600">
              {tip}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandQuickTips;