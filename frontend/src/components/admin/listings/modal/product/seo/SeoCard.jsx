import Card from "../card/Card";
import SeoDescriptionField from "./SeoDescriptionField";
import SeoKeywords from "./SeoKeywords";
import SeoTitleField from "./SeoTitleField";
const SeoCard = ({
  values = {},
  errors = {},
  onChange,
  disabled = false,
  keywordSuggestions = [],
}) => {
    const handleFieldChange = (fieldName, fieldValue) => {
    if (typeof onChange === "function") {
      onChange(fieldName, fieldValue);
    }
  };
  return (
    <Card
      title="SEO Information"
      className="overflow-visible"
      bodyClassName=""
    >
      <div className="mt-5 space-y-5">
        <SeoTitleField
          value={values.seoTitle}
          error={errors.seoTitle}
          disabled={disabled}
          onChange={(value) =>
            handleFieldChange("seoTitle", value)
          }
        />
        <SeoDescriptionField
          value={values.seoDescription}
          error={errors.seoDescription}
          disabled={disabled}
          onChange={(value) =>
            handleFieldChange("seoDescription", value)
          }
        />

        <SeoKeywords
          value={values.seoKeywords}
          error={errors.seoKeywords}
          disabled={disabled}
          suggestions={keywordSuggestions}
          onChange={(value) =>
            handleFieldChange("seoKeywords", value)
          }
        />
        </div>
    </Card>
  );
};

export default SeoCard;
