
import { useMemo, useState } from "react";
import { Check, Loader2, Search, X } from "lucide-react";

import {
  isVariantAttributeType,
  mapBackendAttributeToProductAttribute,
} from "../../../../../utils/admin/products/product/productAttributeMapper";

const ExistingAttributesModal = ({
  isOpen,
  onClose,
  selectedAttributes = [],
  existingAttributes = [],
  isLoading = false,
  isError = false,
  onRetry,
  onAddAttributes,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedAttributeIds = useMemo(() => {
    return selectedAttributes.map((attribute) => String(attribute.attributeId));
  }, [selectedAttributes]);

  const availableAttributes = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    return existingAttributes
      .filter((attribute) => isVariantAttributeType(attribute.type))
      .filter((attribute) => {
        if (!keyword) return true;

        return (
          attribute.name?.toLowerCase().includes(keyword) ||
          attribute.slug?.toLowerCase().includes(keyword)
        );
      });
  }, [existingAttributes, searchText]);

  const handleToggle = (attributeId) => {
    const isAlreadySelectedInProduct = selectedAttributeIds.includes(
      String(attributeId)
    );

    if (isAlreadySelectedInProduct) return;

    setSelectedIds((prev) => {
      if (prev.includes(attributeId)) {
        return prev.filter((id) => id !== attributeId);
      }

      return [...prev, attributeId];
    });
  };

  const handleAddSelected = () => {
    const attributesToAdd = availableAttributes
      .filter((attribute) => selectedIds.includes(attribute._id))
      .map(mapBackendAttributeToProductAttribute);

    if (!attributesToAdd.length) return;

    onAddAttributes(attributesToAdd);

    setSelectedIds([]);
    setSearchText("");
    onClose();
  };

  const handleClose = () => {
    setSelectedIds([]);
    setSearchText("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Add Existing Attributes
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Select active attributes from your Attribute table.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="btn btn-square btn-sm rounded-xl bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-slate-100 p-5">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
            <Search className="h-4 w-4 text-slate-400" />

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search attribute by name or slug..."
              className="h-full flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="max-h-105 overflow-y-auto p-5">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading attributes...
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-error/20 bg-error/5 p-6 text-center">
              <p className="text-sm font-semibold text-error">
                Failed to load attributes.
              </p>

              <button
                type="button"
                onClick={onRetry}
                className="btn btn-error btn-sm mt-4 rounded-xl text-white"
              >
                Retry
              </button>
            </div>
          ) : availableAttributes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <p className="text-sm font-semibold text-slate-700">
                No variant attributes found.
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Create active dropdown or switch attributes first.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {availableAttributes.map((attribute) => {
                const isAlreadySelected = selectedAttributeIds.includes(
                  String(attribute._id)
                );

                const isChecked = selectedIds.includes(attribute._id);

                return (
                  <button
                    key={attribute._id}
                    type="button"
                    disabled={isAlreadySelected}
                    onClick={() => handleToggle(attribute._id)}
                    className={`flex w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                      isAlreadySelected
                        ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
                        : isChecked
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 bg-white hover:border-primary/50"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900">
                          {attribute.name}
                        </h4>

                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          {attribute.type}
                        </span>

                        {isAlreadySelected && (
                          <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                            Already added
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {attribute.slug}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {(attribute.values || []).map((item) => (
                          <span
                            key={item.value}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                          >
                            {item.colorCode && (
                              <span
                                className="mr-1 inline-block h-2.5 w-2.5 rounded-full border border-slate-300"
                                style={{ backgroundColor: item.colorCode }}
                              />
                            )}
                            {item.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        isChecked
                          ? "border-primary bg-primary text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="h-4 w-4" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-outline rounded-xl"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAddSelected}
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
