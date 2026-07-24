import { useState } from "react";
import { wishlistData } from '../../../constants/wishlist/wishlist.data'

const wait = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const useWishlist = () => {
  const [items, setItems] = useState(wishlistData);
  const [movingItemId, setMovingItemId] = useState(null);
  const [isMovingAll, setIsMovingAll] = useState(false);

  const removeItem = (itemId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  };

  const moveToCart = async (itemId) => {
    const selectedItem = items.find((item) => item.id === itemId);

    if (!selectedItem || selectedItem.stock <= 0) {
      return;
    }

    try {
      setMovingItemId(itemId);

      // Replace this with your add-to-cart API.
      await wait(500);

      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemId),
      );
    } finally {
      setMovingItemId(null);
    }
  };

  const moveAllToCart = async () => {
    const availableItems = items.filter((item) => item.stock > 0);

    if (availableItems.length === 0) {
      return;
    }

    try {
      setIsMovingAll(true);

      // Replace this with your bulk add-to-cart API.
      await wait(700);

      const availableItemIds = new Set(
        availableItems.map((item) => item.id),
      );

      setItems((currentItems) =>
        currentItems.filter(
          (item) => !availableItemIds.has(item.id),
        ),
      );
    } finally {
      setIsMovingAll(false);
    }
  };

  const shareWishlist = async () => {
    const shareData = {
      title: "My Wishlist",
      text: "Check out the products in my wishlist.",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  };

  return {
    items,
    totalItems: items.length,
    movingItemId,
    isMovingAll,
    removeItem,
    moveToCart,
    moveAllToCart,
    shareWishlist,
  };
};

export default useWishlist;