import mongoose from "mongoose";

const selectedAttributeSchema = new mongoose.Schema(
  {
    attributeName: {
      type: String,
      trim: true,
    },

    attributeSlug: {
      type: String,
      trim: true,
      lowercase: true,
    },

    attributeType: {
      type: String,
      trim: true,
    },

    optionLabel: {
      type: String,
      trim: true,
    },

    optionValue: {
      type: String,
      trim: true,
      lowercase: true,
    },

    colorCode: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
      index: true,
    },

    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      default: null,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },

    sku: {
      type: String,
      trim: true,
      uppercase: true,
    },

    image: {
      public_id: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
      alt: {
        type: String,
        trim: true,
      },
    },

    selectedAttributes: {
      type: [selectedAttributeSchema],
      default: [],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
    },

    finalPrice: {
      type: Number,
      required: [true, "Final price is required"],
      min: [0, "Final price cannot be negative"],
    },

    currency: {
      type: String,
      default: "INR",
    },

    itemTotal: {
      type: Number,
      default: 0,
      min: [0, "Item total cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      unique: true,
      index: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    totalItems: {
      type: Number,
      default: 0,
      min: [0, "Total items cannot be negative"],
    },

    totalAmount: {
      type: Number,
      default: 0,
      min: [0, "Total amount cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

import mongoose from "mongoose";

const selectedAttributeSchema = new mongoose.Schema(
  {
    attributeName: {
      type: String,
      trim: true,
    },

    attributeSlug: {
      type: String,
      trim: true,
      lowercase: true,
    },

    attributeType: {
      type: String,
      trim: true,
    },

    optionLabel: {
      type: String,
      trim: true,
    },

    optionValue: {
      type: String,
      trim: true,
      lowercase: true,
    },

    colorCode: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
      index: true,
    },

    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      default: null,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },

    sku: {
      type: String,
      trim: true,
      uppercase: true,
    },

    image: {
      public_id: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
      alt: {
        type: String,
        trim: true,
      },
    },

    selectedAttributes: {
      type: [selectedAttributeSchema],
      default: [],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      min: [0, "Discount price cannot be negative"],
    },

    finalPrice: {
      type: Number,
      required: [true, "Final price is required"],
      min: [0, "Final price cannot be negative"],
    },

    currency: {
      type: String,
      default: "INR",
    },

    itemTotal: {
      type: Number,
      default: 0,
      min: [0, "Item total cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      unique: true,
      index: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    totalItems: {
      type: Number,
      default: 0,
      min: [0, "Total items cannot be negative"],
    },

    totalAmount: {
      type: Number,
      default: 0,
      min: [0, "Total amount cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.methods.recalculateCartTotals = function () {
  this.totalItems = this.items.reduce((total, item) => {
    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new HandleError("Invalid cart item quantity", 400);
    }

    return total + quantity;
  }, 0);

  this.totalAmount = this.items.reduce((total, item) => {
    const finalPrice = Number(item.finalPrice);
    const quantity = Number(item.quantity);

    if (!Number.isFinite(finalPrice) || finalPrice < 0) {
      throw new HandleError("Invalid cart item final price", 400);
    }

    item.itemTotal = finalPrice * quantity;

    return total + item.itemTotal;
  }, 0);
};

cartSchema.pre("save", function (next) {
  this.recalculateCartTotals();
  next();
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;