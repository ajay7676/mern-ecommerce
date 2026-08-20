import { FiX } from "react-icons/fi";

const EditCategoryHeader = ({ onClose, isPending }) => {
  return (
    <header
      className="
            flex
            shrink-0
            items-start
            justify-between
            gap-5
            border-b
            border-slate-200
            px-5
            py-5
            sm:px-6
          "
    >
      <div>
        <h2
          id="edit-category-title"
          className="
                text-xl
                font-bold
                text-slate-950
              "
        >
          Edit Category
        </h2>

        <p
          className="
                mt-1
                text-sm
                text-slate-500
              "
        >
          Update category information, media and SEO settings.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        disabled={isPending}
        className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-lg
              text-slate-500
              transition
              cursor-pointer
              hover:bg-slate-100
              hover:text-slate-900
            "
      >
        <FiX size={20} />
      </button>
    </header>
  );
};

export default EditCategoryHeader;
