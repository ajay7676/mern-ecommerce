
const ProductPromoBanners = () => {
  const banners = [
  {
    title: "New Arrivals",
    heading: "Just Dropped!",
    text: "Fresh styles for the new season.",
    bg: "bg-violet-600 text-white",
  },
  {
    title: "Student Discount",
    heading: "Extra 10% OFF*",
    text: "Verified students only",
    bg: "bg-cyan-100 text-slate-900",
  },
  {
    title: "Hive Cash",
    heading: "Earn 5% Cashback",
    text: "on every order",
    bg: "bg-red-100 text-slate-900",
  },
];
  return (
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {banners.map((banner) => (
        <div
          key={banner.title}
          className={`${banner.bg} rounded-2xl p-5 min-h-32.5 flex flex-col justify-between`}
        >
          <div>
            <p className="text-xs font-bold uppercase">{banner.title}</p>
            <h3 className="text-xl font-black mt-2">{banner.heading}</h3>
            <p className="text-sm mt-1">{banner.text}</p>
          </div>

          <button className="btn btn-sm w-fit bg-white text-slate-900 border-none">
            Explore Now
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProductPromoBanners