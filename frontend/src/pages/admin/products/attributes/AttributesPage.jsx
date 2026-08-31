import { useMemo, useState } from "react";
import {ATTRIBUTE_DUMMY_DATA} from '../../../../data/admin/products/attributeDummyData';
import AttributesHeader from "../../../../components/admin/products/attributes/AttributesHeader";
import AttributeFilters from "../../../../components/admin/products/attributes/AttributeFilters";
import AttributeStats from "../../../../components/admin/products/attributes/AttributeStats";
import AttributeTable from "../../../../components/admin/products/attributes/AttributeTable";
import AttributePagination from "../../../../components/admin/products/attributes/AttributePagination";
import AttributeTypePanel from "../../../../components/admin/products/attributes/AttributeTypePanel";
import QuickTips from "../../../../components/admin/products/attributes/QuickTips";
import RecentActivity from "../../../../components/admin/products/attributes/RecentActivity";

const AttributesPage = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const filteredAttributes = useMemo(() => {
    return ATTRIBUTE_DUMMY_DATA.filter((attribute) => {
      const keyword = search.trim().toLowerCase();

      const matchesSearch =
        !keyword ||
        attribute.name.toLowerCase().includes(keyword) ||
        attribute.slug.toLowerCase().includes(keyword);

      const matchesType =
        !type || attribute.type === type;

      const matchesStatus =
        !status || attribute.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [search, type, status]);

  const handleFilter = () => {
    // API filtering will be connected later.
    console.log("Apply filters", {
      search,
      type,
      status,
    });
  };

  const handleReset = () => {
    setSearch("");
    setType("");
    setStatus("");
  };

  const handleAddAttribute = () => {
    console.log("Open Add Attribute modal");
  };

  return (
    <div className="min-h-full bg-[#fcfcff]">
      <div className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-5 lg:p-6">
        {/* Header */}
        <AttributesHeader
          onAddAttribute={handleAddAttribute}
        />

        {/* Filters */}
        <AttributeFilters
          search={search}
          type={type}
          status={status}
          onSearchChange={setSearch}
          onTypeChange={setType}
          onStatusChange={setStatus}
          onFilter={handleFilter}
          onReset={handleReset}
        />

        {/* Main Content */}
        <div
          className="
            grid items-start gap-5
            xl:grid-cols-[minmax(0,1fr)_320px]
          "
        >
          {/* LEFT */}
          <div className="min-w-0 space-y-5">
            <AttributeStats />

            <div className="overflow-hidden rounded-lg">
              <AttributeTable
                attributes={filteredAttributes}
              />

              <div className="rounded-b-lg border-x border-b border-slate-100 bg-white">
                <AttributePagination />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-5">
            <AttributeTypePanel />

            <QuickTips />

            <RecentActivity />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AttributesPage