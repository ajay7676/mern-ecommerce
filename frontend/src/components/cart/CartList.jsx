import CartItem from "./CartItem";

const CartList = () => {
    const cartItems = [
        {
            id: 1,
            brand: "Aureli",
            name: "Relaxed Linen Shirt",
            variant: "Lilac Purple",
            size: "M",
            price: 1499,
            mrp: 2499,
            discount: 40,
            quantity: 1,
            image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
            delivery: "Tue, 27 May",
        },
        {
            id: 2,
            brand: "ModeMint",
            name: "Urban Overshirt",
            variant: "Teal Green",
            size: "L",
            price: 1999,
            mrp: 3499,
            discount: 43,
            quantity: 1,
            image:
            "https://images.unsplash.com/photo-1506629905607-d9f297d0f5a8?w=500",
            delivery: "Wed, 28 May",
        },
        {
            id: 3,
            brand: "VerveLab",
            name: "Retro Court Sneakers",
            variant: "Off White",
            size: "UK 8",
            price: 1799,
            mrp: 2999,
            discount: 40,
            quantity: 1,
            image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
            delivery: "Thu, 29 May",
        },
    ];
  return (
     <div className="space-y-4">
         {
            cartItems.map((item) => (
                <CartItem  key={item.id} item={item}  />
            ))
         }
     </div>
  )
}

export default CartList