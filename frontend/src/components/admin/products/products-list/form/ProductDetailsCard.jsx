
import { useWatch } from "react-hook-form";

import {
  SelectField,
  TextAreaField,
  TextInputField,
} from "./FormField";

import UserManualUploadBox from "./UserManualUploadBox";

const ProductDetailsCard = ({
  register,
  control,
  setValue,
  setError,
  clearErrors,
  errors,
}) => {
  const returnPolicy = useWatch({
    control,
    name: "returnPolicy",
  });

  const careInstructions = useWatch({
    control,
    name: "careInstructions",
  });

  const safetyInformation = useWatch({
    control,
    name: "safetyInformation",
  });

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h3 className="text-lg font-bold text-slate-950">
          Product Details
        </h3>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Provide additional information about your product.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <SelectField
          label="Product Type"
          error={errors.productTypeDetail?.message}
          {...register("productTypeDetail")}
        >
          <option value="">Select product type</option>
          <option value="physical">Physical Product</option>
          <option value="digital">Digital Product</option>
          <option value="service">Service</option>
          <option value="bundle">Bundle Product</option>
        </SelectField>

        <SelectField
          label="Collection"
          helper="Optional"
          error={errors.collection?.message}
          {...register("collection")}
        >
          <option value="">Select collection</option>
          <option value="summer-collection">Summer Collection 2024</option>
          <option value="winter-collection">Winter Collection</option>
          <option value="new-arrivals">New Arrivals</option>
          <option value="best-sellers">Best Sellers</option>
        </SelectField>

        <TextInputField
          label="Tags"
          placeholder="Enter tags and press enter..."
          helper="Add relevant tags to improve discoverability"
          error={errors.tags?.message}
          {...register("tags")}
        />

        <TextInputField
          label="HSN Code"
          placeholder="Enter HSN code"
          helper="Helps in tax calculation and reporting"
          error={errors.hsnCode?.message}
          {...register("hsnCode")}
        />

        <SelectField
          label="Country of Origin"
          error={errors.countryOfOrigin?.message}
          {...register("countryOfOrigin")}
        >
          <option value="">Select country</option>
          <option value="india">India</option>
          <option value="china">China</option>
          <option value="usa">USA</option>
          <option value="vietnam">Vietnam</option>
          <option value="bangladesh">Bangladesh</option>
        </SelectField>

        <TextInputField
          label="Warranty Information"
          placeholder="Enter warranty details"
          helper="e.g. 1 Year Manufacturer Warranty"
          error={errors.warrantyInformation?.message}
          {...register("warrantyInformation")}
        />

        <div className="xl:col-span-3">
          <TextAreaField
            label="Return Policy"
            placeholder="Enter return policy details"
            helper="Clear return policy helps build customer trust"
            rows={3}
            rightText={`${returnPolicy?.length || 0}/500`}
            error={errors.returnPolicy?.message}
            {...register("returnPolicy")}
          />
        </div>

        <div className="xl:col-span-3">
          <TextAreaField
            label="Care Instructions"
            placeholder="Enter care instructions"
            helper="Helps customers maintain the product"
            rows={3}
            rightText={`${careInstructions?.length || 0}/500`}
            error={errors.careInstructions?.message}
            {...register("careInstructions")}
          />
        </div>

        <UserManualUploadBox
          control={control}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          error={errors.userManual?.message}
        />

        <div className="md:col-span-1 xl:col-span-2">
          <TextAreaField
            label="Safety Information"
            placeholder="Enter safety information"
            helper="Important safety notes for users"
            rows={5}
            rightText={`${safetyInformation?.length || 0}/500`}
            error={errors.safetyInformation?.message}
            {...register("safetyInformation")}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsCard;