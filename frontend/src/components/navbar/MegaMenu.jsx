const MegaMenu = ({ menu }) => {
  return (
    <div className=" w-full bg-white shadow-xl border-t border-slate-100 z-50">
      <div className="px-6 py-6 grid grid-cols-3 gap-x-10 gap-y-8">
        {menu.map((column) => (
          <div key={column.title}>
            <h4 className="text-sm font-bold text-red-500 mb-3">
              {column.title}
            </h4>

            <ul className="space-y-2">
              {column.items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;