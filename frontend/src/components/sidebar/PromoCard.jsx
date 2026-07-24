
import promoPhone from '../../assets/images/phone-promotion.webp'

const PromoCard = () => {
  return (
    <article className="overflow-hidden rounded-lg bg-indigo-50">
      <div className="flex h-33 items-end justify-center overflow-hidden bg-linear-to-b from-indigo-50 to-indigo-100">
        <img
          src={promoPhone}
          alt="Smartphone promotion"
          className="h-full w-full object-contain object-bottom"
        />
      </div>

      <div className="border-t border-indigo-100 bg-white/60 px-4 py-4 text-center">
        <p className="text-base font-semibold text-slate-900">
          Up to <span className="text-indigo-600">20% Off</span>
        </p>

        <p className="mt-1 text-xs font-medium text-slate-700">
          On Best Selling Smartphones
        </p>

        <button
          type="button"
          className="
            mt-4 h-9 w-full rounded-md bg-indigo-600
            text-sm font-semibold text-white
            transition-colors hover:bg-indigo-700
            focus:outline-none focus:ring-2
            focus:ring-indigo-500 focus:ring-offset-2
          "
        >
          Shop Now
        </button>
      </div>
    </article>
  );
};

export default PromoCard;