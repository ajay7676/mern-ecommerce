import {
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";

const tips = [
  "Drag and drop to reorder categories.",
  "Add parent categories before subcategories.",
  "Deactivate categories instead of deleting.",
  "Products in a category will remain safe.",
];

const QuickTipsCard = () => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_1px_4px_rgba(15,23,42,0.03)]
      "
    >
      <div className="flex items-center gap-2">
        <FiZap
          size={20}
          className="text-violet-600"
        />

        <h2 className="text-[14px] font-bold text-slate-950">
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

export default QuickTipsCard;