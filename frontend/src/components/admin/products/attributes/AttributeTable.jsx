import {
  FiEdit2,
  FiTrash2,
  FiGrid,
} from "react-icons/fi";

import AttributeStatusBadge from "./AttributeStatusBadge";
import AttributeTableHeader from "./AttributeTableHeader";

const AttributeTable = ({ attributes }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225 border-collapse">
         <AttributeTableHeader />
          <tbody>
            {attributes.map((attribute, index) => (
              <tr
                key={attribute.id}
                className="
                  border-b border-slate-100
                  last:border-b-0
                  hover:bg-slate-50/50
                "
              >
                {/* Number */}
                <td className="px-3 py-4 text-xs text-slate-700">
                  <div className="flex items-center gap-3">
                    <FiGrid
                      size={13}
                      className="text-slate-400"
                    />

                    <span>{index + 1}</span>
                  </div>
                </td>

                {/* Name */}
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {attribute.name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {attribute.slug}
                    </p>
                  </div>
                </td>

                {/* Type */}
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {attribute.type}
                  </span>
                </td>

                {/* Values */}
                <td className="max-w-60 px-4 py-4">
                  {attribute.type === "Switch" ? (
                    <div className="flex items-center gap-1.5">
                      {attribute.switches?.map((color, index) => (
                        <span
                          key={index}
                          className="h-4 w-4 rounded-full border border-slate-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}

                      <span className="ml-1 text-xs text-slate-500">
                        +8 more
                      </span>
                    </div>
                  ) : (
                    <p className="truncate text-sm text-[#253875]">
                      {attribute.values.join(", ")}
                    </p>
                  )}
                </td>

                {/* Products */}
                <td className="px-4 py-4 text-center text-sm text-[#253875]">
                  {attribute.productCount}
                </td>

                {/* Status */}
                <td className="px-4 py-4 text-center">
                  <AttributeStatusBadge status={attribute.status} />
                </td>

                {/* Sort */}
                <td className="px-4 py-4 text-center text-sm text-[#253875]">
                  {attribute.sortOrder}
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      className="text-slate-800 transition hover:text-violet-600"
                      title="Edit attribute"
                    >
                      <FiEdit2 size={16} />
                    </button>

                    <button
                      type="button"
                      className="text-slate-800 transition hover:text-red-500"
                      title="Delete attribute"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttributeTable;