import clsx from "clsx";

const PaymentOptionItem = ({
  icon: Icon,
  title,
  description,
  iconClassName,
}) => {
  return (
    <article className="flex items-start gap-4">
      <div
        className={clsx(
          "flex h-12 w-12 shrink-0 items-center",
          "justify-center rounded-md",
          iconClassName,
        )}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div>
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

export default PaymentOptionItem;