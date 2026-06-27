import { FiChevronLeft, FiChevronRight, FiHeart, FiPlay } from "react-icons/fi";

const images = [
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
];
 
const ProductGallery = () => {
  return (
    <div className="flex gap-4">
      <div className="hidden md:flex flex-col gap-4 w-24">
        {images.map((img, index) => (
          <button
            key={img}
            className={`h-28 rounded-xl overflow-hidden border
                ${index === 0 ? "border-indigo-500" : "border-slate-200"}
                
                `}
          >
            <img
              src={img}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
        <button className="h-28 rounded-xl bg-slate-100 flex items-center justify-center">
          <FiPlay className="text-2xl" />
        </button>
      </div>
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-rose-100 min-h-130">
        <span className="absolute top-5 left-5 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-md">
          NEW ARRIVAL
        </span>

        <button className="absolute top-5 right-5 bg-white/80 p-2 rounded-full">
          <FiHeart className="text-xl" />
        </button>

        <img
          src={images[0]}
          alt="Floral dress"
          className="w-full h-full object-cover"
        />

        <button className="absolute left-5 top-1/2 -translate-y-1/2 btn btn-circle bg-white border-none shadow">
          <FiChevronLeft />
        </button>

        <button className="absolute right-5 top-1/2 -translate-y-1/2 btn btn-circle bg-white border-none shadow">
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
