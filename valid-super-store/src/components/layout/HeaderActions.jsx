import Link from "next/link";

import { headerActions } from "@/constants/navigation/routes";

const HeaderActions = () => {
  return (
    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
      {headerActions.map((action) => {
        const Icon = action.icon;

        return (
          <Link
            key={action.label}
            href={action.href}
            aria-label={action.label}
            className="
              focus-ring group relative flex min-h-11 min-w-10
              flex-col items-center justify-center rounded-lg
              px-1 text-[#101828] transition
              hover:bg-slate-50 hover:text-[#ff3047]
              sm:min-w-12
            "
          >
            <Icon aria-hidden="true" size={20} strokeWidth={1.8} />

            {action.badge ? (
              <span
                className="
                  absolute right-0 top-0 flex size-18px
                  items-center justify-center rounded-full
                  bg-[#ff3047] text-[9px] font-bold text-white
                  sm:right-1
                "
              >
                {action.badge > 9 ? "9+" : action.badge}
              </span>
            ) : null}

            <span className="mt-0.5 hidden text-[9px] font-medium lg:block">
              {action.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderActions;
