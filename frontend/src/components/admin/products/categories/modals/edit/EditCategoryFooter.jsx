import { FiSave } from 'react-icons/fi'

const EditCategoryFooter = ({onClose,isPending}) => {
  return (
        <footer
          className="
            flex
            shrink-0
            flex-col-reverse
            gap-3
            border-t
            border-slate-200
            bg-slate-50
            px-5
            py-4
            sm:flex-row
            sm:justify-end
            sm:px-6
          "
        >
          <button
            type="button"
            onClick={
              onClose
            }
            disabled={
              isPending
            }
            className="
              h-10
              rounded-lg
              border
              border-slate-200
              bg-white
              px-5
              text-sm
              font-semibold
              text-slate-700
              transition
              cursor-pointer
              hover:bg-slate-50
              disabled:opacity-60
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              isPending
            }
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-violet-600
              px-5
              text-sm
              font-semibold
              text-white
              transition
              cursor-pointer
              hover:bg-violet-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <FiSave
              size={16}
            />

            {isPending
              ? "Saving..."
              : "Save Changes"}
          </button>
        </footer>
  )
}

export default EditCategoryFooter