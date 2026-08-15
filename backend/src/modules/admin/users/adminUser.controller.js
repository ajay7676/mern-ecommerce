import {
  createAdminUserService,
  deleteAdminUserService,
  getAdminUserService,
  getAdminUsersService,
  updateAdminUserService,
  updateAdminUserStatusService,
} from "./adminUser.service.js";

export const getAdminUsers = async (req, res, next) => {
  try {
    const result = await getAdminUsersService(req.query);
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",

      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminUser = async (req, res, next) => {
  try {
    const user = await getAdminUserService(req.params.userId);

    res.status(200).json({
      success: true,

      message: "User fetched successfully",

      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createAdminUser = async (req, res, next) => {
  try {
    const user = await createAdminUserService(req.body);

    res.status(201).json({
      success: true,

      message: "User created successfully",

      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminUser = async (req, res, next) => {
  try {
    const adminId = req.user?._id ;

    const user = await updateAdminUserService({
      userId: req.params.userId,
      payload: req.body,
      adminId,
    });

    res.status(200).json({
      success: true,

      message: "User updated successfully",

      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAdminUserStatus = async (req, res, next) => {
  try {
    const adminId = req.user?._id || req.user?.id;

    const result = await updateAdminUserStatusService({
      userId: req.params.userId,

      status: req.body.status,

      adminId,
    });

    res.status(200).json({
      success: true,

      message: result.changed
        ? `User ${result.user.status} successfully`
        : `User is already ${result.user.status}`,

      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdminUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const adminId = req.user?._id;

    await deleteAdminUserService({
      userId,
      adminId,
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
