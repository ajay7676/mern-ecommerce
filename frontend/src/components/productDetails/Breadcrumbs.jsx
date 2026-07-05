const Breadcrumbs = ({ category,brand ,name }) => {
   console.log(category);
   console.log(brand)
  return (
    <div className="text-sm breadcrumbs text-slate-500">
      <ul>
        <li>{category.name}</li>
        <li>{brand.name}</li>
        <li className="text-slate-700 font-semibold">{name}</li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;