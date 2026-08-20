import HandleError from "../../../utils/handleError.js";
import {
  createBrand,
  findBrandByName,
  findBrandBySlug,
} from "./adminBrand.repository.js";

import { validateCreateBrandPayload } from "./adminBrand.validators.js";

export const createAdminBrandService = async (payload, adminId) => {

  const normalized = validateCreateBrandPayload(payload);

  const [existingSlug, existingName] = await Promise.all([
    findBrandBySlug(normalized.slug),

    findBrandByName(normalized.name),
  ]);

  if (existingSlug) {
    throw new HandleError("Brand slug already exists", 409, {
      slug: "This slug is already in use",
    });
  }

  if (existingName) {
    throw new HandleError("Brand already exists", 409, {
      name: "A brand with this name already exists",
    });
  }

  try {
    const brand = await createBrand({...normalized, createdBy: adminId});
    return brand;
  } catch (error) {
    /*
     * Database unique index is
     * the final protection against
     * concurrent requests.
     */
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      throw new HandleError("Brand slug already exists", 409, {
        slug: "This slug is already in use",
      });
    }

    throw error;
  }
};
