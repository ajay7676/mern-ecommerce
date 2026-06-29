
const chips = [
  "All",
  "Tops",
  "Dresses",
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Blazers",
  "Jumpsuits",
  "Skirts",
];

const ProductToolbar = () => {
  return (
   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {chips.map((chip, index) => (
          <button
            key={chip}
            className={`btn btn-sm rounded-full ${
              index === 0
                ? "bg-violet-600 text-white border-none"
                : "btn-outline bg-white"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
      <select className="select select-bordered select-sm w-full md:w-44 bg-white">
        <option>Popularity</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Newest</option>
      </select>
    </div>
  )
}

export default ProductToolbar