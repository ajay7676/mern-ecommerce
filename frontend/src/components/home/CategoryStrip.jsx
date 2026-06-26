import {
  FiGrid,
  FiShoppingBag,
  FiWatch,
  FiHome,
} from "react-icons/fi";
import { GiClothes, GiRunningShoe, GiLipstick } from "react-icons/gi";
import { PiTShirtBold, PiPantsBold } from "react-icons/pi";

const categories = [
  { name: "New In", icon: GiClothes, badge: "Hot", bg: "bg-red-100" },
  { name: "Tops", icon: PiTShirtBold, bg: "bg-yellow-100" },
  { name: "Dresses", icon: GiClothes, bg: "bg-purple-100" },
  { name: "T-Shirts", icon: PiTShirtBold, bg: "bg-red-100" },
  { name: "Jeans", icon: PiPantsBold, bg: "bg-blue-100" },
  { name: "Sneakers", icon: GiRunningShoe, bg: "bg-slate-100" },
  { name: "Bags", icon: FiShoppingBag, bg: "bg-green-100" },
  { name: "Watches", icon: FiWatch, bg: "bg-orange-100" },
  { name: "Beauty", icon: GiLipstick, bg: "bg-pink-100" },
  { name: "Home", icon: FiHome, bg: "bg-stone-100" },
  { name: "View All", icon: FiGrid, bg: "bg-white" },
];

const CategoryStrip = () => {
  return (
    <section className="mt-5">
      <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide justify-center">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              type="button"
              className="group min-w-20.5 flex flex-col items-center gap-2"
            >
              <div
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full ${category.bg} border border-slate-200 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition`}
              >
                {category.badge && (
                  <span className="absolute -top-1 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {category.badge}
                  </span>
                )}

                <Icon className="text-3xl md:text-4xl text-slate-800 group-hover:text-red-500 transition" />
              </div>

              <span className="text-xs font-semibold text-slate-800">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryStrip;