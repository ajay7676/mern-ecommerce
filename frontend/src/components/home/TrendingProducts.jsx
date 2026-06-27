import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/queries/useProducts";
import ProductCardSkeleton from "../product/ProductCardSkeleton";

const TrendingProducts = () => {
  const { data, isPending, isError, error } = useProducts();
  const products = data?.products || [];
  console.log(products);
  if (isPending) {
    return (
      <section className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="skeleton h-8 w-56" />
          <div className="skeleton h-6 w-20" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase">
          Trending Right Now
        </h2>

        <button className="text-sm font-semibold text-slate-800 hover:text-red-500">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
