import clsx from "clsx";

const SectionCard = ({ children, className = "" }) => {
  return (
    <section
      className={clsx(
        "rounded-xl border border-slate-200 bg-white",
        "shadow-[0_2px_8px_rgba(15,23,42,0.035)]",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default SectionCard;