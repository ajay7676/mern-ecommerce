import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiClock, FiSend } from "react-icons/fi";
import clsx from "clsx";

const publishOptions = [
  {
    id: "publish-now",
    label: "Publish now",
    description: "Make the product immediately available.",
    icon: FiSend,
  },
  {
    id: "schedule",
    label: "Schedule publishing",
    description: "Choose a future publishing date.",
    icon: FiClock,
  },
];

const HeaderActions = ({
  isSavingDraft,
  isPublishing,
  isSubmitting,
  onCancel,
  onSaveDraft,
  onPublish,
  onPublishOption,
}) => {
  const [isPublishMenuOpen, setIsPublishMenuOpen] = useState(false);
  const menuContainerRef = useRef(null);

   useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target)
      ) {
        setIsPublishMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsPublishMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );

      window.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, []);

  const handlePublishOption = (optionId) => {
    onPublishOption(optionId);
    setIsPublishMenuOpen(false);
  };
  return (
    <div
      className="
        flex w-full flex-col gap-2.5
        sm:flex-row sm:items-center
        lg:w-auto
      "
    >
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="
          btn h-11 min-h-11 rounded-lg
          border-slate-200 bg-white px-6
          text-sm font-semibold text-slate-700
          shadow-none hover:border-slate-300
          hover:bg-slate-50
          disabled:bg-slate-100
        "
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={onSaveDraft}
        disabled={isSubmitting}
        className="
          btn h-11 min-h-11 rounded-lg
          border-indigo-300 bg-white px-6
          text-sm font-semibold text-indigo-600
          shadow-none hover:border-indigo-500
          hover:bg-indigo-50
          disabled:border-slate-200
          disabled:bg-slate-100
          disabled:text-slate-400
        "
      >
        {isSavingDraft && (
          <span className="loading loading-spinner loading-sm" />
        )}

        {isSavingDraft ? "Saving..." : "Save as Draft"}
      </button>

      <div ref={menuContainerRef} className="relative flex">
        <button
          type="button"
          onClick={onPublish}
          disabled={isSubmitting}
          className="
            btn h-11 min-h-11 flex-1 rounded-r-none
            border-none bg-indigo-600 px-6
            text-sm font-semibold text-white
            shadow-none hover:bg-indigo-700
            disabled:bg-indigo-300
            sm:min-w-37.5
          "
        >
          {isPublishing && (
            <span className="loading loading-spinner loading-sm" />
          )}

          {isPublishing ? "Publishing..." : "Publish Product"}
        </button>

        <button
          type="button"
          aria-label="Show publishing options"
          aria-haspopup="menu"
          aria-expanded={isPublishMenuOpen}
          disabled={isSubmitting}
          onClick={() => setIsPublishMenuOpen((currentState) => !currentState)}
          className="
            btn h-11 min-h-11 w-11 rounded-l-none
            border-0 border-l border-indigo-500
            bg-indigo-600 px-0 text-white
            shadow-none hover:bg-indigo-700
            disabled:bg-indigo-300
          "
        >
          <FiChevronDown
            className={clsx(
              "h-4 w-4 transition-transform duration-200",
              isPublishMenuOpen && "rotate-180",
            )}
          />
        </button>

        {isPublishMenuOpen && (
          <div
            role="menu"
            className="
              absolute right-0 top-[calc(100%+10px)]
              z-50 w-72.5 overflow-hidden
              rounded-xl border border-slate-200
              bg-white p-1.5
              shadow-[0_18px_45px_rgba(15,23,42,0.16)]
            "
          >
            {publishOptions.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="menuitem"
                  onClick={() =>
                    handlePublishOption(option.id)
                  }
                  className="
                    flex w-full items-start gap-3
                    rounded-lg px-3 py-3 text-left
                    transition-colors hover:bg-indigo-50
                    focus-visible:bg-indigo-50
                    focus-visible:outline-none
                  "
                >
                  <span
                    className="
                      mt-0.5 flex h-9 w-9 shrink-0
                      items-center justify-center rounded-lg
                      bg-indigo-50 text-indigo-600
                    "
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span>
                    <span
                      className="
                        block text-sm font-semibold
                        text-slate-900
                      "
                    >
                      {option.label}
                    </span>

                    <span
                      className="
                        mt-0.5 block text-xs
                        leading-5 text-slate-500
                      "
                    >
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderActions;
