import AccountLayout from '../../../components/my-profile/AccountLayout'
import WishlistCom from '../../../components/wishlist/WishlistCom';

const WishList = () => {
 

  return (
    <AccountLayout>
      <div
        className="
          rounded-xl border border-slate-200 bg-white
          p-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)]
          sm:p-4
        "
      >
       <WishlistCom />
      </div>
    </AccountLayout>
  );
};

export default WishList;
