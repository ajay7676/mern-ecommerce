import { FaStar } from "react-icons/fa";
import OfferBox from "./OfferBox";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";
import {calculateDiscount} from '../../utils/calculateDiscount'


const ProductInfo = ({product}) => {
   console.log(product)
   const nameWords = product?.name.split(" ");
    const firstWord = nameWords[0];
    const remainingWords = nameWords.slice(1).join(" ");
    const discountPrice  = calculateDiscount(product.price, product.discountPrice);
  return (
    <div className="flex flex-col">
      <p className="font-bold text-slate-700">{firstWord}</p>
      <h1 className="text-2xl font-semibold text-slate-700 mt-1">
        {remainingWords}
      </h1>
       <div className="flex items-center gap-3 mt-4 text-sm text-slate-600">
        <span className="flex items-center gap-1 font-semibold text-slate-700">
         {product?.ratings} <FaStar className="text-orange-400" />
        </span>
        <span>|</span>
        <span>1.1K Ratings</span>
        <span>|</span>
        <span>{product?.reviews?.length} Reviews</span>
      </div>
      <div className="mt-5">
        <h2 className="text-3xl font-black text-slate-700">₹{product?.discountPrice || product?.price}</h2>
        <p className="text-sm text-slate-500 mt-1">
          MRP <span className="line-through">₹{product?.price}</span>{" "}
          <span className="text-red-500 font-bold ml-2">
            {
              discountPrice > 0
              ? `${discountPrice}% OFF`
              : "" 
            }
            </span>
        </p>
        <p className="text-xs text-slate-500 mt-1">Inclusive of all taxes</p>
      </div>

      <div className="mt-5 rounded-xl bg-cyan-100 p-4">
        <p className="text-sm font-bold text-slate-700">STYLE REWARDS</p>
        <p className="text-sm text-slate-600 mt-1">
          Earn Style Points with every purchase
        </p>
      </div>
      <OfferBox />
      <ColorSelector />
      <SizeSelector />
      <QuantitySelector stock={product?.stock} />
      <ProductActions />
    </div>
  )
}

export default ProductInfo