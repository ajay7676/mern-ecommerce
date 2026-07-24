import EmptyWishlist from "./EmptyWishlist";
import WishlistBenefits from "./WishlistBenefits";
import WishlistGrid from "./WishlistGrid";
import WishlistHeader from "./WishlistHeader";
import useWishlist from '../../hooks/queries/wishlist/useWishlist'

const WishlistCom = () => {
  const {
    items,
    totalItems,
    movingItemId,
    isMovingAll,
    removeItem,
    moveToCart,
    moveAllToCart,
    shareWishlist,
  } = useWishlist();

  return (
    <>
      <WishlistHeader
        totalItems={totalItems}
        isMovingAll={isMovingAll}
        onShare={shareWishlist}
        onMoveAllToCart={moveAllToCart}
      />

      <div className="mt-9">
        {items.length > 0 ? (
          <WishlistGrid
            items={items}
            movingItemId={movingItemId}
            onRemove={removeItem}
            onMoveToCart={moveToCart}
          />
        ) : (
          <EmptyWishlist />
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-10">
          <WishlistBenefits />
        </div>
      )}
    </>
  );
};

export default WishlistCom;
