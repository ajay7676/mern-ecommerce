export const buildCategoryTree = (categories = []) => {
  const categoryMap = new Map();

  const roots = [];

  for (const category of categories) {
    categoryMap.set(category._id.toString(), {
      ...category,
      children: [],
    });
  }

  for (const category of categories) {
    const id = category._id.toString();

    const node = categoryMap.get(id);

    if (!category.parentCategory) {
      roots.push(node);
      continue;
    }

    const parentId = category.parentCategory.toString();

    const parent = categoryMap.get(parentId);

    if (!parent) {
      // Defensive fallback:
      // orphan category becomes root
      roots.push(node);
      continue;
    }

    parent.children.push(node);
  }

  return roots;
};
