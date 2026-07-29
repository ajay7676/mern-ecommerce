import PropTypes from "prop-types";

import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import HeaderActions from "./HeaderActions";

const AddProductHeader = ({
  isSavingDraft,
  isPublishing ,
  isSubmitting,
  onBack,
  onCancel,
  onSaveDraft,
  onPublish,
  onPublishOption,
  title
}) => {
  return (
    <header
      className="
        sticky top-0 z-40 border-b border-slate-200
        bg-white/95 shadow-[0_2px_8px_rgba(15,23,42,0.025)]
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto flex w-full max-w-[1640px]
          flex-col gap-4 px-3 py-4
          sm:px-5
          lg:flex-row lg:items-center
          lg:justify-between lg:px-6
        "
      >
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <button
            type="button"
            onClick={onCancel}
            aria-label="Go back"
            className="
              btn btn-square h-11 min-h-11 w-11
              shrink-0 rounded-lg border border-indigo-100
              bg-indigo-50 text-indigo-600 shadow-none
              hover:border-indigo-200 hover:bg-indigo-100
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-indigo-500
              focus-visible:ring-offset-2
            "
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1
              className="
                truncate text-xl font-bold
                tracking-[-0.02em] text-slate-950
                sm:text-2xl
              "
            >
              {title}
            </h1>

            <nav
              aria-label="Breadcrumb"
              className="mt-1.5 overflow-hidden"
            >
              <ol
                className="
                  flex min-w-max items-center gap-1.5
                  text-xs text-slate-500 sm:text-sm
                "
              >
                <li>
                  <span>Dashboard</span>
                </li>

                <li aria-hidden="true">
                  <FiChevronRight className="h-3.5 w-3.5" />
                </li>

                <li>
                  <span>Products</span>
                </li>

                <li aria-hidden="true">
                  <FiChevronRight className="h-3.5 w-3.5" />
                </li>

                <li
                  aria-current="page"
                  className="font-medium text-slate-700"
                >
                  Add New Product
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <HeaderActions
          isSavingDraft={isSavingDraft}
          isPublishing={isPublishing}
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          onBack={onBack}
          onSaveDraft={onSaveDraft}
          onPublish={onPublish}
          onPublishOption={onPublishOption}
        />
      </div>
    </header>
  )
};
AddProductHeader.propTypes = {
  isSavingDraft: PropTypes.bool,
  isPublishing: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSaveDraft: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  onPublishOption: PropTypes.func.isRequired,
};

AddProductHeader.defaultProps = {
  isSavingDraft: false,
  isPublishing: false,
  isSubmitting: false,
};
export default AddProductHeader;
