import { createProductVariantService } from "../services/productVariant.service.js";

/**
 * @desc    Create product variant
 * @route   POST /api/v1/admin/products/:productId/variants
 * @access  Admin
 */

const createProductVariant = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const adminId = req.user?._id || req.user?.id;
        const variant = await createProductVariantService(
        productId,
        req.body,
        adminId
        );
        res.status(201).json({
            success: true,
            message: "Product variant created successfully",
            variant,
        });
        
    } catch (error) {
        next(error);
    }
};


export { createProductVariant };
