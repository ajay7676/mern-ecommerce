import { useEffect, useState } from "react";

import BrandsHeader from "../../../../components/admin/products/brands/BrandsHeader";
import BrandFilters from "../../../../components/admin/products/brands/BrandFilters";
import BrandStats from "../../../../components/admin/products/brands/BrandStats";
import BrandTableCard from "../../../../components/admin/products/brands/BrandTableCard";
import BrandOverview from "../../../../components/admin/products/brands/BrandOverview";
import TopBrands from "../../../../components/admin/products/brands/TopBrands";
import BrandQuickTips from "../../../../components/admin/products/brands/BrandQuickTips";

import {
  brandOverview,
  brandStats,
  topBrands,
} from "../../../../data/admin/products/brands.data";
import useDebounce from "../../../../hooks/useDebounce";
import useBrands from "../../../../hooks/admin/queries/products/brands/useBrands";
import AddNewBrandModal from "../../../../components/admin/products/brands/modal/addnew/AddNewBrandModal";

const BrandsPage = () => {
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);

  const { data, isLoading, isFetching, isError, error } = useBrands({
    page,
    limit,

    search: debouncedSearch,

    status,

    sortBy: "sortOrder",

    sortOrder: "asc",
  });

  const brands = data?.data?.brands ?? [];

  const pagination = data?.data?.pagination ?? {};


  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const hasFilters = Boolean(search.trim() || status);

   const handleOpenAddBrand = () => {
    setIsAddBrandOpen(true);
  };

  const handleCloseAddBrand = () => {
    setIsAddBrandOpen(false);
  };

  const handleReset = () => {};

  return (
    <>
      <main
        className="
        min-h-screen
        bg-[#fafbfe]
        px-4
        py-5
        sm:px-5
        lg:px-6
      "
      >
        <div className="mx-auto max-w-375">
          <BrandsHeader
            onExport={() => console.log("Export brands")}
            onAddBrand={handleOpenAddBrand}
          />

          <BrandFilters
            search=""
            status="active"
            onSearchChange=""
            onStatusChange={setStatus}
            onReset={handleReset}
          />

          <div
            className="
            mt-4
            grid
            grid-cols-1
            gap-4
            xl:grid-cols-[minmax(0,1fr)_340px]
          "
          >
            <div className="min-w-0 space-y-4">
              <BrandStats stats={brandStats} />
              <BrandTableCard
                brands={brands}
                page={pagination.currentPage ?? page}
                limit={pagination.limit ?? limit}
                total={pagination.totalBrands ?? 0}
                totalPages={pagination.totalPages ?? 1}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                error={error}
                hasFilters={hasFilters}
                onPageChange={setPage}
                onLimitChange={(newLimit) => {
                  setLimit(newLimit);
                  setPage(1);
                }}
                onEdit={(brand) => {
                  console.log("Edit brand", brand);
                }}
                onDelete={(brand) => {
                  console.log("Delete brand", brand);
                }}
                onToggleFeatured={(brand) => {
                  console.log("Toggle featured", brand);
                }}
              />
            </div>
            <aside
              className="
              grid
              gap-4
              md:grid-cols-2
              xl:grid-cols-1
            "
            >
              <BrandOverview overview={brandOverview} />

              <TopBrands
                brands={topBrands}
                onViewAll={() => console.log("View all brands")}
              />

              <BrandQuickTips />
            </aside>
          </div>
        </div>
      </main>
      <AddNewBrandModal
          isOpen={isAddBrandOpen}
          onClose={handleCloseAddBrand}
      
      />
    </>
  );
};

export default BrandsPage;
