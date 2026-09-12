import { formatAttributeType } from "../../../../utils/admin/products/attribute/formatAttributeType";
import { renderAttributeValues } from "../../../../utils/admin/products/attribute/renderAttributeValues";
import { ArrowDown, ArrowUp, Edit, Trash2 } from "lucide-react";

const SortIcon = ({ column, sortBy, sortOrder }) => {
  if (sortBy !== column) {
    return null;
  }

  if (sortOrder === "asc") {
    return <ArrowUp className="h-3 w-3" />;
  }

  return <ArrowDown className="h-3 w-3" />;
};

const AttributeTable = ({
  attributes,
  sortBy,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
  isFetching,
  onStatusChange,
  statusChangingId,
  isStatusChanging,
}) => {
  return (
    <div className="overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-sm">
      {isFetching && (
        <div className="h-1 w-full overflow-hidden bg-primary/10">
          <div className="h-full w-1/3 animate-pulse bg-primary" />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th>#</th>

              <th>
                <button
                  type="button"
                  onClick={() => onSort("name")}
                  className="flex items-center gap-1 font-semibold"
                >
                  Attribute Name
                  <SortIcon
                    column="name"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </button>
              </th>

              <th>Type</th>

              <th>Values</th>

              <th>Products Using</th>

              <th>Status</th>

              <th>
                <button
                  type="button"
                  onClick={() => onSort("sortOrder")}
                  className="flex items-center gap-1 font-semibold"
                >
                  Sort Order
                  <SortIcon
                    column="name"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </button>
              </th>

              <th>
                <button
                  type="button"
                  onClick={() => onSort("createdAt")}
                  className="flex items-center gap-1 font-semibold"
                >
                  Created
                  <SortIcon
                    column="name"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                  />
                </button>
              </th>

              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {attributes.map((attribute, index) => (
              <tr key={attribute.id}>
                <td className="text-slate-500">{index + 1}</td>

                <td>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {attribute.name}
                    </p>

                    <p className="text-xs text-slate-500">{attribute.slug}</p>
                  </div>
                </td>

                <td>
                  <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {formatAttributeType(attribute.type)}
                  </span>
                </td>

                <td className="max-w-sm text-sm text-slate-700">
                  {renderAttributeValues(attribute)}
                </td>

                <td className="font-medium text-slate-700">
                  {attribute.productCount ?? 0}
                </td>

                {/* <td>
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                      attribute.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {attribute.status === "active"
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td> */}
                <td>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="toggle toggle-success toggle-sm"
                      checked={attribute.status === "active"}
                      disabled={
                        isStatusChanging && statusChangingId === attribute.id
                      }
                      onChange={() => onStatusChange(attribute)}
                    />

                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                        attribute.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {isStatusChanging && statusChangingId === attribute.id
                        ? "Updating..."
                        : attribute.status === "active"
                          ? "Active"
                          : "Inactive"}
                    </span>
                  </div>
                </td>

                <td className="font-medium text-slate-700">
                  {attribute.sortOrder ?? 0}
                </td>

                <td className="text-sm text-slate-500">
                  {attribute.createdAt
                    ? new Date(attribute.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(attribute)}
                      className="btn btn-ghost btn-xs"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(attribute)}
                      className="btn btn-ghost btn-xs text-error"
                    >
                      <Trash2 className="h-4 w-4" />
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
