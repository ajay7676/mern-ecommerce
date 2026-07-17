import { updateDocumentFields } from "../helpers/updateDocumentFields.js";
import ProductModel from "../model/productModel.js";
import buildSearchQuery from "../utils/buildSearchQuery.js";
import generateSlug from "../utils/generateSlug.js";
import HandleError from "../utils/handleError.js";
import { normalizeVariants } from "../utils/productHelpers.js";

// Creating Prouduct API
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      images = [],
      category,
      brand,
      variants,
      isFeatured = false,
      isActive = true,
    } = req.body;
    if (!name || !description || !category || !brand) {
      return next(
        new HandleError(
          "Please provide name, description, category and brand",
          400,
        ),
      );
    }
    const slug = generateSlug(name);
    const existingProduct = await ProductModel.findOne({ slug });
    if (existingProduct) {
      return next(
        new HandleError("Product already exists with this name", 400),
      );
    }

    const normalizedVariants = normalizeVariants(variants);
    const product = await ProductModel.create({
      name,
      description,
      slug,
      images,
      category,
      brand,
      variants: normalizedVariants,
      isFeatured,
      isActive,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Create get All products API
const getAllProducts = async (req, res, next) => {
  try {
    const query = buildSearchQuery(req.query);
    const products = await ProductModel.find(query)
      .select(
        "name slug price discountPrice images category brand stock ratings numReviews createdAt",
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: products.length
        ? "Products fetched successfully"
        : "No products found",
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// Create get single product API

const getSingleProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);

    if (!product) {
      return next(new HandleError("Product not found", 400));
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Create update product API
const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return next(new HandleError("Product not found", 404));
    }
    const { name, description, category, brand, isFeatured, isActive } =
      req.body;
    if (name && name !== product.name) {
      const slug = generateSlug(name);
      const existingProduct = await ProductModel.findOne({
        slug,
        _id: { $ne: productId },
      });

      if (existingProduct) {
        return next(
          new HandleError("Product already exists with this name", 400),
        );
      }
      product.name = name;
      product.slug = slug;
    }
    if (req.body.variants !== undefined) {
      product.variants = normalizeVariants(req.body.variants);
    }
    if (req.body.images !== undefined) {
      product.images = req.body.images;
    }
    updateDocumentFields(product, req.body, [
      "description",
      "category",
      "brand",
      "images",
      "variants",
      "isFeatured",
      "isActive",
    ]);
    product.updatedBy = req.user._id;

    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Create delete product API
const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return next(new HandleError("Product not found", 404));
    }

    product.isDeleted = true;
    product.isActive = false;
    product.deletedBy = req.user._id;
    product.deletedAt = new Date();
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Create Product Review

const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;
    if (!rating || !comment) {
      return next(new HandleError("Please provide rating and comment", 400));
    }
    const product = await ProductModel.findById(productId);

    if (!product) {
      return next(new HandleError("Product not found", 404));
    }
    if (!product.reviews) {
      product.reviews = [];
    }
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      // update old review
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
    } else {
      // add new review
      const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
      product.reviews.push(review);
    }
    product.numReviews = product.reviews.length;
    if (product.reviews.length === 0) {
      product.ratings = 0;
    } else {
      product.ratings =
        product.reviews.reduce(
          (total, currReview) => total + currReview.rating,
          0,
        ) / product.reviews.length;
    }

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Create Delete Review By Admin

const deleteProductReview = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { reviewId } = req.params;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return next(new HandleError("Product not found", 404));
    }
    const existingReview = product.reviews.find(
      (review) => review._id.toString() === reviewId,
    );
    //  const reviews = product.reviews.map((review) => review.user)
    if (!existingReview) {
      return next(new HandleError("Review was not found", 404));
    }

    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId,
    );

    product.numReviews = product.reviews.length;
    product.ratings =
      product.reviews.length > 0
        ? product.reviews.reduce((total, review) => total + review.rating, 0) /
          product.reviews.length
        : 0;

    await product.save();
    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get All Reviews Of Product

const getAllReviewOfProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId).select(
      "reviews ratings numReviews",
    );

    if (!product) {
      return next(new HandleError("Product not found ", 404));
    }

    return res.status(200).json({
      success: true,
      message: product.reviews.length
        ? "Reviews fetched successfully"
        : "No reviews yet on this product",
      count: product.reviews.length,
      averageRating: product.ratings,
      reviews: product.reviews,
    });
  } catch (error) {
    next(error);
  }
};
export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteProductReview,
  getAllReviewOfProduct,
};
