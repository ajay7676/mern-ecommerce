import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    brand: "Aureli",
    name: "Relaxed Linen Shirt",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.6,
    reviews: "1.2K",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
  },
  {
    id: 2,
    brand: "Northlane",
    name: "Striped Cotton T-Shirt",
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.4,
    reviews: 892,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
  },
  {
    id: 3,
    brand: "VerveLab",
    name: "Retro Court Sneakers",
    price: 1799,
    originalPrice: 2999,
    discount: 40,
    rating: 4.7,
    reviews: "2.3K",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
  },
  {
    id: 4,
    brand: "Lunaro",
    name: "Floral Print Maxi Dress",
    price: 1299,
    originalPrice: 2199,
    discount: 41,
    rating: 4.5,
    reviews: "1.1K",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
  },
   {
    id: 5,
    brand: "Apple",
    name: "Striped Cotton T-Shirt",
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.4,
    reviews: 892,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
  },
   {
    id: 6,
    brand: "Aureli",
    name: "Relaxed Linen Shirt",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.6,
    reviews: "1.2K",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
  },
];

const TrendingProducts = () => {
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;