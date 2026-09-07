import { FiPlus, FiUpload } from "react-icons/fi";

import AttributeValueRow from "./AttributeValueRow";
import AttributeValueOptions from "./AttributeValueOptions";

const AttributeValuesSection = ({
  values,
  displayType,
  sortValues,
  defaultValue,
  onValuesChange,
  onDisplayTypeChange,
  onSortValuesChange,
  onDefaultValueChange,
}) => {
  const addValue = () => {
    onValuesChange([
      ...values,
      {
        id: crypto.randomUUID(),
        value: "",
        color: "#000000",
        isDefault: false,
      },
    ]);
  };

  const updateValue = (id, field, value) => {
    onValuesChange(
      values.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const removeValue = (id) => {
    onValuesChange(
      values.filter((item) => item.id !== id)
    );
  };

  const makeDefault = (id) => {
    onValuesChange(
      values.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );

    onDefaultValueChange(id);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-semibold text-white">
            2
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Attribute Values
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Add values for this attribute. These will be
              available for products.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Actions */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addValue}
            className="
              inline-flex
              h-9
              items-center
              gap-2
              rounded-lg
              bg-violet-50
              px-3
              text-xs
              font-semibold
              text-violet-700
              transition
              hover:bg-violet-100
            "
          >
            <FiPlus size={14} />
            Add Values Manually
          </button>

          <button
            type="button"
            className="
              inline-flex
              h-9
              items-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              text-xs
              font-medium
              text-slate-700
              hover:bg-slate-50
            "
          >
            <FiUpload size={14} />
            Bulk Upload Values
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* Values */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Values
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="space-y-2">
              {values.map((item, index) => {
                return (
                <AttributeValueRow
                  key={item.value}
                  item={item}
                  index={index}
                  displayType={displayType}
                  onChange={updateValue}
                  onRemove={removeValue}
                  onMakeDefault={makeDefault}
                />
              )
              } )}
            </div>

            <button
              type="button"
              onClick={addValue}
              className="
                mt-3
                inline-flex
                h-9
                items-center
                gap-2
                rounded-lg
                border
                border-slate-200
                bg-white
                px-3
                text-xs
                font-semibold
                text-slate-700
                transition
                hover:border-violet-200
                hover:bg-violet-50
                hover:text-violet-700
              "
            >
              <FiPlus size={14} />
              Add Another Value
            </button>
          </div>

          {/* Options */}
          <AttributeValueOptions
            displayType={displayType}
            sortValues={sortValues}
            defaultEnabled={Boolean(defaultValue)}
            onDisplayTypeChange={onDisplayTypeChange}
            onSortValuesChange={onSortValuesChange}
            onDefaultToggle={(enabled) => {
              if (!enabled) {
                onDefaultValueChange("");
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AttributeValuesSection;