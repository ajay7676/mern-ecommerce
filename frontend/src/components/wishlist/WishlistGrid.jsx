import WishlistCard from "./WishlistCard";

const WishlistGrid = ({
  items = [],
  movingItemId,
  onRemove,
  onMoveToCart,
}) => {
  return (
    <div
      className="
        grid grid-cols-1 gap-4
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-5
      "
    >
      {items.map((item) => (
        <WishlistCard
          key={item.id}
          item={item}
          isMoving={movingItemId === item.id}
          onRemove={onRemove}
          onMoveToCart={onMoveToCart}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;