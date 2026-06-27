import { FiCreditCard, FiGift, FiShoppingBag } from "react-icons/fi";

const offers = [
  { icon: FiCreditCard, title: "Card Offer", text: "10% instant discount on select cards." },
  { icon: FiGift, title: "Welcome Offer", text: "Extra 10% off on first order." },
  { icon: FiShoppingBag, title: "No Minimum Order Value", text: "Shop any product, any size." },
];

const OfferBox = () => {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-slate-700 mb-3">Exclusive Offers</h3>

      <div className="space-y-3">
        {offers.map((offer) => {
          const Icon = offer.icon;

          return (
            <div key={offer.title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <Icon />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">{offer.title}</p>
                <p className="text-sm text-slate-500">{offer.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferBox;