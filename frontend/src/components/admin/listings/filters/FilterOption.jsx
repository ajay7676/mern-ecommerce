import { useState } from "react";
import FilterDropdown from "./FilterDropdown";

const FilterOption = () => {
  const categoryOptions = [
    { value: "category", label: "Category", count: 517 },
    { value: "active", label: "Active", count: 320 },
    { value: "inactive", label: "Inactive", count: 197 },
  ];
  const brandOptions = [
    { value: "brand", label: "Brand", count: 517 },
    { value: "active", label: "Active", count: 320 },
    { value: "inactive", label: "Inactive", count: 197 },
  ];
  const bankSettlementOptions = [
    { value: "banksettlement", label: "Bank Settlement", count: 517 },
    { value: "active", label: "Active", count: 320 },
    { value: "inactive", label: "Inactive", count: 197 },
  ];
  const filterOptions = [
    { value: "brand", label: "Brand", count: 517 },
    { value: "active", label: "Active", count: 320 },
    { value: "inactive", label: "Inactive", count: 197 },
  ];
  const [categoryFilter, setCategoryFilter] = useState("Category");
  const [brandFilter, setBrandFilter] = useState("Brand");
  const [bankSettlementFilter, setBankSettlementFilter] = useState("Bank Settlement");
   
  return (
    <div className="flex gap-6">
        <FilterDropdown
            label="Category"
            value={categoryFilter}
            options={categoryOptions}
            onChange={setCategoryFilter}
            searchable
        />
        <FilterDropdown
            label="Brand"
            value={brandFilter}
            options={brandOptions}
            onChange={setBrandFilter}
            searchable
        />
        <FilterDropdown
            label="Bank Settlement"
            value={bankSettlementFilter}
            options={bankSettlementOptions}
            onChange={setBankSettlementFilter}
            searchable
        />
    </div>
  );
};

export default FilterOption;
