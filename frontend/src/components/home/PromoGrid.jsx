const promoItems = [
  {
    title: "Weekend Steals",
    subtitle: "Flat 50% OFF",
    text: "Top fashion picks for you",
    button: "Shop Deals",
    bg: "bg-orange-100",
  },
  {
    title: "Premium Watches",
    subtitle: "Min 40% OFF",
    text: "Upgrade your style",
    button: "Explore",
    bg: "bg-slate-100",
  },
  {
    title: "Beauty Must-Haves",
    subtitle: "Buy More Save More",
    text: "Skincare, makeup & more",
    button: "Shop Beauty",
    bg: "bg-pink-100",
  },
];

const PromoGrid = () => {
  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {promoItems.map((item) => (
          <div
            key={item.title}
            className={`${item.bg} rounded-3xl p-6 min-h-55 flex flex-col justify-between overflow-hidden relative`}
          >
            <div>
              <p className="text-xs font-bold uppercase text-red-500">
                {item.title}
              </p>

              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {item.subtitle}
              </h3>

              <p className="text-sm text-slate-600 mt-2">{item.text}</p>
            </div>

            <button className="btn w-fit bg-slate-900 text-white border-none rounded-md hover:bg-red-500">
              {item.button}
            </button>

            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/50" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoGrid;