import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiHeart, FiPlay } from "react-icons/fi";
 
const ProductGallery = ({ product}) => {
  const images = product?.images || [];
  const [selectedImage, setSelectedImage] = useState(0);
 
  return (
    <div className="flex gap-4">
      <div className="hidden md:flex flex-col gap-4 w-24">
        {images.map((img, index) => (
          <button
            key={img.public_id}
            className={`h-28 rounded-xl overflow-hidden border
                ${index === selectedImage ? "border-indigo-500" : "border-slate-200"}
                
                `}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={img.url}
              alt={product?.name}
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
          src={images[selectedImage]?.url}
           alt={product.name}
          className="w-full h-full object-cover"
        />

        <button className="absolute left-5 top-1/2 -translate-y-1/2
         btn btn-circle bg-white border-none shadow"
          onClick={() =>setSelectedImage((prev) => prev + 1) }
         >
          <FiChevronLeft />
        </button>

        <button className="absolute right-5 top-1/2 -translate-y-1/2
         btn btn-circle bg-white border-none shadow"
           onClick={() =>setSelectedImage((prev) => prev - 1) } 
         >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
