import { useState } from "react";
import { ATTRIBUTE_DUMMY_DATA } from "../../../../data/admin/products/attributeDummyData";
import AttributesHeader from "../../../../components/admin/products/attributes/AttributesHeader";
import AttributeFilters from "../../../../components/admin/products/attributes/AttributeFilters";
import AttributeStats from "../../../../components/admin/products/attributes/AttributeStats";
import AttributeTypePanel from "../../../../components/admin/products/attributes/AttributeTypePanel";
import QuickTips from "../../../../components/admin/products/attributes/QuickTips";
import RecentActivity from "../../../../components/admin/products/attributes/RecentActivity";
import AttributeTableCard from "../../../../components/admin/products/attributes/AttributeTableCard";
import AddAttributeModal from "../../../../components/admin/products/attributes/modal/add/AddAttributeModal";

const AttributesPage = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  const isLoading = false;

  const attributes = ATTRIBUTE_DUMMY_DATA;

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

  const hasFilters =
    Boolean(search.trim()) || status !== "all" || type !== "all";

  const handleAddAttribute = () => {
    // Open Add Attribute drawer/modal
    setIsAddDrawerOpen(true);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("all");
    setType("all");
  };

  const handleCreateAttribute = (formData) => {
    console.log("ATTRIBUTE FORM:", formData);

    // API will come in next phase.
    setIsAddDrawerOpen(false);
  };
  return (
    <>
      <div className="min-h-full bg-[#fcfcff]">
        <div className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-5 lg:p-6">
          {/* Header */}
          <AttributesHeader onAddAttribute={handleAddAttribute} />

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
                <AttributeTableCard
                  attributes={attributes}
                  isLoading={isLoading}
                  hasFilters={hasFilters}
                  onAddAttribute={handleAddAttribute}
                  onClearFilters={handleClearFilters}
                />
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
      <AddAttributeModal
        open={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        onSubmit={handleCreateAttribute}
      />
    </>
  );
};

export default AttributesPage;
