import { 
  createAttributeService,
  getAttributesService,
  bulkDeleteAttributesService,
  deleteAttributeService,
  getAttributeStatsService,
  getAttributeTypeSummaryService,
  getSingleAttributeService,
  updateAttributeService,
  updateAttributeStatusService,
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

export const getSingleAttributeController = async (req, res, next) => {
  try {
    const attribute = await getSingleAttributeService(req.params.attributeId);

    return res.status(200).json({
      success: true,
      message: "Attribute fetched successfully",
      data: attribute,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAttributeController = async (req, res, next) => {
  try {
    const attribute = await updateAttributeService({
      attributeId: req.params.attributeId,
      payload: req.body,
      adminId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Attribute updated successfully",
      data: attribute,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAttributeStatusController = async (req, res, next) => {
  try {
    const attribute = await updateAttributeStatusService({
      attributeId: req.params.attributeId,
      status: req.body.status,
      adminId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Attribute status updated successfully",
      data: attribute,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAttributeController = async (req, res, next) => {
  try {
    const result = await deleteAttributeService(req.params.attributeId);

    return res.status(200).json({
      success: true,
      message: "Attribute deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const bulkDeleteAttributesController = async (req, res, next) => {
  try {
    const result = await bulkDeleteAttributesService(req.body.attributeIds);

    return res.status(200).json({
      success: true,
      message: "Attributes deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAttributeStatsController = async (req, res, next) => {
  try {
    const stats = await getAttributeStatsService();

    return res.status(200).json({
      success: true,
      message: "Attribute stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getAttributeTypeSummaryController = async (req, res, next) => {
  try {
    const summary = await getAttributeTypeSummaryService();

    return res.status(200).json({
      success: true,
      message: "Attribute type summary fetched successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};