const BenefitItem = ({ icon: Icon, title, description }) => {
  return (
    <article className="flex items-center gap-4">
      <div
        className="
          flex h-12 w-12 shrink-0 items-center
          justify-center rounded-full bg-white/70
          text-indigo-600
        "
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </article>
  );
};

export default BenefitItem;