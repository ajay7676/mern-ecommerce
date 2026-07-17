// components/listings/table/cells/ProductCell.jsx

import ProductImage from "./ProductImage";
import ProductTitle from "./ProductTitle";

const ProductCell = ({
  product,
  onClick,
}) => {
  return (
    <div
      className="
        flex
        min-w-65
        items-center
        gap-4
      "
    >
      <ProductImage
        src={product.image}
        alt={product.name}
      />

      <ProductTitle
        name={product.name}
        sku={product.sku}
        brand={product.brand}
      />

      {onClick && (
        <button
          type="button"
          onClick={() => onClick(product)}
          className="sr-only"
        >
          View Product
        </button>
      )}
    </div>
  );
};

export default ProductCell;