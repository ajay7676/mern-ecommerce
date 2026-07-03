import {
  createProductService
} from '../services/product.service.js';

const createProduct = async(req,res,next) => {
    try {
        const adminId = req.user?._id || req.user?.id;
        const product = await createProductService(req.body, adminId);
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
        
    } catch (error) {
        next(error);
        
    }
}

export {
    createProduct
};