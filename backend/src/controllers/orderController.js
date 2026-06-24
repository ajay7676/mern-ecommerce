import Cart from "../model/cartModel.js";
import Order from "../model/orderModel.js";
import ProductModel from "../model/productModel.js";
import HandleError from "../utils/handleError.js";

const createOrderFromCart = async (req, res, next) => {
  //  console.log("createOrderFromCart api is working");

  try {
    const { shippingAddress, paymentMethod = "COD" } = req.body;

    if (!shippingAddress) {
      return next(new HandleError("Shipping address is required", 400));
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "items.product",
      select: "name images stock isActive",
    });

    if (!cart || cart.items.length === 0) {
      return next(new HandleError("Cart is empty", 400));
    }

    const orderItems = [];
    for (const item of cart.items) {
      const product = item.product;
      if (!product) {
        return next(new HandleError("Product not found in cart", 404));
      }

      if (!product.isActive) {
        return next(new HandleError(`${product.name} is not available`, 400));
      }

      if (product.stock < item.quantity) {
        return next(
          new HandleError(`Not enough stock for ${product.name}`, 400),
        );
      }
      orderItems.push({
        name: product.name,
        image: product.images?.[0]?.url || "",
        price: item.price,
        quantity: item.quantity,
        product: product._id,
      });
    }

    const itemsPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const taxPrice = Math.round(itemsPrice * 0.18);

    const shippingPrice = itemsPrice > 1000 ? 0 : 100;

    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: paymentMethod === "COD" ? false : false,
      orderStatus: "Pending",
    });
    for (const item of cart.items) {
      const productId = item.product._id || item.product;
      await ProductModel.findByIdAndUpdate(productId, {
        $inc: {
          stock: -item.quantity,
          sold: item.quantity,
        },
      });
    }
    cart.items = [];
    cart.totalItems = 0;
    cart.totalAmount = 0;
    await cart.save();
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    next(error);
  }
};

const getMyAllOrders = async(req,res,next) =>{
    try {
        const orders = await Order.find({user: req.user._id})
        .sort({ createdAt: -1 }).lean();
        return res.status(200).json({
               success: true,
               message: orders.length
               ? "Orders fetched successfully"
               : "No orders found",
                count: orders.length,
               orders: orders,
        })        
    } catch (error) {
        next(error)
    }
}

// Create an API for get single own order

const getSingleOrder = async(req,res,next) => {
    try {
         const { orderId } = req.params;
          const order = await Order.findById(orderId).populate({
            path: "user",
            select: "name email",
          }).lean();
           console.log(order)
        if (!order) {
            return next(new HandleError("Order not found", 404));
        }
        if(order.user._id.toString() !== req.user._id.toString()){
             return next(new HandleError("You are not allowed to view this order", 403));
        }
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order,
        });
        
    } catch (error) {
        next(error)
        
    }
}

const getAllOrdersByAdmin = async(req,res,next)  => {
    try {
        const orders = await Order.find().populate({
            path: "user",
            select: "name email"
        }).sort({createdAt: -1}).lean();

        const  totalRevenue = orders.reduce((total, order) =>
             total + order.totalPrice, 0);

        return res.status(200).json({
            success: true,
            message: orders.length
            ? "Orders fetched successfully"
            : "No orders found",
            count: orders.length,
            totalRevenue,
            orders,
        })
        
    } catch (error) {
        next(error)
        
    }
}
export { createOrderFromCart,getMyAllOrders,getSingleOrder ,getAllOrdersByAdmin};
