import PrdouctModel from "../model/productModel.js";
import generateSlug from "../utils/generateSlug.js";

// Creating Prouduct API

const createProduct = async (req, res) => {
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
      });
    }
    const genSlug = generateSlug(name);
    const existingProduct = await PrdouctModel.findOne({ genSlug });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
      });
    }

    const product = await PrdouctModel.create({
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await PrdouctModel.find({}).sort({ createAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      message:
        products.length > 0
          ? "Products fetched successfully"
          : "No products found",
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createProduct ,getAllProducts};
