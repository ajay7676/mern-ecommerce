const offers = [
  {
    title: "Download the App",
    heading: "Get Extra 15% OFF*",
    text: "on your first app order",
    button: "Download Now",
    bg: "bg-violet-600",
  },
  {
    title: "Student Discount",
    heading: "Extra 10% OFF*",
    text: "Verified students only",
    button: "Verify Now",
    bg: "bg-cyan-100",
  },
  {
    title: "Hive Cash",
    heading: "Earn 5% Cashback",
    text: "on every order",
    button: "Learn More",
    bg: "bg-red-100",
  },
];

const OfferCards = () => {
  return (
    <div className="grid gap-4">
      {offers.map((offer) => (
        <div
          key={offer.title}
          className={`${offer.bg} rounded-2xl p-5 min-h-32.5 flex flex-col justify-between overflow-hidden`}
        >
          <div>
            <p className="text-xs font-bold uppercase text-slate-700">
              {offer.title}
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-2">
              {offer.heading}
            </h3>

            <p className="text-sm text-slate-700 mt-1">{offer.text}</p>
          </div>

          <button className="btn btn-sm w-fit rounded-md bg-white text-slate-900 border-none hover:bg-slate-100">
            {offer.button}
          </button>
        </div>
      ))}
    </div>
  );
};

export default OfferCards;