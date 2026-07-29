import PropTypes from "prop-types";
import clsx from "clsx";

const Card = ({
  as: Component = "section",
  title,
  description,
  icon: Icon,
  rightContent,
  children,
  className,
  headerClassName,
  bodyClassName,
  noPadding,
}) => {
  const hasHeader = Boolean(title || description || Icon || rightContent);

  return (
    <Component
      className={clsx(
        "overflow-hidden rounded-xl",
        "border border-slate-200 bg-white",
        "shadow-[0_2px_8px_rgba(15,23,42,0.035)]",
        className,
      )}
    >
      {hasHeader && (
        <div
          className={clsx(
            "flex flex-col gap-4 px-5 pt-5",
            "sm:flex-row sm:items-start",
            "sm:justify-between sm:px-6 sm:pt-6",
            headerClassName,
          )}
        >
          <div className="flex min-w-0 items-start gap-3">
            {Icon && (
              <span
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-lg bg-indigo-50
                  text-indigo-600
                "
              >
                <Icon className="h-5 w-5" />
              </span>
            )}

            <div className="min-w-0">
              {title && (
                <h2
                  className="
                    text-base font-semibold
                    text-slate-950
                  "
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  className="
                    mt-1 text-xs leading-5
                    text-slate-500
                  "
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          {rightContent && <div className="shrink-0">{rightContent}</div>}
        </div>
      )}

      <div
        className={clsx(
          !noPadding && "p-5 sm:p-6",
          hasHeader && !noPadding && "pt-5 sm:pt-5",
          bodyClassName,
        )}
      >
        {children}
      </div>
    </Component>
  );
};

Card.propTypes = {
  as: PropTypes.elementType,
  title: PropTypes.node,
  description: PropTypes.node,
  icon: PropTypes.elementType,
  rightContent: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  noPadding: PropTypes.bool,
};

Card.defaultProps = {
  as: "section",
  title: null,
  description: null,
  icon: null,
  rightContent: null,
  className: "",
  headerClassName: "",
  bodyClassName: "",
  noPadding: false,
};

export default Card;
