import Card from "../card/Card";
import DimensionFields from "./DimensionFields";
import WeightField from "./WeightField";

const AdditionalInformationCard = ({
  values = {},
  errors = {},
  disabled = false,
  onChange,
}) => {
   const weight = values.weight ?? {
    value: "",
    unit: "kg",
  };

   const dimensions = values.dimensions ?? {
    length: "",
    width: "",
    height: "",
    unit: "cm",
  };
  const handleWeightChange = (changes) => {
     onChange("weight", {
      ...weight,
      ...changes,
    });

  };
   const handleDimensionChange = (changes) => {
    onChange("dimensions", {
      ...dimensions,
      ...changes,
    });
  };

  return (
    <Card
      title="Addition Information"
      className="overflow-visible"
      bodyClassName="pt-5"
    >
      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(240px,0.75fr)_minmax(420px,1.25fr)]">
        <WeightField
          value={weight.value}
          unit={weight.unit}
          error={errors.weight}
          disabled={disabled}
          onValueChange={(value) =>
            handleWeightChange({ value })
          }
          onUnitChange={(unit) =>
            handleWeightChange({ unit })
          }
        />
        <DimensionFields
          values={dimensions}
          error={errors.dimensions}
          disabled={disabled}
          onChange={(fieldName, value) =>
            handleDimensionChange({
              [fieldName]: value,
            })
          }
          onUnitChange={(unit) =>
            handleDimensionChange({ unit })
          }
        />
        </div>
    </Card>
  );
};

export default AdditionalInformationCard;
