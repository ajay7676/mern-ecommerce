import Cart from "../model/cartModel.js";
import ProductModel from "../model/productModel.js";

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return next(new HandleError("Product ID is required", 400));
    }

    const product = await ProductModel.findById(productId).select(
      "name price discountPrice stock isActive",
    );
    if (!product) {
      return next(new HandleError("Product not found", 404));
    }
    if (!product.isActive) {
      return next(new HandleError("Product is not available", 400));
    }

    if (product.stock < quantity) {
      return next(new HandleError("Not enough stock available", 400));
    }
     let cart = await Cart.findOne({user: req.user._id});
     const itemPrice = product.price || product.discountPrice;
     if(!cart){
            cart = await Cart.create({
                user: req.user._id,
                items: [
                    {
                        product: product._id,
                        quantity: Number(quantity),
                        price: itemPrice,
                    }
                ]

            })
    }
    else{
        const existingItem =  cart.items.find((item) => item.product.toString() === productId);
        if(existingItem){
            const newQuantity = existingItem.quantity + Number(quantity);
            if (product.stock < newQuantity) {
              return next(new HandleError("Not enough stock available", 400));
            }
            else{
                existingItem.quantity = newQuantity;
            }
        }
        else{
            cart.items.push({
            product: product._id,
            quantity: Number(quantity),
            price: itemPrice,
            });
        }
        
    }
    cart.totalItems = cart.items.reduce((total,item) => total + item.quantity, 0);
        cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
     await cart.save();

     return res.status(201).json({
        success: true,
        nessage: "Product added to cart successfully",
        cart
     })

  } catch (error) {

    next(error);
  }
};

export { addToCart };
