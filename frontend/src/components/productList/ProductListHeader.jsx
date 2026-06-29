const ProductListHeader = () => {
  return (
    <div>
      <div className="text-sm breadcrumbs text-slate-500">
        <ul>
          <li>Home</li>
          <li>Women</li>
          <li className="text-slate-900">Western Wear</li>
        </ul>
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-5">
        Western Wear
      </h1>

      <p className="text-sm md:text-base text-slate-600 max-w-2xl mt-3">
        Step out in style with our trendy western wear collection. From casual
        day looks to statement evening outfits.
      </p>

      <p className="text-sm font-semibold text-slate-700 mt-4">
        1,248 Items
      </p>
    </div>
  );
};

export default ProductListHeader;