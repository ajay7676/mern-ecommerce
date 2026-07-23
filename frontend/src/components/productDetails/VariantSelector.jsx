import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";

const VariantSelector = ({
  options,
  selectedOptions,
  onSelectOption,
  isOptionDisabled,
  selectedVariant,
  allOptionsSelected,
}) => {
  return (
    <div className="space-y-6">
      <ColorSelector
        options={options.color}
        selectedValue={selectedOptions.color}
        onChange={onSelectOption}
        isOptionDisabled={isOptionDisabled}
      />

      <SizeSelector
        options={options.size}
        selectedValue={selectedOptions.size}
        onChange={onSelectOption}
        isOptionDisabled={isOptionDisabled}
      />
       {!allOptionsSelected && (
        <p className="text-sm text-amber-600">
          Please select all product
          options.
        </p>
      )}

      {allOptionsSelected &&
        !selectedVariant && (
          <p className="text-sm text-error">
            This combination is not
            available.
          </p>
        )}
    </div>
  );
};

export default VariantSelector;
