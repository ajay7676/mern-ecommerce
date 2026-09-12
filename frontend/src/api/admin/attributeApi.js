import api from "../axios";

export const createAttributeApi = async (payload) => {
  const response = await api.post("/admin/attributes", payload);
  return response.data.data;
};

export const getAttributesApi = async (params) => {
  const { data } = await api.get("/admin/attributes", {
    params,
  });

  return data.data;
};

export const getAttributeByIdApi = async (attributeId) => {
  if (!attributeId) {
    throw new Error("Attribute id is required");
  }

  const { data } = await api.get(`/admin/attributes/${attributeId}`);

  return data.data;
};


export const updateAttributeApi = async ({ attributeId, payload }) => {
  const { data } = await api.patch(
    `/admin/attributes/${attributeId}`,
    payload
  );

  return data.data;
};

export const deleteAttributeApi = async (attributeId) => {
  if (!attributeId) {
    throw new Error("Attribute id is required");
  }

  const { data } = await api.delete(
    `/admin/attributes/${attributeId}`
  );

  return data.data;
};


export const updateAttributeStatusApi = async ({
  attributeId,
  status,
}) => {
  if (!attributeId) {
    throw new Error("Attribute id is required");
  }

  const { data } = await api.patch(
    `/admin/attributes/${attributeId}/status`,
    {
      status,
    }
  );

  return data.data;
};