import clsx from "clsx";

const colorVariants = {
  primary: {
    badge: "bg-primary/10 text-primary",
  },
  warning: {
    badge: "bg-warning/10 text-warning",
  },
  secondary: {
    badge: "bg-secondary/10 text-secondary",
  },
  info: {
    badge: "bg-info/10 text-info",
  },
  success: {
    badge: "bg-success/10 text-success",
  },
  error: {
    badge: "bg-error/10 text-error",
  },
  accent: {
    badge: "bg-accent/10 text-accent",
  },
};

const OrderStatusCard = ({ title, count, icon: Icon, color }) => {
    const styles = colorVariants[color] ?? colorVariants.primary;

  return (
     <button
      type="button"
      className="group flex w-full items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
    >
      <div>
        <p className="text-sm text-base-content/60">
          {title}
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {count}
        </h3>
      </div>

      <div
        className={clsx(
          "flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
          styles.badge
        )}
      >
        <Icon size={26} />
      </div>
    </button>
  )
}

export default OrderStatusCard