import Card from "../card/Card";
import FeatureSwitches from "./FeatureSwitches";
import StatusSelect from "./StatusSelect";
import VisibilitySelect from "./VisibilitySelect";

const ProductStatusCard = ({
  values = {},
  errors = {},
  disabled = false,
  onChange,
}) => {
  const isDisabled = Boolean(disabled);

  return (
    <Card title="Product Status" className="overflow-visible" bodyClassName="">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <StatusSelect
          value={values.status || "draft"}
          error={errors.status}
          disabled={isDisabled}
          onChange={(value) => onChange("status", value)}
        />
        <VisibilitySelect
          value={values.visibility || "public"}
          error={errors.visibility}
          disabled={isDisabled}
          onChange={(value) =>
            onChange("visibility", value)
          }
        />
      </div>
       <div className="mt-4">
        <FeatureSwitches
          isFeatured={values.isFeatured ?? false}
          isNewArrival={
            values.isNewArrival ?? false
          }
          isBestSeller={
            values.isBestSeller ?? false
          }
          disabled={isDisabled}
          onChange={onChange}
        />
      </div>
    </Card>
  );
};

export default ProductStatusCard;
