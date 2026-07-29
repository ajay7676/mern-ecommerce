import Card from "../card/Card";
import ProductNameField from "./ProductNameField";
import ShortDescriptionField from './ShortDescriptionField';
import DescriptionEditor from './DescriptionEditor';
import CategorySelect from './CategorySelect';
import BrandSelect from './BrandSelect';
import SKUField from './SKUField';
import BarcodeField from './BarcodeField'

const BasicInformationCard = ({
   values ={},
   errors = {},
   disabled= false,
   categories =[],
   brands = [],
   onChange ,
}) => {

  const handleFieldChange  = (fieldName, value) => {
    onChange?.(fieldName , value)

  }
  return (
    <Card
      title="Basic Information"
      className="overflow-visible"
      bodyClassName="pt-5"
    >
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.92fr]">
        <div className="space-y-5">
            <ProductNameField
              value ={values.name ?? ""}
              error = {errors.name}
              disabled = {disabled}
              onChange = {(value) =>  handleFieldChange("name" , value)}
          
            />
            <ShortDescriptionField 
              value ={values.shortDescription ?? "" }
              error={errors.shortDescription }
              disabled ={disabled}
              onChange={(value) => handleFieldChange("shortDescription " , value)}
            
            />
            <DescriptionEditor
              value ={values.description  ?? "" }
              error={errors.description }
              disabled ={disabled}
              onChange={(value) => handleFieldChange("description  " , value)}
            />
        </div>
        <div className="space-y-5">
            <CategorySelect
            value={values.category ?? ""}
            options={categories}
            error={errors.category}
            disabled={disabled}
            onChange={(value) =>
              handleFieldChange("category", value)
            }
          />

          <BrandSelect
            value={values.brand ?? ""}
            options={brands}
            error={errors.brand}
            disabled={disabled}
            onChange={(value) =>
              handleFieldChange("brand", value)
            }
          />

          <SKUField
            value={values.sku ?? ""}
            error={errors.sku}
            disabled={disabled}
            onChange={(value) => handleFieldChange("sku", value)}
          />

          <BarcodeField
            value={values.barcode ?? ""}
            error={errors.barcode}
            disabled={disabled}
            onChange={(value) =>
              handleFieldChange("barcode", value)
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default BasicInformationCard;
