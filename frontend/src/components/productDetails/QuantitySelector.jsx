import { FiMinus, FiPlus } from "react-icons/fi";

const QuantitySelector = ({ quantity, setQuantity, stock = 0 }) => {
  const isOutOfStock = stock <= 0;
  const isMinusDisabled = quantity <= 1;
  const isPlusDisabled = quantity >= stock || isOutOfStock;
  
  const decreaseQuantity  = () => {
    if(quantity > 1){
       setQuantity(quantity - 1)
    }

  }

  const increaseQuantity  = () => {
    if( quantity < stock){
       setQuantity(quantity + 1)
    }

  }
  return (
    <div className="mt-6 flex items-center gap-4">
      <p className="text-sm font-bold text-slate-700">Quantity:</p>

      <div className="flex items-center border border-slate-300  rounded-lg overflow-hidden">
        <button className="w-9 h-9 bg-slate-100 hover:bg-slate-200 flex justify-center items-center
         transition-all text-center duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
         onClick={decreaseQuantity}
         disabled={isMinusDisabled}
         >
          <FiMinus />
        </button>
        <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
        <button className="w-9 h-9 bg-slate-100 hover:bg-slate-200 flex justify-center items-center
         transition-all duration-300 ease-in-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          onClick={increaseQuantity}
          disabled={isPlusDisabled}
         >
          <FiPlus />
        </button>
      </div>

       <p
        className={`text-sm font-semibold  ${
          isOutOfStock ? "text-red-500" : "text-green-600"
        }`}
      >
        {isOutOfStock
          ? "Out of stock"
          : stock <= 5
          ? `Only ${stock} left in stock!`
          : "In stock"}
      </p>
    </div>
  );
};

export default QuantitySelector;
