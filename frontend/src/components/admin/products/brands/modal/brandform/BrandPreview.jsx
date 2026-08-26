import {
  FiShield,
  FiStar,
} from "react-icons/fi";

const BrandPreview = ({
  values,
}) => {
  return (
    <section
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <h3 className="text-sm font-semibold text-slate-950">
        Brand Preview
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        This is how your brand will appear.
      </p>

      <div
        className="
          mt-4
          flex
          min-h-65
          flex-col
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          px-5
          text-center
        "
      >
        {values?.logo?.url ? (
          <img
            src={values?.logo.url}
            alt="Brand"
            className="
              h-24
              w-24
              object-contain
            "
          />
        ) : (
          <div
            className="
              grid
              h-24
              w-24
              place-items-center
              rounded-full
              bg-violet-50
              text-violet-600
            "
          >
            <FiShield size={44} />
          </div>
        )}

        <h4 className="mt-5 text-xl font-bold text-slate-950">
          {values.name ||
            "Brand Name"}
        </h4>

        <div
          className="
            mt-2
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-violet-50
            px-3
            py-1
            text-xs
            font-medium
            text-violet-700
          "
        >
          {values.isFeatured && (
            <FiStar size={12} />
          )}

          {values.slug ||
            "slug"}
        </div>

        <p
          className="
            mt-4
            max-w-70
            text-sm
            leading-6
            text-slate-500
          "
        >
          {values.description ||
            "Brand description will appear here..."}
        </p>
      </div>
    </section>
  );
};

export default BrandPreview;