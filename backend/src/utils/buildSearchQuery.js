const buildSearchQuery = ({
  keyword = "",
  category = "",
  brand = "",
  minPrice = "",
  maxPrice = "",
  rating = "",
  inStock = "",
  isFeatured = "",
}) => {
  const query = {};

  if (keyword && keyword.trim()) {
    query.$or = ["name", "description", "brand", "category"].map((field) => ({
      [field]: {
        $regex: keyword.trim(),
        $options: "i",
      },
    }));
  }
  if (category && category.trim()) {
    query.category = {
      $regex: category.trim(),
      $options: "i",
    };
  }
  if (brand && brand.trim()) {
    query.brand = {
      $regex: brand.trim(),
      $options: "i",
    };
  }
  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  if (rating) {
    query.ratings = {
      $gte: Number(rating),
    };
  }

  if (inStock === "true") {
    query.stock = {
      $gt: 0,
    };
  }

  if (inStock === "false") {
    query.stock = 0;
  }

  if (isFeatured === "true") {
    query.isFeatured = true;
  }

  if (isFeatured === "false") {
    query.isFeatured = false;
  }

  return query;
};

export default buildSearchQuery;
