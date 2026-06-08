import PrdouctModel from "../model/productModel.js";

const getProducts = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "All Products API is working",
  });
};

// Creating Prouduct API

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      slug,
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

    const existingProduct = await PrdouctModel.findOne({slug});

    if(existingProduct){
        return res.status(400).json({
            success: false,
            message: "Product already exists"
        })
    }

    const product = await PrdouctModel.create({
      name,
      description,
      slug,
      price,
      discountPrice,
      images,
      category,
      brand,
      stock
    })

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    })
  } catch (error) {
    res.status(500).json({
        success: false,
        message : error.message,
    })
  }
};

export { getProducts, createProduct };
