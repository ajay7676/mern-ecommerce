import FilterSection from "./filter/FilterSection";
import FilterCheckbox from './filter/FilterCheckbox'

const ProductFilters = () => {
  const categories = ["Tops", "Dresses", "T-Shirts", "Shirts", "Jeans"];
  const brands = ["Aureli", "Northlane", "VerveLab", "Lunaro", "ModeMint"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <aside className="hidden lg:block border border-slate-200 rounded-2xl p-5 h-fit sticky top-28">
        <div className="flex justify-between">
            <h3 className="font-bold text-slate-900">FILTERS</h3>
            <button className="text-sm text-red-500 font-semibold">
            Clear All
            </button>
        </div>
        <div className="divider my-3" />
        <FilterSection title="Categories">
            {
                categories.map((item) => (
                    <FilterCheckbox  key={item} label={item} count={Math.floor(Math.random() * 200)}/>
                ))
            }

        </FilterSection>
        <FilterSection title="Brand">
            <input
            type="text"
            placeholder="Search brand"
            className="input input-bordered input-sm w-full bg-white mb-3"
            />
            {brands.map((item) => (
            <FilterCheckbox key={item} label={item} count={Math.floor(Math.random() * 200)} />
            ))}
        </FilterSection>
        <FilterSection title="Size">
            <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
                <button key={size} className="btn btn-xs btn-outline">
                {size}
                </button>
            ))}
            </div>
        </FilterSection>
        <FilterSection title="Price">
            <input type="range" min={199} max={2999} className="range range-error range-sm" />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>₹199</span>
            <span>₹2,999</span>
            </div>
        </FilterSection>

    </aside>
  );
};

export default ProductFilters;
