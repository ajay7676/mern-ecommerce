import {
  FiBox,
  FiCheckSquare,
  FiGrid,
  FiHash,
  FiType,
} from "react-icons/fi";

import { ATTRIBUTE_TYPES } from "../../../../data/admin/products/attributeDummyData";

const icons = {
  Dropdown: <FiGrid size={18} />,
  Switch: <FiBox size={18} />,
  Text: <FiType size={18} />,
  Number: <FiHash size={18} />,
  Boolean: <FiCheckSquare size={18} />,
};

const AttributeTypePanel = () => {
  return (
    <section className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-950">
        Attribute Types
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Manage different types of attributes.
      </p>

      <div className="mt-4">
        {ATTRIBUTE_TYPES.map((item) => (
          <div
            key={item.id}
            className="
              flex items-center justify-between
              border-b border-slate-100
              py-3 last:border-b-0
            "
          >
            <div className="flex items-center gap-3">
              <span className="text-violet-600">
                {icons[item.name]}
              </span>

              <span className="text-sm font-medium text-slate-900">
                {item.name}
              </span>
            </div>

            <span className="text-xs text-[#253875]">
              {item.count} {item.count === 1 ? "Attribute" : "Attributes"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AttributeTypePanel;