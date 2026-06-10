import ProductModel from "../model/productModel.js";
import buildSearchQuery from "../utils/buildSearchQuery.js";
import generateSlug from "../utils/generateSlug.js";
import HandleError from "../utils/handleError.js";

// Creating Prouduct API
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      images,
      category,
      brand,
      stock,
    } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
        statusCode: 400,
      });
    }
    const genSlug = generateSlug(name);
    const existingProduct = await ProductModel.findOne({ genSlug });
    if (existingProduct) {
      return next(new HandleError("Product already exists", 404));
    }

    const product = await ProductModel.create({
      name,
      description,
      slug: genSlug,
      price,
      discountPrice,
      images,
      category,
      brand,
      stock,
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
    console.log(product);
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

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      success: true,
      message: "Product Updated Successfully ",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Create delete product API
const deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.productId);
    if (!product) {
      return next(new HandleError("Product not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
      product,
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
};
