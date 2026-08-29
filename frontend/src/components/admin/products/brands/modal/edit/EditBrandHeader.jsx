import { FiX } from 'react-icons/fi'

const AddBrandHeader = ({onClose}) => {
  return (
        <div
          className="flex shrink-0 items-start 
          justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6"
        >
          <div>
            <h2
              id="add-brand-title"
              className="text-xl font-bold text-slate-950"
            >
              Edit Brand
            </h2>

            <p
              className="mt-1 text-sm text-slate-500"
            >
              Edit brand information, images and visibility.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-lg
              border
              border-slate-200
              text-slate-500
              cursor-pointer
              transition
              hover:bg-slate-50
              hover:text-slate-900
            "
          >
            <FiX size={20} />
          </button>
        </div>
  )
}

export default AddBrandHeader