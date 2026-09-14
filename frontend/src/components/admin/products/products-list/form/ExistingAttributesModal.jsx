// components/ExistingAttributesModal.jsx

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import {
  EXISTING_PRODUCT_ATTRIBUTES,
  cloneAttribute,
} from '../../../../../utils/admin/products/product/productVariationUtils'

const ExistingAttributesModal = ({
  isOpen,
  selectedAttributes,
  onAddAttributes,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const alreadySelectedIds = useMemo(() => {
    return new Set(selectedAttributes.map((item) => item.attributeId));
  }, [selectedAttributes]);

  const filteredAttributes = useMemo(() => {
    return EXISTING_PRODUCT_ATTRIBUTES.filter((attribute) => {
      return attribute.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search]);

  if (!isOpen) return null;

  const handleToggle = (attributeId) => {
    if (alreadySelectedIds.has(attributeId)) return;

    setSelectedIds((prev) => {
      if (prev.includes(attributeId)) {
        return prev.filter((id) => id !== attributeId);
      }

      return [...prev, attributeId];
    });
  };

  const handleAdd = () => {
    const nextAttributes = EXISTING_PRODUCT_ATTRIBUTES.filter((attribute) =>
      selectedIds.includes(attribute.attributeId)
    ).map(cloneAttribute);

    onAddAttributes(nextAttributes);
    setSelectedIds([]);
    setSearch("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h3 className="text-lg font-bold text-slate-950">
              Add Existing Attributes
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Select attributes from your global attribute table.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search attributes..."
              className="input input-bordered h-11 w-full rounded-xl border-slate-200 bg-white pl-11 text-sm"
            />
          </div>

          <div className="mt-5 max-h-105 overflow-y-auto rounded-xl border border-slate-200">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500">
                  <th className="w-12" />
                  <th>Name</th>
                  <th>Type</th>
                  <th>Options</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAttributes.map((attribute) => {
                  const isSelected = selectedIds.includes(attribute.attributeId);
                  const isAlreadyAdded = alreadySelectedIds.has(attribute.attributeId);

                  return (
                    <tr key={attribute.attributeId} className="border-b border-slate-100">
                      <td>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary checkbox-sm rounded"
                          checked={isSelected || isAlreadyAdded}
                          disabled={isAlreadyAdded}
                          onChange={() => handleToggle(attribute.attributeId)}
                        />
                      </td>

                      <td className="font-bold text-slate-900">
                        {attribute.name}
                      </td>

                      <td>
                        <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                          {attribute.type}
                        </span>
                      </td>

                      <td className="text-sm text-slate-500">
                        {attribute.options.length} options
                      </td>

                      <td>
                        <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-outline rounded-xl"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!selectedIds.length}
            className="btn btn-primary rounded-xl text-white"
          >
            Add Selected ({selectedIds.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingAttributesModal;