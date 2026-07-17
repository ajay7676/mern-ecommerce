
import ProductCard from '../home/ProductCard';
import { useProducts } from "../../hooks/queries/useProducts";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

const ProductGrid = () => {
  const { data, isPending, isError, error } = useProducts();
  const products = data?.products || [];
   if (isPending) {
    return (
      <section className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5">
          {Array.from({ length: 26 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }
  if (isError) {
    return (
      <section className="mt-8">
        <p className="text-red-500 text-sm">
          {error?.message || "Failed to load products"}
        </p>
      </section>
    );
  }
  if (!products.length) {
    return (
      <section className="mt-8">
        <p className="text-slate-500 text-sm">No products found.</p>
      </section>
    );
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
  )
}

export default ProductGrid