import { FiHeart, FiShoppingCart } from "react-icons/fi";
import StockBadge from "../../../components/ui/StockBadge";
import { formatCurrency } from "../utils/formatCurrency";

const WishlistCard = ({
  item,
  onRemove,
  onMoveToCart,
  isMoving = false,
}) => {
  const isOutOfStock = item.stock <= 0;

  return (
    <article
      className="
        group flex min-h-117.5 flex-col
        rounded-xl border border-slate-200 bg-white
        p-4 transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)]
      "
    >
      <div className="relative">
        <button
          type="button"
          aria-label={`Remove ${item.name} from wishlist`}
          title="Remove from wishlist"
          onClick={() => onRemove(item.id)}
          className="
            absolute right-0 top-0 z-10
            flex h-9 w-9 items-center justify-center
            rounded-full text-indigo-600
            transition-colors hover:bg-indigo-50
            focus:outline-none focus:ring-2
            focus:ring-indigo-500 focus:ring-offset-2
          "
        >
          <FiHeart className="h-5 w-5 fill-current" />
        </button>

        <div
          className="
            flex h-47.5 items-center justify-center
            overflow-hidden rounded-lg bg-white
            sm:h-52.5
          "
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="
              h-full w-full object-contain p-3
              transition-transform duration-300
              group-hover:scale-[1.03]
            "
          />
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs font-medium text-slate-500">
          {item.brand}
        </p>

        <h2
          className="
            mt-2 line-clamp-2 text-[15px] font-semibold
            leading-6 text-slate-950
          "
        >
          {item.name}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {item.variant}
        </p>

        <p className="mt-4 text-lg font-bold text-slate-950">
          {formatCurrency(item.price)}
        </p>

        <div className="mt-4">
          <StockBadge stock={item.stock} />
        </div>

        <button
          type="button"
          disabled={isMoving || isOutOfStock}
          onClick={() => onMoveToCart(item.id)}
          className="
            btn mt-auto h-11 min-h-11 w-full
            rounded-md border-indigo-400 bg-white
            font-medium text-indigo-600 shadow-none
            hover:border-indigo-600 hover:bg-indigo-50
            disabled:border-slate-200
            disabled:bg-slate-100 disabled:text-slate-400
          "
        >
          {isMoving ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <FiShoppingCart className="h-4.5 w-4.5" />
          )}

          {isOutOfStock ? "Out of Stock" : "Move to Cart"}
        </button>
      </div>
    </article>
  );
};

export default WishlistCard;