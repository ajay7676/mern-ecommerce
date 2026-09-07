import {
  FiCircle,
  FiImage,
  FiType,
  FiChevronDown,
} from "react-icons/fi";

const AttributeValueOptions = ({
  displayType,
  sortValues,
  defaultEnabled,
  onDisplayTypeChange,
  onSortValuesChange,
  onDefaultToggle,
}) => {
  const types = [
    {
      value: "text",
      label: "Text",
      icon: FiType,
    },
    {
      value: "color",
      label: "Color",
      icon: FiCircle,
    },
    {
      value: "image",
      label: "Image",
      icon: FiImage,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h4 className="text-sm font-semibold text-slate-900">
        Value Options
      </h4>

      <div className="mt-4">
        <label className="text-xs font-medium text-slate-700">
          Display Type
        </label>

        <div className="mt-2 grid grid-cols-3 gap-2">
          {types.map((type) => {
            const Icon = type.icon;
            const active = displayType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() =>
                  onDisplayTypeChange(type.value)
                }
                className={`
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  border
                  text-xs
                  font-medium
                  transition
                  ${
                    active
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                <Icon size={15} />
                {type.label}
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          Choose how this attribute's values will be displayed.
        </p>
      </div>

      {/* Sort */}
      <div className="mt-5">
        <label className="text-xs font-medium text-slate-700">
          Sort Values
        </label>

        <div className="relative mt-2">
          <select
            value={sortValues}
            onChange={(e) =>
              onSortValuesChange(e.target.value)
            }
            className="
              h-10
              w-full
              appearance-none
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              pr-9
              text-xs
              text-slate-700
              outline-none
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-100
            "
          >
            <option value="manual">Manually</option>
            <option value="alphabetical">
              Alphabetically
            </option>
          </select>

          <FiChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        <p className="mt-2 text-xs text-slate-400">
          You can drag & drop values to reorder them.
        </p>
      </div>

      {/* Default */}
      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-700">
            Set First Value as Default
          </p>

          <p className="mt-1 text-xs text-slate-400">
            This value will be pre-selected.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={defaultEnabled}
          onClick={() =>
            onDefaultToggle(!defaultEnabled)
          }
          className={`
            relative
            h-6
            w-11
            shrink-0
            rounded-full
            transition
            ${
              defaultEnabled
                ? "bg-violet-600"
                : "bg-slate-200"
            }
          `}
        >
          <span
            className={`
              absolute
              top-1
              h-4
              w-4
              rounded-full
              bg-white
              shadow-sm
              transition
              ${
                defaultEnabled
                  ? "left-6"
                  : "left-1"
              }
            `}
          />
        </button>
      </div>
    </div>
  );
};

export default AttributeValueOptions;