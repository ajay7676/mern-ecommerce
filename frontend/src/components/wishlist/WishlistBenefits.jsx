import  { wishlistBenefits } from '../../constants/wishlist/wishlistBenefits.data'
import BenefitItem from "./BenefitItem";

const WishlistBenefits = () => {
  return (
    <section
      className="
        grid gap-6 rounded-xl
        bg-linear-to-r from-indigo-50
        via-violet-50 to-indigo-50
        px-6 py-6
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {wishlistBenefits.map((benefit) => (
        <BenefitItem key={benefit.id} {...benefit} />
      ))}
    </section>
  );
};

export default WishlistBenefits;