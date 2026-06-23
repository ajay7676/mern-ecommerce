import Cart from "../model/cartModel.js";
import ProductModel from "../model/productModel.js";
import HandleError from "../utils/handleError.js";

// Create an API to Add Item in cart
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
    let cart = await Cart.findOne({ user: req.user._id });
    const itemPrice = product.price || product.discountPrice;
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            product: product._id,
            quantity: Number(quantity),
            price: itemPrice,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId,
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + Number(quantity);
        if (product.stock < newQuantity) {
          return next(new HandleError("Not enough stock available", 400));
        } else {
          existingItem.quantity = newQuantity;
        }
      } else {
        cart.items.push({
          product: product._id,
          quantity: Number(quantity),
          price: itemPrice,
        });
      }
    }
    cart.totalItems = cart.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );
    await cart.save();

    return res.status(201).json({
      success: true,
      nessage: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// Create an API to get All items in cart

const getAllCartItems = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product",
      select: "name slug price discountPrice images stock category brand",
    });
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        totalItems: 0,
        totalAmount: 0,
        items: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: cart.items.length
        ? "Cart items fetched successfully"
        : "Cart is empty",
      totalItems: cart.totalItems,
      totalAmount: cart.totalAmount,
      items: cart.items,
    });
  } catch (error) {
    next(error);
  }
};

// Create an API for Update Cart Quantity

const updateCartQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined) {
      return next(new HandleError("Product ID and quantity are required", 400));
    }
    const newQuantity = Number(quantity);

    if (Number.isNaN(newQuantity) || newQuantity < 1) {
      return next(new HandleError("Quantity must be at least 1", 400));
    }
    const product =
      await ProductModel.findById(productId).select("stock isActive");
    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    if (!product.isActive) {
      return next(new HandleError("Product is not available", 400));
    }

    if (product.stock < newQuantity) {
      return next(new HandleError("Not enough stock available", 400));
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return next(new HandleError("Cart not found", 404));
    }
    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (!cartItem) {
      return next(new HandleError("Product not found in cart", 404));
    }
    cartItem.quantity = newQuantity;
    cart.totalItems = cart.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );

    await cart.save();

    await cart.populate({
      path: "items.product",
      select: "name slug price discountPrice images stock category brand",
    });

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// Remove Item from a cart

const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return next(new HandleError("Cart not found", 404));
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId,
    );
    if (!itemExists) {
      return next(new HandleError("Product not found in cart", 404));
    }
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );
    cart.totalItems = cart.items.reduce(
      (total, item) => total + Number(item.quantity),
      0,
    );
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity),
      0,
    );
    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "name slug price discountPrice images stock category brand",
    });
    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};
// Remove all items from Cart

const clearCartItems = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is already empty",
        cart: {
          items: [],
          totalItems: 0,
          totalAmount: 0,
        },
      });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalAmount = 0;
    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

export {
  addToCart,
  getAllCartItems,
  updateCartQuantity,
  removeCartItem,
  clearCartItems,
};
