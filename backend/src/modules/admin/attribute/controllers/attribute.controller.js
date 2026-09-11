import { 
  createAttributeService,
   getAttributesService
   } from "../services/attribute.service.js";

export const createAttributeController = async (req, res, next) => {
  try {
    const attribute = await createAttributeService({
      payload: req.body,
      adminId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Attribute created successfully",
      data: attribute,
    });
  } catch (error) {
    next(error);
  }
};

export const getAttributesController = async (
  req,
  res,
  next
) => {
  try {
     console.log("Get Attribue API ")
    const result = await getAttributesService(req.query);

    return res.status(200).json({
      success: true,
      message: "Attributes fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};