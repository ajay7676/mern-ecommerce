
export const createAdminProductService = async ({ payload, adminId }) => {
  return {
    adminId,
    receivedPayload: payload,
  };
};